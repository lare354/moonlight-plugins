"use strict";
var module;
(module ||= {}).exports = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/questCompleter/webpackModules/action.tsx
  var action_exports = {};
  __export(action_exports, {
    CompleteQuestButton: () => CompleteQuestButton,
    CompleteQuestButtonInternal: () => CompleteQuestButtonInternal,
    completeQuest: () => completeQuest
  });
  var import_spacepack_spacepack = __toESM(__require("spacepack_spacepack"));
  var import_react = __toESM(__require("react"));
  var import_common_ErrorBoundary = __toESM(__require("common_ErrorBoundary"));
  var import_common_stores = __require("common_stores");
  var import_Dispatcher = __toESM(__require("discord/Dispatcher"));
  var import_common = __require("discord/components/common/index");
  var import_commands_commands = __toESM(__require("commands_commands"));
  var { HTTP } = import_spacepack_spacepack.default.require("discord/utils/HTTPUtils");
  var wpRequire = webpackChunkdiscord_app.push([[Symbol()], {}, (r) => r]);
  webpackChunkdiscord_app.pop();
  var QuestsStore = Object.values(wpRequire.c).find((x) => x?.exports?.A?.__proto__?.getQuest).exports.A;
  if (!QuestsStore) {
    QuestsStore = Object.values(wpRequire.c).find((x) => x?.exports?.Z?.__proto__?.getQuest).exports.Z;
  }
  var Button = import_spacepack_spacepack.default.findByCode(".GREEN,positionKeyStemOverride:")[0].exports.A;
  var isApp = !moonlightNode.isBrowser;
  var running = false;
  async function completeQuest(quest) {
    const pid = Math.floor(Math.random() * 3e4) + 1e3;
    const applicationId = quest.config.application.id;
    const applicationName = quest.config.application.name;
    const questName = quest.config.messages.questName;
    const taskConfig = quest.config.taskConfig ?? quest.config.taskConfigV2;
    const taskName = ["WATCH_VIDEO", "PLAY_ON_DESKTOP", "STREAM_ON_DESKTOP", "PLAY_ACTIVITY", "WATCH_VIDEO_ON_MOBILE"].find((x) => taskConfig.tasks[x] != null);
    const secondsNeeded = taskConfig.tasks[taskName].target;
    let secondsDone = quest.userStatus?.progress?.[taskName]?.value ?? 0;
    if (taskName === "WATCH_VIDEO" || taskName === "WATCH_VIDEO_ON_MOBILE") {
      const maxFuture = 10, speed = 7, interval = 1;
      const enrolledAt = new Date(quest.userStatus.enrolledAt).getTime();
      let completed = false;
      while (true) {
        const maxAllowed = Math.floor((Date.now() - enrolledAt) / 1e3) + maxFuture;
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
        if (timestamp >= secondsNeeded)
          break;
        await new Promise((resolve) => setTimeout(resolve, interval * 1e3));
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
        const exeName = appData.executables.find((x) => x.os === "win32").name.replace(">", "");
        const fakeGame = {
          cmdLine: `C:\\Program Files\\${appData.name}\\${exeName}`,
          exeName,
          exePath: `c:/program files/${appData.name.toLowerCase()}/${exeName}`,
          hidden: false,
          isLauncher: false,
          id: applicationId,
          name: appData.name,
          pid,
          pidPath: [pid],
          processName: appData.name,
          start: Date.now()
        };
        const realGames = import_common_stores.RunningGameStore.getRunningGames() ?? [];
        const fakeGames = [fakeGame];
        const realGetRunningGames = import_common_stores.RunningGameStore.getRunningGames;
        const realGetGameForPID = import_common_stores.RunningGameStore.getGameForPID;
        import_common_stores.RunningGameStore.getRunningGames = () => fakeGames;
        import_common_stores.RunningGameStore.getGameForPID = (pid2) => fakeGames.find((x) => x.pid === pid2);
        import_Dispatcher.default.dispatch({
          type: "RUNNING_GAMES_CHANGE",
          removed: realGames,
          added: [fakeGame],
          games: fakeGames
        });
        await new Promise((resolve) => {
          let fn = (data) => {
            let progress = quest.config.configVersion === 1 ? data.userStatus.streamProgressSeconds : Math.floor(data.userStatus.progress.PLAY_ON_DESKTOP.value);
            makeToast(`Quest progress: ${progress}/${secondsNeeded}`);
            if (progress >= secondsNeeded) {
              makeToast(`Completed quest: ${questName}`);
              import_common_stores.RunningGameStore.getRunningGames = realGetRunningGames;
              import_common_stores.RunningGameStore.getGameForPID = realGetGameForPID;
              import_Dispatcher.default.dispatch({
                type: "RUNNING_GAMES_CHANGE",
                removed: [fakeGame],
                added: [],
                games: []
              });
              import_Dispatcher.default.unsubscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", fn);
              resolve();
            }
          };
          import_Dispatcher.default.subscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", fn);
        });
      }
    } else if (taskName === "STREAM_ON_DESKTOP") {
      if (!isApp) {
        makeToast(`ERROR: Cannot spoof STREAM_ON_DESKTOP for "${questName}" in browser.`);
      } else {
        let realFunc = import_common_stores.ApplicationStreamingStore.getStreamerActiveStreamMetadata;
        import_common_stores.ApplicationStreamingStore.getStreamerActiveStreamMetadata = () => ({
          id: applicationId,
          pid,
          sourceName: null
        });
        await new Promise((resolve) => {
          let fn = (data) => {
            let progress = quest.config.configVersion === 1 ? data.userStatus.streamProgressSeconds : Math.floor(data.userStatus.progress.STREAM_ON_DESKTOP.value);
            makeToast(`Quest progress: ${progress}/${secondsNeeded}`);
            if (progress >= secondsNeeded) {
              makeToast(`Completed quest: ${questName}`);
              import_common_stores.ApplicationStreamingStore.getStreamerActiveStreamMetadata = realFunc;
              import_Dispatcher.default.unsubscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", fn);
              resolve();
            }
          };
          import_Dispatcher.default.subscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", fn);
        });
      }
    } else if (taskName === "PLAY_ACTIVITY") {
      const channelId = import_common_stores.ChannelStore.getSortedPrivateChannels()[0]?.id ?? Object.values(import_common_stores.GuildChannelStore.getAllGuilds()).find((x) => x != null && x.VOCAL.length > 0)?.VOCAL[0]?.channel?.id;
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
        await new Promise((resolve) => setTimeout(resolve, 2e4));
      }
    }
  }
  async function acceptAllQuests() {
    const UnacceptedQuests = [...QuestsStore.quests.values()].filter(
      (x) => x.id !== "1412491570820812933" && x.config?.rewardsConfig?.rewards[0].orbQuantity && !x.userStatus?.enrolledAt && !x.userStatus?.completedAt && new Date(x.config.expiresAt).getTime() > Date.now()
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
          makeToast(`${quest.config.messages.questName} accepted :3`);
        } else if (response.status === 429) {
          makeToast("You have been timed out :(");
        }
      }
    }
    makeToast("All orbs quests accepted B)");
  }
  async function startAllQuests() {
    if (running) {
      makeToast("Quest completer is already running! >:c");
      return;
    }
    const allQuests = [...QuestsStore.quests.values()].filter(
      (x) => x.userStatus?.enrolledAt && !x.userStatus?.completedAt && new Date(x.config.expiresAt).getTime() > Date.now()
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
  function makeToast(...args) {
    (0, import_common.showToast)((0, import_common.createToast)(...args));
  }
  function makeIcon() {
    return () => /* @__PURE__ */ import_react.default.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react.default.createElement(
      "path",
      {
        fill: "#cba6f7",
        d: "M7.5 21.7a8.95 8.95 0 0 1 9 0 1 1 0 0 0 1-1.73c-.6-.35-1.24-.64-1.9-.87.54-.3 1.05-.65 1.52-1.07a3.98 3.98 0 0 0 5.49-1.8.77.77 0 0 0-.24-.95 3.98 3.98 0 0 0-2.02-.76A4 4 0 0 0 23 10.47a.76.76 0 0 0-.71-.71 4.06 4.06 0 0 0-1.6.22 3.99 3.99 0 0 0 .54-5.35.77.77 0 0 0-.95-.24c-.75.36-1.37.95-1.77 1.67V6a4 4 0 0 0-4.9-3.9.77.77 0 0 0-.6.72 4 4 0 0 0 3.7 4.17c.89 1.3 1.3 2.95 1.3 4.51 0 3.66-2.75 6.5-6 6.5s-6-2.84-6-6.5c0-1.56.41-3.21 1.3-4.51A4 4 0 0 0 11 2.82a.77.77 0 0 0-.6-.72 4.01 4.01 0 0 0-4.9 3.96A4.02 4.02 0 0 0 3.73 4.4a.77.77 0 0 0-.95.24 3.98 3.98 0 0 0 .55 5.35 4 4 0 0 0-1.6-.22.76.76 0 0 0-.72.71l-.01.28a4 4 0 0 0 2.65 3.77c-.75.06-1.45.33-2.02.76-.3.22-.4.62-.24.95a4 4 0 0 0 5.49 1.8c.47.42.98.78 1.53 1.07-.67.23-1.3.52-1.91.87a1 1 0 1 0 1 1.73Z"
      }
    ));
  }
  function CompleteQuestButtonInternal() {
    return /* @__PURE__ */ import_react.default.createElement(
      Button,
      {
        tooltipText: "Complete quests! :3",
        icon: makeIcon(),
        role: "button",
        plated: "plated",
        onClick: () => startAllQuests(),
        onContextMenu: () => acceptAllQuests()
      }
    );
  }
  function CompleteQuestButton() {
    return /* @__PURE__ */ import_react.default.createElement(import_common_ErrorBoundary.default, null, /* @__PURE__ */ import_react.default.createElement(CompleteQuestButtonInternal, null));
  }
  import_commands_commands.default.registerCommand({
    id: "acceptQuests",
    description: "Accept Quests",
    inputType: 0 /* BUILT_IN */,
    type: 1 /* CHAT */,
    options: [],
    execute: () => {
      acceptAllQuests();
    }
  });
  import_commands_commands.default.registerCommand({
    id: "quest",
    description: "Run quest completer",
    inputType: 0 /* BUILT_IN */,
    type: 1 /* CHAT */,
    options: [],
    execute: () => {
      startAllQuests();
    }
  });
  return __toCommonJS(action_exports);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL3F1ZXN0Q29tcGxldGVyL3dlYnBhY2tNb2R1bGVzL2FjdGlvbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBzcGFjZXBhY2sgZnJvbSBcIkBtb29ubGlnaHQtbW9kL3dwL3NwYWNlcGFja19zcGFjZXBhY2tcIjtcbmltcG9ydCBSZWFjdCBmcm9tICdAbW9vbmxpZ2h0LW1vZC93cC9yZWFjdCc7XG5pbXBvcnQgRXJyb3JCb3VuZGFyeSBmcm9tICdAbW9vbmxpZ2h0LW1vZC93cC9jb21tb25fRXJyb3JCb3VuZGFyeSc7XG5pbXBvcnQgeyBBcHBsaWNhdGlvblN0cmVhbWluZ1N0b3JlLCBSdW5uaW5nR2FtZVN0b3JlLCBDaGFubmVsU3RvcmUsIEd1aWxkQ2hhbm5lbFN0b3JlIH0gZnJvbSBcIkBtb29ubGlnaHQtbW9kL3dwL2NvbW1vbl9zdG9yZXNcIjtcbmltcG9ydCBEaXNwYXRjaGVyIGZyb20gXCJAbW9vbmxpZ2h0LW1vZC93cC9kaXNjb3JkL0Rpc3BhdGNoZXJcIjtcbmNvbnN0IHsgSFRUUCB9ID0gc3BhY2VwYWNrLnJlcXVpcmUoXCJkaXNjb3JkL3V0aWxzL0hUVFBVdGlsc1wiKTtcbmltcG9ydCB7IFhTbWFsbEljb24sIGNyZWF0ZVRvYXN0LCBzaG93VG9hc3QgfSBmcm9tIFwiQG1vb25saWdodC1tb2Qvd3AvZGlzY29yZC9jb21wb25lbnRzL2NvbW1vbi9pbmRleFwiO1xuXG5pbXBvcnQgQ29tbWFuZHMgZnJvbSBcIkBtb29ubGlnaHQtbW9kL3dwL2NvbW1hbmRzX2NvbW1hbmRzXCI7XG5pbXBvcnQgeyBJbnB1dFR5cGUsIENvbW1hbmRUeXBlIH0gZnJvbSBcIkBtb29ubGlnaHQtbW9kL3R5cGVzL2NvcmVFeHRlbnNpb25zL2NvbW1hbmRzXCI7XG5cbmxldCB3cFJlcXVpcmUgPSB3ZWJwYWNrQ2h1bmtkaXNjb3JkX2FwcC5wdXNoKFtbU3ltYm9sKCldLCB7fSwgciA9PiByXSk7XG53ZWJwYWNrQ2h1bmtkaXNjb3JkX2FwcC5wb3AoKTtcblxubGV0IFF1ZXN0c1N0b3JlID0gT2JqZWN0LnZhbHVlcyh3cFJlcXVpcmUuYykuZmluZCh4ID0+IHg/LmV4cG9ydHM/LkE/Ll9fcHJvdG9fXz8uZ2V0UXVlc3QpLmV4cG9ydHMuQTtcblxuaWYoIVF1ZXN0c1N0b3JlKSB7XG5cdFF1ZXN0c1N0b3JlID0gT2JqZWN0LnZhbHVlcyh3cFJlcXVpcmUuYykuZmluZCh4ID0+IHg/LmV4cG9ydHM/Llo/Ll9fcHJvdG9fXz8uZ2V0UXVlc3QpLmV4cG9ydHMuWjtcbn1cblxuY29uc3QgQnV0dG9uID0gc3BhY2VwYWNrLmZpbmRCeUNvZGUoXCIuR1JFRU4scG9zaXRpb25LZXlTdGVtT3ZlcnJpZGU6XCIpWzBdLmV4cG9ydHMuQTtcblxubGV0IGlzQXBwID0gIW1vb25saWdodE5vZGUuaXNCcm93c2VyO1xubGV0IHJ1bm5pbmcgPSBmYWxzZTtcblxuLy8gcXVlc3QgY29tcGxldGlvbiBsb2dpYyBmcm9tIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2FhbWlhYS8yMDRjZDlkNDIwMTNkZWQ5ZmFmNjQ2ZmFlN2Y4OWZiYlxuLy9cbi8vIFRvYXN0IGltcGxlbWVudGF0aW9uIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL0Vub3ZhbGUvbW9vbmxpZ2h0LWV4dGVuc2lvbnMvYmxvYi9tYWluL3NyYy9vcmJzQXV0b21hdGlvbi93ZWJwYWNrTW9kdWxlcy9lbnRyeXBvaW50LnRzeFxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb21wbGV0ZVF1ZXN0KHF1ZXN0KSB7XG5cbiAgICBjb25zdCBwaWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzMDAwMCkgKyAxMDAwXG5cbiAgICBjb25zdCBhcHBsaWNhdGlvbklkID0gcXVlc3QuY29uZmlnLmFwcGxpY2F0aW9uLmlkXG4gICAgY29uc3QgYXBwbGljYXRpb25OYW1lID0gcXVlc3QuY29uZmlnLmFwcGxpY2F0aW9uLm5hbWVcbiAgICBjb25zdCBxdWVzdE5hbWUgPSBxdWVzdC5jb25maWcubWVzc2FnZXMucXVlc3ROYW1lXG4gICAgY29uc3QgdGFza0NvbmZpZyA9IHF1ZXN0LmNvbmZpZy50YXNrQ29uZmlnID8/IHF1ZXN0LmNvbmZpZy50YXNrQ29uZmlnVjJcbiAgICBjb25zdCB0YXNrTmFtZSA9IFtcIldBVENIX1ZJREVPXCIsIFwiUExBWV9PTl9ERVNLVE9QXCIsIFwiU1RSRUFNX09OX0RFU0tUT1BcIiwgXCJQTEFZX0FDVElWSVRZXCIsIFwiV0FUQ0hfVklERU9fT05fTU9CSUxFXCJdLmZpbmQoeCA9PiB0YXNrQ29uZmlnLnRhc2tzW3hdICE9IG51bGwpXG4gICAgY29uc3Qgc2Vjb25kc05lZWRlZCA9IHRhc2tDb25maWcudGFza3NbdGFza05hbWVdLnRhcmdldFxuICAgIGxldCBzZWNvbmRzRG9uZSA9IHF1ZXN0LnVzZXJTdGF0dXM/LnByb2dyZXNzPy5bdGFza05hbWVdPy52YWx1ZSA/PyAwXG5cblxuXHRpZiAodGFza05hbWUgPT09IFwiV0FUQ0hfVklERU9cIiB8fCB0YXNrTmFtZSA9PT0gXCJXQVRDSF9WSURFT19PTl9NT0JJTEVcIikge1xuXHRcdGNvbnN0IG1heEZ1dHVyZSA9IDEwLCBzcGVlZCA9IDcsIGludGVydmFsID0gMTtcblx0XHRjb25zdCBlbnJvbGxlZEF0ID0gbmV3IERhdGUocXVlc3QudXNlclN0YXR1cy5lbnJvbGxlZEF0KS5nZXRUaW1lKCk7XG5cdFx0bGV0IGNvbXBsZXRlZCA9IGZhbHNlO1xuXG5cdFx0d2hpbGUgKHRydWUpIHtcblx0XHRcdGNvbnN0IG1heEFsbG93ZWQgPSBNYXRoLmZsb29yKChEYXRlLm5vdygpIC0gZW5yb2xsZWRBdCkgLyAxMDAwKSArIG1heEZ1dHVyZTtcblx0XHRcdGNvbnN0IGRpZmYgPSBtYXhBbGxvd2VkIC0gc2Vjb25kc0RvbmU7XG5cdFx0XHRjb25zdCB0aW1lc3RhbXAgPSBzZWNvbmRzRG9uZSArIHNwZWVkO1xuXG5cdFx0XHRpZiAoZGlmZiA+PSBzcGVlZCkge1xuXHRcdFx0XHRjb25zdCByZXMgPSBhd2FpdCBIVFRQLnBvc3Qoe1xuXHRcdFx0XHRcdHVybDogYC9xdWVzdHMvJHtxdWVzdC5pZH0vdmlkZW8tcHJvZ3Jlc3NgLFxuXHRcdFx0XHRcdGJvZHk6IHsgdGltZXN0YW1wOiBNYXRoLm1pbihzZWNvbmRzTmVlZGVkLCB0aW1lc3RhbXAgKyBNYXRoLnJhbmRvbSgpKSB9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRjb21wbGV0ZWQgPSByZXMuYm9keS5jb21wbGV0ZWRfYXQgIT0gbnVsbDtcblx0XHRcdFx0c2Vjb25kc0RvbmUgPSBNYXRoLm1pbihzZWNvbmRzTmVlZGVkLCB0aW1lc3RhbXApO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGltZXN0YW1wID49IHNlY29uZHNOZWVkZWQpIGJyZWFrO1xuXHRcdFx0YXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIGludGVydmFsICogMTAwMCkpO1xuXHRcdH1cblxuXHRcdGlmICghY29tcGxldGVkKSB7XG5cdFx0XHRhd2FpdCBIVFRQLnBvc3QoeyB1cmw6IGAvcXVlc3RzLyR7cXVlc3QuaWR9L3ZpZGVvLXByb2dyZXNzYCwgYm9keTogeyB0aW1lc3RhbXA6IHNlY29uZHNOZWVkZWQgfSB9KTtcblx0XHR9XG5cblx0XHRtYWtlVG9hc3QoYENvbXBsZXRlZCBxdWVzdDogJHtxdWVzdE5hbWV9YCk7XG5cdFx0XG5cdH0gZWxzZSBpZiAodGFza05hbWUgPT09IFwiUExBWV9PTl9ERVNLVE9QXCIpIHtcblx0XHRpZiAoIWlzQXBwKSB7XG5cdFx0XHRtYWtlVG9hc3QoYEVSUk9SOiBDYW5ub3Qgc3Bvb2YgUExBWV9PTl9ERVNLVE9QIGZvciBcIiR7cXVlc3ROYW1lfVwiIGluIGJyb3dzZXIuYCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IHJlcyA9IGF3YWl0IEhUVFAuZ2V0KHsgdXJsOiBgL2FwcGxpY2F0aW9ucy9wdWJsaWM/YXBwbGljYXRpb25faWRzPSR7YXBwbGljYXRpb25JZH1gIH0pO1xuXHRcdFx0Y29uc3QgYXBwRGF0YSA9IHJlcy5ib2R5WzBdO1xuXHRcdFx0Y29uc3QgZXhlTmFtZSA9IGFwcERhdGEuZXhlY3V0YWJsZXMuZmluZCh4ID0+IHgub3MgPT09IFwid2luMzJcIikubmFtZS5yZXBsYWNlKFwiPlwiLCBcIlwiKTtcblxuXHRcdFx0Y29uc3QgZmFrZUdhbWUgPSB7XG5cdFx0XHRcdGNtZExpbmU6IGBDOlxcXFxQcm9ncmFtIEZpbGVzXFxcXCR7YXBwRGF0YS5uYW1lfVxcXFwke2V4ZU5hbWV9YCxcblx0XHRcdFx0ZXhlTmFtZSxcblx0XHRcdFx0ZXhlUGF0aDogYGM6L3Byb2dyYW0gZmlsZXMvJHthcHBEYXRhLm5hbWUudG9Mb3dlckNhc2UoKX0vJHtleGVOYW1lfWAsXG5cdFx0XHRcdGhpZGRlbjogZmFsc2UsXG5cdFx0XHRcdGlzTGF1bmNoZXI6IGZhbHNlLFxuXHRcdFx0XHRpZDogYXBwbGljYXRpb25JZCxcblx0XHRcdFx0bmFtZTogYXBwRGF0YS5uYW1lLFxuXHRcdFx0XHRwaWQ6IHBpZCxcblx0XHRcdFx0cGlkUGF0aDogW3BpZF0sXG5cdFx0XHRcdHByb2Nlc3NOYW1lOiBhcHBEYXRhLm5hbWUsXG5cdFx0XHRcdHN0YXJ0OiBEYXRlLm5vdygpLFxuXHRcdFx0fTtcblxuXHRcdFx0Y29uc3QgcmVhbEdhbWVzID0gUnVubmluZ0dhbWVTdG9yZS5nZXRSdW5uaW5nR2FtZXMoKSA/PyBbXTtcblx0XHRcdGNvbnN0IGZha2VHYW1lcyA9IFtmYWtlR2FtZV07XG5cdFx0XHRjb25zdCByZWFsR2V0UnVubmluZ0dhbWVzID0gUnVubmluZ0dhbWVTdG9yZS5nZXRSdW5uaW5nR2FtZXM7XG5cdFx0XHRjb25zdCByZWFsR2V0R2FtZUZvclBJRCA9IFJ1bm5pbmdHYW1lU3RvcmUuZ2V0R2FtZUZvclBJRDtcblx0XHRcdFxuXHRcdFx0UnVubmluZ0dhbWVTdG9yZS5nZXRSdW5uaW5nR2FtZXMgPSAoKSA9PiBmYWtlR2FtZXM7XG5cdFx0XHRSdW5uaW5nR2FtZVN0b3JlLmdldEdhbWVGb3JQSUQgPSAocGlkKSA9PiBmYWtlR2FtZXMuZmluZCh4ID0+IHgucGlkID09PSBwaWQpO1xuXG5cdFx0XHREaXNwYXRjaGVyLmRpc3BhdGNoKHsgXG5cdFx0XHRcdHR5cGU6IFwiUlVOTklOR19HQU1FU19DSEFOR0VcIiwgXG5cdFx0XHRcdHJlbW92ZWQ6IHJlYWxHYW1lcywgXG5cdFx0XHRcdGFkZGVkOiBbZmFrZUdhbWVdLCBcblx0XHRcdFx0Z2FtZXM6IGZha2VHYW1lcyBcblx0XHRcdH0pO1xuXG5cdFx0XHRhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcblx0XHRcdFx0bGV0IGZuID0gKGRhdGEpID0+IHtcblx0XHRcdFx0XHRsZXQgcHJvZ3Jlc3MgPSBxdWVzdC5jb25maWcuY29uZmlnVmVyc2lvbiA9PT0gMVxuXHRcdFx0XHRcdFx0PyBkYXRhLnVzZXJTdGF0dXMuc3RyZWFtUHJvZ3Jlc3NTZWNvbmRzXG5cdFx0XHRcdFx0XHQ6IE1hdGguZmxvb3IoZGF0YS51c2VyU3RhdHVzLnByb2dyZXNzLlBMQVlfT05fREVTS1RPUC52YWx1ZSk7XG5cblx0XHRcdFx0XHRtYWtlVG9hc3QoYFF1ZXN0IHByb2dyZXNzOiAke3Byb2dyZXNzfS8ke3NlY29uZHNOZWVkZWR9YCk7XG5cdFx0XHRcdFx0aWYgKHByb2dyZXNzID49IHNlY29uZHNOZWVkZWQpIHtcblx0XHRcdFx0XHRcdG1ha2VUb2FzdChgQ29tcGxldGVkIHF1ZXN0OiAke3F1ZXN0TmFtZX1gKTtcblx0XHRcdFx0XHRcdFJ1bm5pbmdHYW1lU3RvcmUuZ2V0UnVubmluZ0dhbWVzID0gcmVhbEdldFJ1bm5pbmdHYW1lcztcblx0XHRcdFx0XHRcdFJ1bm5pbmdHYW1lU3RvcmUuZ2V0R2FtZUZvclBJRCA9IHJlYWxHZXRHYW1lRm9yUElEO1xuXHRcdFx0XHRcdFx0RGlzcGF0Y2hlci5kaXNwYXRjaCh7IFxuXHRcdFx0XHRcdFx0XHR0eXBlOiBcIlJVTk5JTkdfR0FNRVNfQ0hBTkdFXCIsIFxuXHRcdFx0XHRcdFx0XHRyZW1vdmVkOiBbZmFrZUdhbWVdLCBcblx0XHRcdFx0XHRcdFx0YWRkZWQ6IFtdLCBcblx0XHRcdFx0XHRcdFx0Z2FtZXM6IFtdIFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHREaXNwYXRjaGVyLnVuc3Vic2NyaWJlKFwiUVVFU1RTX1NFTkRfSEVBUlRCRUFUX1NVQ0NFU1NcIiwgZm4pO1xuXHRcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdFx0RGlzcGF0Y2hlci5zdWJzY3JpYmUoXCJRVUVTVFNfU0VORF9IRUFSVEJFQVRfU1VDQ0VTU1wiLCBmbik7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0gZWxzZSBpZiAodGFza05hbWUgPT09IFwiU1RSRUFNX09OX0RFU0tUT1BcIikge1xuXHRcdGlmICghaXNBcHApIHtcblx0XHRcdG1ha2VUb2FzdChgRVJST1I6IENhbm5vdCBzcG9vZiBTVFJFQU1fT05fREVTS1RPUCBmb3IgXCIke3F1ZXN0TmFtZX1cIiBpbiBicm93c2VyLmApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgcmVhbEZ1bmMgPSBBcHBsaWNhdGlvblN0cmVhbWluZ1N0b3JlLmdldFN0cmVhbWVyQWN0aXZlU3RyZWFtTWV0YWRhdGE7XG5cdFx0XHRBcHBsaWNhdGlvblN0cmVhbWluZ1N0b3JlLmdldFN0cmVhbWVyQWN0aXZlU3RyZWFtTWV0YWRhdGEgPSAoKSA9PiAoe1xuXHRcdFx0XHRpZDogYXBwbGljYXRpb25JZCxcblx0XHRcdFx0cGlkLFxuXHRcdFx0XHRzb3VyY2VOYW1lOiBudWxsXG5cdFx0XHR9KTtcblxuXHRcdFx0YXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG5cdFx0XHRcdGxldCBmbiA9IChkYXRhKSA9PiB7XG5cdFx0XHRcdFx0bGV0IHByb2dyZXNzID0gcXVlc3QuY29uZmlnLmNvbmZpZ1ZlcnNpb24gPT09IDFcblx0XHRcdFx0XHRcdD8gZGF0YS51c2VyU3RhdHVzLnN0cmVhbVByb2dyZXNzU2Vjb25kc1xuXHRcdFx0XHRcdFx0OiBNYXRoLmZsb29yKGRhdGEudXNlclN0YXR1cy5wcm9ncmVzcy5TVFJFQU1fT05fREVTS1RPUC52YWx1ZSk7XG5cblx0XHRcdFx0XHRtYWtlVG9hc3QoYFF1ZXN0IHByb2dyZXNzOiAke3Byb2dyZXNzfS8ke3NlY29uZHNOZWVkZWR9YCk7XG5cdFx0XHRcdFx0aWYgKHByb2dyZXNzID49IHNlY29uZHNOZWVkZWQpIHtcblx0XHRcdFx0XHRcdG1ha2VUb2FzdChgQ29tcGxldGVkIHF1ZXN0OiAke3F1ZXN0TmFtZX1gKTtcblx0XHRcdFx0XHRcdEFwcGxpY2F0aW9uU3RyZWFtaW5nU3RvcmUuZ2V0U3RyZWFtZXJBY3RpdmVTdHJlYW1NZXRhZGF0YSA9IHJlYWxGdW5jO1xuXHRcdFx0XHRcdFx0RGlzcGF0Y2hlci51bnN1YnNjcmliZShcIlFVRVNUU19TRU5EX0hFQVJUQkVBVF9TVUNDRVNTXCIsIGZuKTtcblx0XHRcdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHRcdERpc3BhdGNoZXIuc3Vic2NyaWJlKFwiUVVFU1RTX1NFTkRfSEVBUlRCRUFUX1NVQ0NFU1NcIiwgZm4pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKHRhc2tOYW1lID09PSBcIlBMQVlfQUNUSVZJVFlcIikge1xuXHRcdGNvbnN0IGNoYW5uZWxJZCA9IENoYW5uZWxTdG9yZS5nZXRTb3J0ZWRQcml2YXRlQ2hhbm5lbHMoKVswXT8uaWQgPz9cblx0XHRcdE9iamVjdC52YWx1ZXMoR3VpbGRDaGFubmVsU3RvcmUuZ2V0QWxsR3VpbGRzKCkpLmZpbmQoeCA9PiB4ICE9IG51bGwgJiYgeC5WT0NBTC5sZW5ndGggPiAwKT8uVk9DQUxbMF0/LmNoYW5uZWw/LmlkO1xuXG5cdFx0Y29uc3Qgc3RyZWFtS2V5ID0gYGNhbGw6JHtjaGFubmVsSWR9OjFgO1xuXG5cdFx0d2hpbGUgKHRydWUpIHtcblx0XHRcdGNvbnN0IHJlcyA9IGF3YWl0IEhUVFAucG9zdCh7IHVybDogYC9xdWVzdHMvJHtxdWVzdC5pZH0vaGVhcnRiZWF0YCwgYm9keTogeyBzdHJlYW1fa2V5OiBzdHJlYW1LZXksIHRlcm1pbmFsOiBmYWxzZSB9IH0pO1xuXHRcdFx0Y29uc3QgcHJvZ3Jlc3MgPSByZXMuYm9keS5wcm9ncmVzcy5QTEFZX0FDVElWSVRZLnZhbHVlO1xuXHRcdFx0bWFrZVRvYXN0KGBRdWVzdCBwcm9ncmVzczogJHtwcm9ncmVzc30vJHtzZWNvbmRzTmVlZGVkfWApO1xuXG5cdFx0XHRpZiAocHJvZ3Jlc3MgPj0gc2Vjb25kc05lZWRlZCkge1xuXHRcdFx0XHRhd2FpdCBIVFRQLnBvc3QoeyB1cmw6IGAvcXVlc3RzLyR7cXVlc3QuaWR9L2hlYXJ0YmVhdGAsIGJvZHk6IHsgc3RyZWFtX2tleTogc3RyZWFtS2V5LCB0ZXJtaW5hbDogdHJ1ZSB9IH0pO1xuXHRcdFx0XHRtYWtlVG9hc3QoYENvbXBsZXRlZCBxdWVzdDogJHtxdWVzdE5hbWV9YCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0YXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDIwMDAwKSk7XG5cdFx0fVxuXHR9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGFjY2VwdEFsbFF1ZXN0cygpIHtcbiAgICBjb25zdCBVbmFjY2VwdGVkUXVlc3RzID0gWy4uLlF1ZXN0c1N0b3JlLnF1ZXN0cy52YWx1ZXMoKV0uZmlsdGVyKHggPT5cbiAgICAgICAgeC5pZCAhPT0gXCIxNDEyNDkxNTcwODIwODEyOTMzXCIgJiZcbiAgICAgICAgeC5jb25maWc/LnJld2FyZHNDb25maWc/LnJld2FyZHNbMF0ub3JiUXVhbnRpdHkgJiZcbiAgICAgICAgIXgudXNlclN0YXR1cz8uZW5yb2xsZWRBdCAmJlxuICAgICAgICAheC51c2VyU3RhdHVzPy5jb21wbGV0ZWRBdCAmJlxuICAgICAgICBuZXcgRGF0ZSh4LmNvbmZpZy5leHBpcmVzQXQpLmdldFRpbWUoKSA+IERhdGUubm93KClcbiAgICApO1xuICAgIFxuICAgIGlmIChVbmFjY2VwdGVkUXVlc3RzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBtYWtlVG9hc3QoYEZvdW5kICR7VW5hY2NlcHRlZFF1ZXN0cy5sZW5ndGh9IHVuYWNjZXB0ZWQgb3JicyBxdWVzdHMuYCk7XG5cblx0XHRmb3IgKGxldCBxdWVzdCBvZiBVbmFjY2VwdGVkUXVlc3RzKSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IEhUVFAucG9zdCh7XG5cdFx0XHRcdHVybDogYC9xdWVzdHMvJHtxdWVzdC5pZH0vZW5yb2xsYCxcblx0XHRcdFx0Ym9keToge1xuXHRcdFx0XHRcdFwibG9jYXRpb25cIjogMTEsXG5cdFx0XHRcdFx0XCJpc190YXJnZXRlZFwiOiBmYWxzZSxcblx0XHRcdFx0XHRcIm1ldGFkYXRhX3Jhd1wiOiBudWxsXG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcblx0XHRcdFx0bWFrZVRvYXN0KGAke3F1ZXN0LmNvbmZpZy5tZXNzYWdlcy5xdWVzdE5hbWV9IGFjY2VwdGVkIDozYClcblx0XHRcdH0gZWxzZSBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MjkpIHtcblx0XHRcdFx0bWFrZVRvYXN0KCdZb3UgaGF2ZSBiZWVuIHRpbWVkIG91dCA6KCcpXG5cdFx0XHR9XG5cdFx0fVxuICAgIH1cblxuICAgIG1ha2VUb2FzdCgnQWxsIG9yYnMgcXVlc3RzIGFjY2VwdGVkIEIpJyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHN0YXJ0QWxsUXVlc3RzKCkge1xuXHRpZiAocnVubmluZykge1xuXHRcdG1ha2VUb2FzdChcIlF1ZXN0IGNvbXBsZXRlciBpcyBhbHJlYWR5IHJ1bm5pbmchID46Y1wiKTtcblx0XHRyZXR1cm47XHRcblx0fVxuXHRcbiAgXHRjb25zdCBhbGxRdWVzdHMgPSBbLi4uUXVlc3RzU3RvcmUucXVlc3RzLnZhbHVlcygpXS5maWx0ZXIoeCA9PlxuICAgIFx0eC51c2VyU3RhdHVzPy5lbnJvbGxlZEF0ICYmXG4gICAgXHQheC51c2VyU3RhdHVzPy5jb21wbGV0ZWRBdCAmJlxuICAgIFx0bmV3IERhdGUoeC5jb25maWcuZXhwaXJlc0F0KS5nZXRUaW1lKCkgPiBEYXRlLm5vdygpXG4gIFx0KTtcblxuXG5cdGlmIChhbGxRdWVzdHMubGVuZ3RoID09PSAwKSB7XG5cdFx0cnVubmluZyA9IGZhbHNlO1xuXHRcdG1ha2VUb2FzdChcIkFsbCBxdWVzdHMgYXJlIGFscmVhZHkgY29tcGxldGVkIVwiKTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRtYWtlVG9hc3QoYEZvdW5kICR7YWxsUXVlc3RzLmxlbmd0aH0gdW5jb21wbGV0ZWQgcXVlc3QocykuIFN0YXJ0aW5nLi4uYCk7XG5cdFxuXHRmb3IgKGxldCBxdWVzdCBvZiBhbGxRdWVzdHMpIHtcblx0XHR0cnkge1xuXHRcdFx0cnVubmluZyA9IHRydWU7XG5cdFx0XHRhd2FpdCBjb21wbGV0ZVF1ZXN0KHF1ZXN0KTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRtYWtlVG9hc3QoYEVycm9yIGNvbXBsZXRpbmcgcXVlc3Q6ICR7cXVlc3QuY29uZmlnLm1lc3NhZ2VzLnF1ZXN0TmFtZX1gLCBlKTtcblx0XHR9XG5cdH1cblxuXHRydW5uaW5nID0gZmFsc2U7XG5cdG1ha2VUb2FzdChcIkFsbCBhY2NlcHRlZCBxdWVzdHMgaGF2ZSBiZWVuIGNvbXBsZXRlZCFcIik7XG59XG5cbmZ1bmN0aW9uIG1ha2VUb2FzdCguLi5hcmdzOiBhbnlbXSkge1xuICAgIHNob3dUb2FzdChjcmVhdGVUb2FzdCguLi5hcmdzKSlcbn1cblxuZnVuY3Rpb24gbWFrZUljb24oKSB7XG4gIHJldHVybiAoKSA9PiAoXG4gICAgPHN2ZyB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XG4gICAgICA8cGF0aFxuICAgICAgICBmaWxsPXtcIiNjYmE2ZjdcIn1cbiAgICAgICAgZD1cIk03LjUgMjEuN2E4Ljk1IDguOTUgMCAwIDEgOSAwIDEgMSAwIDAgMCAxLTEuNzNjLS42LS4zNS0xLjI0LS42NC0xLjktLjg3LjU0LS4zIDEuMDUtLjY1IDEuNTItMS4wN2EzLjk4IDMuOTggMCAwIDAgNS40OS0xLjguNzcuNzcgMCAwIDAtLjI0LS45NSAzLjk4IDMuOTggMCAwIDAtMi4wMi0uNzZBNCA0IDAgMCAwIDIzIDEwLjQ3YS43Ni43NiAwIDAgMC0uNzEtLjcxIDQuMDYgNC4wNiAwIDAgMC0xLjYuMjIgMy45OSAzLjk5IDAgMCAwIC41NC01LjM1Ljc3Ljc3IDAgMCAwLS45NS0uMjRjLS43NS4zNi0xLjM3Ljk1LTEuNzcgMS42N1Y2YTQgNCAwIDAgMC00LjktMy45Ljc3Ljc3IDAgMCAwLS42LjcyIDQgNCAwIDAgMCAzLjcgNC4xN2MuODkgMS4zIDEuMyAyLjk1IDEuMyA0LjUxIDAgMy42Ni0yLjc1IDYuNS02IDYuNXMtNi0yLjg0LTYtNi41YzAtMS41Ni40MS0zLjIxIDEuMy00LjUxQTQgNCAwIDAgMCAxMSAyLjgyYS43Ny43NyAwIDAgMC0uNi0uNzIgNC4wMSA0LjAxIDAgMCAwLTQuOSAzLjk2QTQuMDIgNC4wMiAwIDAgMCAzLjczIDQuNGEuNzcuNzcgMCAwIDAtLjk1LjI0IDMuOTggMy45OCAwIDAgMCAuNTUgNS4zNSA0IDQgMCAwIDAtMS42LS4yMi43Ni43NiAwIDAgMC0uNzIuNzFsLS4wMS4yOGE0IDQgMCAwIDAgMi42NSAzLjc3Yy0uNzUuMDYtMS40NS4zMy0yLjAyLjc2LS4zLjIyLS40LjYyLS4yNC45NWE0IDQgMCAwIDAgNS40OSAxLjhjLjQ3LjQyLjk4Ljc4IDEuNTMgMS4wNy0uNjcuMjMtMS4zLjUyLTEuOTEuODdhMSAxIDAgMSAwIDEgMS43M1pcIlxuICAgICAgLz5cbiAgICA8L3N2Zz5cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENvbXBsZXRlUXVlc3RCdXR0b25JbnRlcm5hbCgpIHtcbiAgcmV0dXJuIChcbiAgICA8QnV0dG9uXG4gICAgICB0b29sdGlwVGV4dD17IFwiQ29tcGxldGUgcXVlc3RzISA6M1wiIH1cbiAgICAgIGljb249eyBtYWtlSWNvbigpIH1cbiAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgcGxhdGVkPVwicGxhdGVkXCJcbiAgICAgIG9uQ2xpY2s9eyAoKSA9PiBzdGFydEFsbFF1ZXN0cygpIH1cbiAgICAgIG9uQ29udGV4dE1lbnU9eyAoKSA9PiBhY2NlcHRBbGxRdWVzdHMoKSB9XG4gICAgLz5cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENvbXBsZXRlUXVlc3RCdXR0b24oKSB7XG4gIHJldHVybiA8RXJyb3JCb3VuZGFyeT5cbiAgICA8Q29tcGxldGVRdWVzdEJ1dHRvbkludGVybmFsIC8+XG4gIDwvRXJyb3JCb3VuZGFyeT5cbn1cblxuXG5Db21tYW5kcy5yZWdpc3RlckNvbW1hbmQoe1xuICBpZDogXCJhY2NlcHRRdWVzdHNcIixcbiAgZGVzY3JpcHRpb246IFwiQWNjZXB0IFF1ZXN0c1wiLFxuICBpbnB1dFR5cGU6IElucHV0VHlwZS5CVUlMVF9JTixcbiAgdHlwZTogQ29tbWFuZFR5cGUuQ0hBVCxcbiAgb3B0aW9uczogW10sXG4gIGV4ZWN1dGU6ICgpID0+IHtcbiAgICBhY2NlcHRBbGxRdWVzdHMoKTtcbiAgfVxufSk7XG5cbkNvbW1hbmRzLnJlZ2lzdGVyQ29tbWFuZCh7XG4gIGlkOiBcInF1ZXN0XCIsXG4gIGRlc2NyaXB0aW9uOiBcIlJ1biBxdWVzdCBjb21wbGV0ZXJcIixcbiAgaW5wdXRUeXBlOiBJbnB1dFR5cGUuQlVJTFRfSU4sXG4gIHR5cGU6IENvbW1hbmRUeXBlLkNIQVQsXG4gIG9wdGlvbnM6IFtdLFxuICBleGVjdXRlOiAoKSA9PiB7XG4gICAgc3RhcnRBbGxRdWVzdHMoKTtcbiAgfVxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQ0FBc0I7QUFDdEIscUJBQWtCO0FBQ2xCLG9DQUEwQjtBQUMxQiw2QkFBNkY7QUFDN0YsMEJBQXVCO0FBRXZCLHNCQUFtRDtBQUVuRCxpQ0FBcUI7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QyxRQUFBLGNBQUMsU0FBSSxPQUFNLE1BQUssUUFBTyxNQUFLLFNBQVEsZUFDbEMsNkJBQUFBLFFBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE1BQU07QUFBQSxRQUNOLEdBQUU7QUFBQTtBQUFBLElBQ0osQ0FDRjtBQUFBLEVBRUo7QUFFTyxXQUFTLDhCQUE4QjtBQUM1QyxXQUNFLDZCQUFBQSxRQUFBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxhQUFjO0FBQUEsUUFDZCxNQUFPLFNBQVM7QUFBQSxRQUNoQixNQUFLO0FBQUEsUUFDTCxRQUFPO0FBQUEsUUFDUCxTQUFVLE1BQU0sZUFBZTtBQUFBLFFBQy9CLGVBQWdCLE1BQU0sZ0JBQWdCO0FBQUE7QUFBQSxJQUN4QztBQUFBLEVBRUo7QUFFTyxXQUFTLHNCQUFzQjtBQUNwQyxXQUFPLDZCQUFBQSxRQUFBLGNBQUMsNEJBQUFDLFNBQUEsTUFDTiw2QkFBQUQsUUFBQSxjQUFDLGlDQUE0QixDQUMvQjtBQUFBLEVBQ0Y7QUFHQSwyQkFBQUUsUUFBUyxnQkFBZ0I7QUFBQSxJQUN2QixJQUFJO0FBQUEsSUFDSixhQUFhO0FBQUEsSUFDYjtBQUFBLElBQ0E7QUFBQSxJQUNBLFNBQVMsQ0FBQztBQUFBLElBQ1YsU0FBUyxNQUFNO0FBQ2Isc0JBQWdCO0FBQUEsSUFDbEI7QUFBQSxFQUNGLENBQUM7QUFFRCwyQkFBQUEsUUFBUyxnQkFBZ0I7QUFBQSxJQUN2QixJQUFJO0FBQUEsSUFDSixhQUFhO0FBQUEsSUFDYjtBQUFBLElBQ0E7QUFBQSxJQUNBLFNBQVMsQ0FBQztBQUFBLElBQ1YsU0FBUyxNQUFNO0FBQ2IscUJBQWU7QUFBQSxJQUNqQjtBQUFBLEVBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsic3BhY2VwYWNrIiwgInBpZCIsICJEaXNwYXRjaGVyIiwgIlJlYWN0IiwgIkVycm9yQm91bmRhcnkiLCAiQ29tbWFuZHMiXQp9Cg==
