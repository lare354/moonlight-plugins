import spacepack from "@moonlight-mod/wp/spacepack_spacepack";
import React from '@moonlight-mod/wp/react';
import ErrorBoundary from '@moonlight-mod/wp/common_ErrorBoundary';
import { ApplicationStreamingStore, RunningGameStore, ChannelStore, GuildChannelStore } from "@moonlight-mod/wp/common_stores";
import Dispatcher from "@moonlight-mod/wp/discord/Dispatcher";
const { HTTP } = spacepack.require("discord/utils/HTTPUtils");
import { XSmallIcon, createToast, showToast } from "@moonlight-mod/wp/discord/components/common/index";

import Commands from "@moonlight-mod/wp/commands_commands";
import { InputType, CommandType } from "@moonlight-mod/types/coreExtensions/commands";

let wpRequire = webpackChunkdiscord_app.push([[Symbol()], {}, r => r]);
webpackChunkdiscord_app.pop();

let QuestsStore = Object.values(wpRequire.c).find(x => x?.exports?.A?.__proto__?.getQuest).exports.A;

if(!QuestsStore) {
	QuestsStore = Object.values(wpRequire.c).find(x => x?.exports?.Z?.__proto__?.getQuest).exports.Z;
}

const Button = spacepack.findByCode(".GREEN,positionKeyStemOverride:").exports.A;

let isApp = !moonlightNode.isBrowser;
let running = false;

// quest completion logic from https://gist.github.com/aamiaa/204cd9d42013ded9faf646fae7f89fbb
//
// Toast implementation from https://github.com/Enovale/moonlight-extensions/blob/main/src/orbsAutomation/webpackModules/entrypoint.tsx


export async function completeQuest(quest) {

    const pid = Math.floor(Math.random() * 30000) + 1000

    const applicationId = quest.config.application.id
    const applicationName = quest.config.application.name
    const questName = quest.config.messages.questName
    const taskConfig = quest.config.taskConfig ?? quest.config.taskConfigV2
    const taskName = ["WATCH_VIDEO", "PLAY_ON_DESKTOP", "STREAM_ON_DESKTOP", "PLAY_ACTIVITY", "WATCH_VIDEO_ON_MOBILE"].find(x => taskConfig.tasks[x] != null)
    const secondsNeeded = taskConfig.tasks[taskName].target
    let secondsDone = quest.userStatus?.progress?.[taskName]?.value ?? 0


	if (taskName === "WATCH_VIDEO" || taskName === "WATCH_VIDEO_ON_MOBILE") {
		const maxFuture = 10, speed = 7, interval = 1;
		const enrolledAt = new Date(quest.userStatus.enrolledAt).getTime();
		let completed = false;

		while (true) {
			const maxAllowed = Math.floor((Date.now() - enrolledAt) / 1000) + maxFuture;
			const diff = maxAllowed - secondsDone;
			const timestamp = secondsDone + speed;

			if (diff >= speed) {
				const res = await HTTP.post({
					url: `/quests/${quest.id}/video-progress`,
					body: { timestamp: Math.min(secondsNeeded, timestamp + Math.random()) }
				});
				completed = res.body.completed_at != null;
				secondsDone = Math.min(secondsNeeded, timestamp);
			}

			if (timestamp >= secondsNeeded) break;
			await new Promise(resolve => setTimeout(resolve, interval * 1000));
		}

		if (!completed) {
			await HTTP.post({ url: `/quests/${quest.id}/video-progress`, body: { timestamp: secondsNeeded } });
		}

		makeToast(`Completed quest: ${questName}`);
		
	} else if (taskName === "PLAY_ON_DESKTOP") {
		if (!isApp) {
			makeToast(`ERROR: Cannot spoof PLAY_ON_DESKTOP for "${questName}" in browser.`);
		} else {
			const res = await HTTP.get({ url: `/applications/public?application_ids=${applicationId}` });
			const appData = res.body[0];
			const exeName = appData.executables.find(x => x.os === "win32").name.replace(">", "");

			const fakeGame = {
				cmdLine: `C:\\Program Files\\${appData.name}\\${exeName}`,
				exeName,
				exePath: `c:/program files/${appData.name.toLowerCase()}/${exeName}`,
				hidden: false,
				isLauncher: false,
				id: applicationId,
				name: appData.name,
				pid: pid,
				pidPath: [pid],
				processName: appData.name,
				start: Date.now(),
			};

			const realGames = RunningGameStore.getRunningGames() ?? [];
			const fakeGames = [fakeGame];
			const realGetRunningGames = RunningGameStore.getRunningGames;
			const realGetGameForPID = RunningGameStore.getGameForPID;
			
			RunningGameStore.getRunningGames = () => fakeGames;
			RunningGameStore.getGameForPID = (pid) => fakeGames.find(x => x.pid === pid);

			Dispatcher.dispatch({ 
				type: "RUNNING_GAMES_CHANGE", 
				removed: realGames, 
				added: [fakeGame], 
				games: fakeGames 
			});

			await new Promise(resolve => {
				let fn = (data) => {
					let progress = quest.config.configVersion === 1
						? data.userStatus.streamProgressSeconds
						: Math.floor(data.userStatus.progress.PLAY_ON_DESKTOP.value);

					makeToast(`Quest progress: ${progress}/${secondsNeeded}`);
					if (progress >= secondsNeeded) {
						makeToast(`Completed quest: ${questName}`);
						RunningGameStore.getRunningGames = realGetRunningGames;
						RunningGameStore.getGameForPID = realGetGameForPID;
						Dispatcher.dispatch({ 
							type: "RUNNING_GAMES_CHANGE", 
							removed: [fakeGame], 
							added: [], 
							games: [] 
						});
						Dispatcher.unsubscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", fn);
						resolve();
					}
				};
				Dispatcher.subscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", fn);
			});
		}
	} else if (taskName === "STREAM_ON_DESKTOP") {
		if (!isApp) {
			makeToast(`ERROR: Cannot spoof STREAM_ON_DESKTOP for "${questName}" in browser.`);
		} else {
			let realFunc = ApplicationStreamingStore.getStreamerActiveStreamMetadata;
			ApplicationStreamingStore.getStreamerActiveStreamMetadata = () => ({
				id: applicationId,
				pid,
				sourceName: null
			});

			await new Promise(resolve => {
				let fn = (data) => {
					let progress = quest.config.configVersion === 1
						? data.userStatus.streamProgressSeconds
						: Math.floor(data.userStatus.progress.STREAM_ON_DESKTOP.value);

					makeToast(`Quest progress: ${progress}/${secondsNeeded}`);
					if (progress >= secondsNeeded) {
						makeToast(`Completed quest: ${questName}`);
						ApplicationStreamingStore.getStreamerActiveStreamMetadata = realFunc;
						Dispatcher.unsubscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", fn);
						resolve();
					}
				};
				Dispatcher.subscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", fn);
			});
		}
	} else if (taskName === "PLAY_ACTIVITY") {
		const channelId = ChannelStore.getSortedPrivateChannels()[0]?.id ??
			Object.values(GuildChannelStore.getAllGuilds()).find(x => x != null && x.VOCAL.length > 0)?.VOCAL[0]?.channel?.id;

		const streamKey = `call:${channelId}:1`;

		while (true) {
			const res = await HTTP.post({ url: `/quests/${quest.id}/heartbeat`, body: { stream_key: streamKey, terminal: false } });
			const progress = res.body.progress.PLAY_ACTIVITY.value;
			makeToast(`Quest progress: ${progress}/${secondsNeeded}`);

			if (progress >= secondsNeeded) {
				await HTTP.post({ url: `/quests/${quest.id}/heartbeat`, body: { stream_key: streamKey, terminal: true } });
				makeToast(`Completed quest: ${questName}`);
				break;
			}
			await new Promise(resolve => setTimeout(resolve, 20000));
		}
	}
}

async function acceptAllQuests() {
    const UnacceptedQuests = [...QuestsStore.quests.values()].filter(x =>
        x.id !== "1412491570820812933" &&
        x.config?.rewardsConfig?.rewards[0].orbQuantity &&
        !x.userStatus?.enrolledAt &&
        !x.userStatus?.completedAt &&
        new Date(x.config.expiresAt).getTime() > Date.now()
    );
    
    if (UnacceptedQuests.length !== 0) {
        makeToast(`Found ${UnacceptedQuests.length} unaccepted orbs quests.`);

		for (let quest of UnacceptedQuests) {
			const response = await HTTP.post({
				url: `/quests/${quest.id}/enroll`,
				body: {
					"location": 11,
					"is_targeted": false,
					"metadata_raw": null
				}
			});

			if (response.status === 200) {
				makeToast(`${quest.config.messages.questName} accepted :3`)
			} else if (response.status === 429) {
				makeToast('You have been timed out :(')
			}
		}
    }

    makeToast('All orbs quests accepted B)');
}

async function startAllQuests() {
	if (running) {
		makeToast("Quest completer is already running! >:c");
		return;	
	}
	
  	const allQuests = [...QuestsStore.quests.values()].filter(x =>
    	x.userStatus?.enrolledAt &&
    	!x.userStatus?.completedAt &&
    	new Date(x.config.expiresAt).getTime() > Date.now()
  	);


	if (allQuests.length === 0) {
		running = false;
		makeToast("All quests are already completed!");
		return;
	}

	makeToast(`Found ${allQuests.length} uncompleted quest(s). Starting...`);
	
	for (let quest of allQuests) {
		try {
			running = true;
			await completeQuest(quest);
		} catch (e) {
			makeToast(`Error completing quest: ${quest.config.messages.questName}`, e);
		}
	}

	running = false;
	makeToast("All accepted quests have been completed!");
}

function makeToast(...args: any[]) {
    showToast(createToast(...args))
}

function makeIcon() {
  return () => (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path
        fill={"#cba6f7"}
        d="M7.5 21.7a8.95 8.95 0 0 1 9 0 1 1 0 0 0 1-1.73c-.6-.35-1.24-.64-1.9-.87.54-.3 1.05-.65 1.52-1.07a3.98 3.98 0 0 0 5.49-1.8.77.77 0 0 0-.24-.95 3.98 3.98 0 0 0-2.02-.76A4 4 0 0 0 23 10.47a.76.76 0 0 0-.71-.71 4.06 4.06 0 0 0-1.6.22 3.99 3.99 0 0 0 .54-5.35.77.77 0 0 0-.95-.24c-.75.36-1.37.95-1.77 1.67V6a4 4 0 0 0-4.9-3.9.77.77 0 0 0-.6.72 4 4 0 0 0 3.7 4.17c.89 1.3 1.3 2.95 1.3 4.51 0 3.66-2.75 6.5-6 6.5s-6-2.84-6-6.5c0-1.56.41-3.21 1.3-4.51A4 4 0 0 0 11 2.82a.77.77 0 0 0-.6-.72 4.01 4.01 0 0 0-4.9 3.96A4.02 4.02 0 0 0 3.73 4.4a.77.77 0 0 0-.95.24 3.98 3.98 0 0 0 .55 5.35 4 4 0 0 0-1.6-.22.76.76 0 0 0-.72.71l-.01.28a4 4 0 0 0 2.65 3.77c-.75.06-1.45.33-2.02.76-.3.22-.4.62-.24.95a4 4 0 0 0 5.49 1.8c.47.42.98.78 1.53 1.07-.67.23-1.3.52-1.91.87a1 1 0 1 0 1 1.73Z"
      />
    </svg>
  );
}

export function CompleteQuestButtonInternal() {
  return (
    <Button
      tooltipText={ "Complete quests! :3" }
      icon={ makeIcon() }
      role="button"
      plated="plated"
      onClick={ () => startAllQuests() }
      onContextMenu={ () => acceptAllQuests() }
    />
  );
}

export function CompleteQuestButton() {
  return <ErrorBoundary>
    <CompleteQuestButtonInternal />
  </ErrorBoundary>
}


Commands.registerCommand({
  id: "acceptQuests",
  description: "Accept Quests",
  inputType: InputType.BUILT_IN,
  type: CommandType.CHAT,
  options: [],
  execute: () => {
    acceptAllQuests();
  }
});

Commands.registerCommand({
  id: "quest",
  description: "Run quest completer",
  inputType: InputType.BUILT_IN,
  type: CommandType.CHAT,
  options: [],
  execute: () => {
    startAllQuests();
  }
});
