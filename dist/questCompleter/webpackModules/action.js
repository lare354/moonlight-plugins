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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL3F1ZXN0Q29tcGxldGVyL3dlYnBhY2tNb2R1bGVzL2FjdGlvbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBzcGFjZXBhY2sgZnJvbSBcIkBtb29ubGlnaHQtbW9kL3dwL3NwYWNlcGFja19zcGFjZXBhY2tcIjtcbmltcG9ydCBSZWFjdCBmcm9tICdAbW9vbmxpZ2h0LW1vZC93cC9yZWFjdCc7XG5pbXBvcnQgRXJyb3JCb3VuZGFyeSBmcm9tICdAbW9vbmxpZ2h0LW1vZC93cC9jb21tb25fRXJyb3JCb3VuZGFyeSc7XG5pbXBvcnQgeyBBcHBsaWNhdGlvblN0cmVhbWluZ1N0b3JlLCBSdW5uaW5nR2FtZVN0b3JlLCBDaGFubmVsU3RvcmUsIEd1aWxkQ2hhbm5lbFN0b3JlIH0gZnJvbSBcIkBtb29ubGlnaHQtbW9kL3dwL2NvbW1vbl9zdG9yZXNcIjtcbmltcG9ydCBEaXNwYXRjaGVyIGZyb20gXCJAbW9vbmxpZ2h0LW1vZC93cC9kaXNjb3JkL0Rpc3BhdGNoZXJcIjtcbmNvbnN0IHsgSFRUUCB9ID0gc3BhY2VwYWNrLnJlcXVpcmUoXCJkaXNjb3JkL3V0aWxzL0hUVFBVdGlsc1wiKTtcbmltcG9ydCB7IFhTbWFsbEljb24sIGNyZWF0ZVRvYXN0LCBzaG93VG9hc3QgfSBmcm9tIFwiQG1vb25saWdodC1tb2Qvd3AvZGlzY29yZC9jb21wb25lbnRzL2NvbW1vbi9pbmRleFwiO1xuXG5pbXBvcnQgQ29tbWFuZHMgZnJvbSBcIkBtb29ubGlnaHQtbW9kL3dwL2NvbW1hbmRzX2NvbW1hbmRzXCI7XG5pbXBvcnQgeyBJbnB1dFR5cGUsIENvbW1hbmRUeXBlIH0gZnJvbSBcIkBtb29ubGlnaHQtbW9kL3R5cGVzL2NvcmVFeHRlbnNpb25zL2NvbW1hbmRzXCI7XG5cbmxldCB3cFJlcXVpcmUgPSB3ZWJwYWNrQ2h1bmtkaXNjb3JkX2FwcC5wdXNoKFtbU3ltYm9sKCldLCB7fSwgciA9PiByXSk7XG53ZWJwYWNrQ2h1bmtkaXNjb3JkX2FwcC5wb3AoKTtcblxubGV0IFF1ZXN0c1N0b3JlID0gT2JqZWN0LnZhbHVlcyh3cFJlcXVpcmUuYykuZmluZCh4ID0+IHg/LmV4cG9ydHM/LkE/Ll9fcHJvdG9fXz8uZ2V0UXVlc3QpLmV4cG9ydHMuQTtcblxuaWYoIVF1ZXN0c1N0b3JlKSB7XG5cdFF1ZXN0c1N0b3JlID0gT2JqZWN0LnZhbHVlcyh3cFJlcXVpcmUuYykuZmluZCh4ID0+IHg/LmV4cG9ydHM/Llo/Ll9fcHJvdG9fXz8uZ2V0UXVlc3QpLmV4cG9ydHMuWjtcbn1cblxuLy9jb25zdCBCdXR0b24gPSBzcGFjZXBhY2suZmluZEJ5Q29kZShcIi5HUkVFTixwb3NpdGlvbktleVN0ZW1PdmVycmlkZTpcIilbMF0uZXhwb3J0cy5BO1xuXG5sZXQgaXNBcHAgPSAhbW9vbmxpZ2h0Tm9kZS5pc0Jyb3dzZXI7XG5sZXQgcnVubmluZyA9IGZhbHNlO1xuXG4vLyBxdWVzdCBjb21wbGV0aW9uIGxvZ2ljIGZyb20gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vYWFtaWFhLzIwNGNkOWQ0MjAxM2RlZDlmYWY2NDZmYWU3Zjg5ZmJiXG4vL1xuLy8gVG9hc3QgaW1wbGVtZW50YXRpb24gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vRW5vdmFsZS9tb29ubGlnaHQtZXh0ZW5zaW9ucy9ibG9iL21haW4vc3JjL29yYnNBdXRvbWF0aW9uL3dlYnBhY2tNb2R1bGVzL2VudHJ5cG9pbnQudHN4XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbXBsZXRlUXVlc3QocXVlc3QpIHtcblxuICAgIGNvbnN0IHBpZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMwMDAwKSArIDEwMDBcblxuICAgIGNvbnN0IGFwcGxpY2F0aW9uSWQgPSBxdWVzdC5jb25maWcuYXBwbGljYXRpb24uaWRcbiAgICBjb25zdCBhcHBsaWNhdGlvbk5hbWUgPSBxdWVzdC5jb25maWcuYXBwbGljYXRpb24ubmFtZVxuICAgIGNvbnN0IHF1ZXN0TmFtZSA9IHF1ZXN0LmNvbmZpZy5tZXNzYWdlcy5xdWVzdE5hbWVcbiAgICBjb25zdCB0YXNrQ29uZmlnID0gcXVlc3QuY29uZmlnLnRhc2tDb25maWcgPz8gcXVlc3QuY29uZmlnLnRhc2tDb25maWdWMlxuICAgIGNvbnN0IHRhc2tOYW1lID0gW1wiV0FUQ0hfVklERU9cIiwgXCJQTEFZX09OX0RFU0tUT1BcIiwgXCJTVFJFQU1fT05fREVTS1RPUFwiLCBcIlBMQVlfQUNUSVZJVFlcIiwgXCJXQVRDSF9WSURFT19PTl9NT0JJTEVcIl0uZmluZCh4ID0+IHRhc2tDb25maWcudGFza3NbeF0gIT0gbnVsbClcbiAgICBjb25zdCBzZWNvbmRzTmVlZGVkID0gdGFza0NvbmZpZy50YXNrc1t0YXNrTmFtZV0udGFyZ2V0XG4gICAgbGV0IHNlY29uZHNEb25lID0gcXVlc3QudXNlclN0YXR1cz8ucHJvZ3Jlc3M/Llt0YXNrTmFtZV0/LnZhbHVlID8/IDBcblxuXG5cdGlmICh0YXNrTmFtZSA9PT0gXCJXQVRDSF9WSURFT1wiIHx8IHRhc2tOYW1lID09PSBcIldBVENIX1ZJREVPX09OX01PQklMRVwiKSB7XG5cdFx0Y29uc3QgbWF4RnV0dXJlID0gMTAsIHNwZWVkID0gNywgaW50ZXJ2YWwgPSAxO1xuXHRcdGNvbnN0IGVucm9sbGVkQXQgPSBuZXcgRGF0ZShxdWVzdC51c2VyU3RhdHVzLmVucm9sbGVkQXQpLmdldFRpbWUoKTtcblx0XHRsZXQgY29tcGxldGVkID0gZmFsc2U7XG5cblx0XHR3aGlsZSAodHJ1ZSkge1xuXHRcdFx0Y29uc3QgbWF4QWxsb3dlZCA9IE1hdGguZmxvb3IoKERhdGUubm93KCkgLSBlbnJvbGxlZEF0KSAvIDEwMDApICsgbWF4RnV0dXJlO1xuXHRcdFx0Y29uc3QgZGlmZiA9IG1heEFsbG93ZWQgLSBzZWNvbmRzRG9uZTtcblx0XHRcdGNvbnN0IHRpbWVzdGFtcCA9IHNlY29uZHNEb25lICsgc3BlZWQ7XG5cblx0XHRcdGlmIChkaWZmID49IHNwZWVkKSB7XG5cdFx0XHRcdGNvbnN0IHJlcyA9IGF3YWl0IEhUVFAucG9zdCh7XG5cdFx0XHRcdFx0dXJsOiBgL3F1ZXN0cy8ke3F1ZXN0LmlkfS92aWRlby1wcm9ncmVzc2AsXG5cdFx0XHRcdFx0Ym9keTogeyB0aW1lc3RhbXA6IE1hdGgubWluKHNlY29uZHNOZWVkZWQsIHRpbWVzdGFtcCArIE1hdGgucmFuZG9tKCkpIH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdGNvbXBsZXRlZCA9IHJlcy5ib2R5LmNvbXBsZXRlZF9hdCAhPSBudWxsO1xuXHRcdFx0XHRzZWNvbmRzRG9uZSA9IE1hdGgubWluKHNlY29uZHNOZWVkZWQsIHRpbWVzdGFtcCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aW1lc3RhbXAgPj0gc2Vjb25kc05lZWRlZCkgYnJlYWs7XG5cdFx0XHRhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgaW50ZXJ2YWwgKiAxMDAwKSk7XG5cdFx0fVxuXG5cdFx0aWYgKCFjb21wbGV0ZWQpIHtcblx0XHRcdGF3YWl0IEhUVFAucG9zdCh7IHVybDogYC9xdWVzdHMvJHtxdWVzdC5pZH0vdmlkZW8tcHJvZ3Jlc3NgLCBib2R5OiB7IHRpbWVzdGFtcDogc2Vjb25kc05lZWRlZCB9IH0pO1xuXHRcdH1cblxuXHRcdG1ha2VUb2FzdChgQ29tcGxldGVkIHF1ZXN0OiAke3F1ZXN0TmFtZX1gKTtcblx0XHRcblx0fSBlbHNlIGlmICh0YXNrTmFtZSA9PT0gXCJQTEFZX09OX0RFU0tUT1BcIikge1xuXHRcdGlmICghaXNBcHApIHtcblx0XHRcdG1ha2VUb2FzdChgRVJST1I6IENhbm5vdCBzcG9vZiBQTEFZX09OX0RFU0tUT1AgZm9yIFwiJHtxdWVzdE5hbWV9XCIgaW4gYnJvd3Nlci5gKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgcmVzID0gYXdhaXQgSFRUUC5nZXQoeyB1cmw6IGAvYXBwbGljYXRpb25zL3B1YmxpYz9hcHBsaWNhdGlvbl9pZHM9JHthcHBsaWNhdGlvbklkfWAgfSk7XG5cdFx0XHRjb25zdCBhcHBEYXRhID0gcmVzLmJvZHlbMF07XG5cdFx0XHRjb25zdCBleGVOYW1lID0gYXBwRGF0YS5leGVjdXRhYmxlcy5maW5kKHggPT4geC5vcyA9PT0gXCJ3aW4zMlwiKS5uYW1lLnJlcGxhY2UoXCI+XCIsIFwiXCIpO1xuXG5cdFx0XHRjb25zdCBmYWtlR2FtZSA9IHtcblx0XHRcdFx0Y21kTGluZTogYEM6XFxcXFByb2dyYW0gRmlsZXNcXFxcJHthcHBEYXRhLm5hbWV9XFxcXCR7ZXhlTmFtZX1gLFxuXHRcdFx0XHRleGVOYW1lLFxuXHRcdFx0XHRleGVQYXRoOiBgYzovcHJvZ3JhbSBmaWxlcy8ke2FwcERhdGEubmFtZS50b0xvd2VyQ2FzZSgpfS8ke2V4ZU5hbWV9YCxcblx0XHRcdFx0aGlkZGVuOiBmYWxzZSxcblx0XHRcdFx0aXNMYXVuY2hlcjogZmFsc2UsXG5cdFx0XHRcdGlkOiBhcHBsaWNhdGlvbklkLFxuXHRcdFx0XHRuYW1lOiBhcHBEYXRhLm5hbWUsXG5cdFx0XHRcdHBpZDogcGlkLFxuXHRcdFx0XHRwaWRQYXRoOiBbcGlkXSxcblx0XHRcdFx0cHJvY2Vzc05hbWU6IGFwcERhdGEubmFtZSxcblx0XHRcdFx0c3RhcnQ6IERhdGUubm93KCksXG5cdFx0XHR9O1xuXG5cdFx0XHRjb25zdCByZWFsR2FtZXMgPSBSdW5uaW5nR2FtZVN0b3JlLmdldFJ1bm5pbmdHYW1lcygpID8/IFtdO1xuXHRcdFx0Y29uc3QgZmFrZUdhbWVzID0gW2Zha2VHYW1lXTtcblx0XHRcdGNvbnN0IHJlYWxHZXRSdW5uaW5nR2FtZXMgPSBSdW5uaW5nR2FtZVN0b3JlLmdldFJ1bm5pbmdHYW1lcztcblx0XHRcdGNvbnN0IHJlYWxHZXRHYW1lRm9yUElEID0gUnVubmluZ0dhbWVTdG9yZS5nZXRHYW1lRm9yUElEO1xuXHRcdFx0XG5cdFx0XHRSdW5uaW5nR2FtZVN0b3JlLmdldFJ1bm5pbmdHYW1lcyA9ICgpID0+IGZha2VHYW1lcztcblx0XHRcdFJ1bm5pbmdHYW1lU3RvcmUuZ2V0R2FtZUZvclBJRCA9IChwaWQpID0+IGZha2VHYW1lcy5maW5kKHggPT4geC5waWQgPT09IHBpZCk7XG5cblx0XHRcdERpc3BhdGNoZXIuZGlzcGF0Y2goeyBcblx0XHRcdFx0dHlwZTogXCJSVU5OSU5HX0dBTUVTX0NIQU5HRVwiLCBcblx0XHRcdFx0cmVtb3ZlZDogcmVhbEdhbWVzLCBcblx0XHRcdFx0YWRkZWQ6IFtmYWtlR2FtZV0sIFxuXHRcdFx0XHRnYW1lczogZmFrZUdhbWVzIFxuXHRcdFx0fSk7XG5cblx0XHRcdGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuXHRcdFx0XHRsZXQgZm4gPSAoZGF0YSkgPT4ge1xuXHRcdFx0XHRcdGxldCBwcm9ncmVzcyA9IHF1ZXN0LmNvbmZpZy5jb25maWdWZXJzaW9uID09PSAxXG5cdFx0XHRcdFx0XHQ/IGRhdGEudXNlclN0YXR1cy5zdHJlYW1Qcm9ncmVzc1NlY29uZHNcblx0XHRcdFx0XHRcdDogTWF0aC5mbG9vcihkYXRhLnVzZXJTdGF0dXMucHJvZ3Jlc3MuUExBWV9PTl9ERVNLVE9QLnZhbHVlKTtcblxuXHRcdFx0XHRcdG1ha2VUb2FzdChgUXVlc3QgcHJvZ3Jlc3M6ICR7cHJvZ3Jlc3N9LyR7c2Vjb25kc05lZWRlZH1gKTtcblx0XHRcdFx0XHRpZiAocHJvZ3Jlc3MgPj0gc2Vjb25kc05lZWRlZCkge1xuXHRcdFx0XHRcdFx0bWFrZVRvYXN0KGBDb21wbGV0ZWQgcXVlc3Q6ICR7cXVlc3ROYW1lfWApO1xuXHRcdFx0XHRcdFx0UnVubmluZ0dhbWVTdG9yZS5nZXRSdW5uaW5nR2FtZXMgPSByZWFsR2V0UnVubmluZ0dhbWVzO1xuXHRcdFx0XHRcdFx0UnVubmluZ0dhbWVTdG9yZS5nZXRHYW1lRm9yUElEID0gcmVhbEdldEdhbWVGb3JQSUQ7XG5cdFx0XHRcdFx0XHREaXNwYXRjaGVyLmRpc3BhdGNoKHsgXG5cdFx0XHRcdFx0XHRcdHR5cGU6IFwiUlVOTklOR19HQU1FU19DSEFOR0VcIiwgXG5cdFx0XHRcdFx0XHRcdHJlbW92ZWQ6IFtmYWtlR2FtZV0sIFxuXHRcdFx0XHRcdFx0XHRhZGRlZDogW10sIFxuXHRcdFx0XHRcdFx0XHRnYW1lczogW10gXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdERpc3BhdGNoZXIudW5zdWJzY3JpYmUoXCJRVUVTVFNfU0VORF9IRUFSVEJFQVRfU1VDQ0VTU1wiLCBmbik7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0XHREaXNwYXRjaGVyLnN1YnNjcmliZShcIlFVRVNUU19TRU5EX0hFQVJUQkVBVF9TVUNDRVNTXCIsIGZuKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fSBlbHNlIGlmICh0YXNrTmFtZSA9PT0gXCJTVFJFQU1fT05fREVTS1RPUFwiKSB7XG5cdFx0aWYgKCFpc0FwcCkge1xuXHRcdFx0bWFrZVRvYXN0KGBFUlJPUjogQ2Fubm90IHNwb29mIFNUUkVBTV9PTl9ERVNLVE9QIGZvciBcIiR7cXVlc3ROYW1lfVwiIGluIGJyb3dzZXIuYCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCByZWFsRnVuYyA9IEFwcGxpY2F0aW9uU3RyZWFtaW5nU3RvcmUuZ2V0U3RyZWFtZXJBY3RpdmVTdHJlYW1NZXRhZGF0YTtcblx0XHRcdEFwcGxpY2F0aW9uU3RyZWFtaW5nU3RvcmUuZ2V0U3RyZWFtZXJBY3RpdmVTdHJlYW1NZXRhZGF0YSA9ICgpID0+ICh7XG5cdFx0XHRcdGlkOiBhcHBsaWNhdGlvbklkLFxuXHRcdFx0XHRwaWQsXG5cdFx0XHRcdHNvdXJjZU5hbWU6IG51bGxcblx0XHRcdH0pO1xuXG5cdFx0XHRhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcblx0XHRcdFx0bGV0IGZuID0gKGRhdGEpID0+IHtcblx0XHRcdFx0XHRsZXQgcHJvZ3Jlc3MgPSBxdWVzdC5jb25maWcuY29uZmlnVmVyc2lvbiA9PT0gMVxuXHRcdFx0XHRcdFx0PyBkYXRhLnVzZXJTdGF0dXMuc3RyZWFtUHJvZ3Jlc3NTZWNvbmRzXG5cdFx0XHRcdFx0XHQ6IE1hdGguZmxvb3IoZGF0YS51c2VyU3RhdHVzLnByb2dyZXNzLlNUUkVBTV9PTl9ERVNLVE9QLnZhbHVlKTtcblxuXHRcdFx0XHRcdG1ha2VUb2FzdChgUXVlc3QgcHJvZ3Jlc3M6ICR7cHJvZ3Jlc3N9LyR7c2Vjb25kc05lZWRlZH1gKTtcblx0XHRcdFx0XHRpZiAocHJvZ3Jlc3MgPj0gc2Vjb25kc05lZWRlZCkge1xuXHRcdFx0XHRcdFx0bWFrZVRvYXN0KGBDb21wbGV0ZWQgcXVlc3Q6ICR7cXVlc3ROYW1lfWApO1xuXHRcdFx0XHRcdFx0QXBwbGljYXRpb25TdHJlYW1pbmdTdG9yZS5nZXRTdHJlYW1lckFjdGl2ZVN0cmVhbU1ldGFkYXRhID0gcmVhbEZ1bmM7XG5cdFx0XHRcdFx0XHREaXNwYXRjaGVyLnVuc3Vic2NyaWJlKFwiUVVFU1RTX1NFTkRfSEVBUlRCRUFUX1NVQ0NFU1NcIiwgZm4pO1xuXHRcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdFx0RGlzcGF0Y2hlci5zdWJzY3JpYmUoXCJRVUVTVFNfU0VORF9IRUFSVEJFQVRfU1VDQ0VTU1wiLCBmbik7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0gZWxzZSBpZiAodGFza05hbWUgPT09IFwiUExBWV9BQ1RJVklUWVwiKSB7XG5cdFx0Y29uc3QgY2hhbm5lbElkID0gQ2hhbm5lbFN0b3JlLmdldFNvcnRlZFByaXZhdGVDaGFubmVscygpWzBdPy5pZCA/P1xuXHRcdFx0T2JqZWN0LnZhbHVlcyhHdWlsZENoYW5uZWxTdG9yZS5nZXRBbGxHdWlsZHMoKSkuZmluZCh4ID0+IHggIT0gbnVsbCAmJiB4LlZPQ0FMLmxlbmd0aCA+IDApPy5WT0NBTFswXT8uY2hhbm5lbD8uaWQ7XG5cblx0XHRjb25zdCBzdHJlYW1LZXkgPSBgY2FsbDoke2NoYW5uZWxJZH06MWA7XG5cblx0XHR3aGlsZSAodHJ1ZSkge1xuXHRcdFx0Y29uc3QgcmVzID0gYXdhaXQgSFRUUC5wb3N0KHsgdXJsOiBgL3F1ZXN0cy8ke3F1ZXN0LmlkfS9oZWFydGJlYXRgLCBib2R5OiB7IHN0cmVhbV9rZXk6IHN0cmVhbUtleSwgdGVybWluYWw6IGZhbHNlIH0gfSk7XG5cdFx0XHRjb25zdCBwcm9ncmVzcyA9IHJlcy5ib2R5LnByb2dyZXNzLlBMQVlfQUNUSVZJVFkudmFsdWU7XG5cdFx0XHRtYWtlVG9hc3QoYFF1ZXN0IHByb2dyZXNzOiAke3Byb2dyZXNzfS8ke3NlY29uZHNOZWVkZWR9YCk7XG5cblx0XHRcdGlmIChwcm9ncmVzcyA+PSBzZWNvbmRzTmVlZGVkKSB7XG5cdFx0XHRcdGF3YWl0IEhUVFAucG9zdCh7IHVybDogYC9xdWVzdHMvJHtxdWVzdC5pZH0vaGVhcnRiZWF0YCwgYm9keTogeyBzdHJlYW1fa2V5OiBzdHJlYW1LZXksIHRlcm1pbmFsOiB0cnVlIH0gfSk7XG5cdFx0XHRcdG1ha2VUb2FzdChgQ29tcGxldGVkIHF1ZXN0OiAke3F1ZXN0TmFtZX1gKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMjAwMDApKTtcblx0XHR9XG5cdH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gYWNjZXB0QWxsUXVlc3RzKCkge1xuICAgIGNvbnN0IFVuYWNjZXB0ZWRRdWVzdHMgPSBbLi4uUXVlc3RzU3RvcmUucXVlc3RzLnZhbHVlcygpXS5maWx0ZXIoeCA9PlxuICAgICAgICB4LmlkICE9PSBcIjE0MTI0OTE1NzA4MjA4MTI5MzNcIiAmJlxuICAgICAgICB4LmNvbmZpZz8ucmV3YXJkc0NvbmZpZz8ucmV3YXJkc1swXS5vcmJRdWFudGl0eSAmJlxuICAgICAgICAheC51c2VyU3RhdHVzPy5lbnJvbGxlZEF0ICYmXG4gICAgICAgICF4LnVzZXJTdGF0dXM/LmNvbXBsZXRlZEF0ICYmXG4gICAgICAgIG5ldyBEYXRlKHguY29uZmlnLmV4cGlyZXNBdCkuZ2V0VGltZSgpID4gRGF0ZS5ub3coKVxuICAgICk7XG4gICAgXG4gICAgaWYgKFVuYWNjZXB0ZWRRdWVzdHMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIG1ha2VUb2FzdChgRm91bmQgJHtVbmFjY2VwdGVkUXVlc3RzLmxlbmd0aH0gdW5hY2NlcHRlZCBvcmJzIHF1ZXN0cy5gKTtcblxuXHRcdGZvciAobGV0IHF1ZXN0IG9mIFVuYWNjZXB0ZWRRdWVzdHMpIHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgSFRUUC5wb3N0KHtcblx0XHRcdFx0dXJsOiBgL3F1ZXN0cy8ke3F1ZXN0LmlkfS9lbnJvbGxgLFxuXHRcdFx0XHRib2R5OiB7XG5cdFx0XHRcdFx0XCJsb2NhdGlvblwiOiAxMSxcblx0XHRcdFx0XHRcImlzX3RhcmdldGVkXCI6IGZhbHNlLFxuXHRcdFx0XHRcdFwibWV0YWRhdGFfcmF3XCI6IG51bGxcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xuXHRcdFx0XHRtYWtlVG9hc3QoYCR7cXVlc3QuY29uZmlnLm1lc3NhZ2VzLnF1ZXN0TmFtZX0gYWNjZXB0ZWQgOjNgKVxuXHRcdFx0fSBlbHNlIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQyOSkge1xuXHRcdFx0XHRtYWtlVG9hc3QoJ1lvdSBoYXZlIGJlZW4gdGltZWQgb3V0IDooJylcblx0XHRcdH1cblx0XHR9XG4gICAgfVxuXG4gICAgbWFrZVRvYXN0KCdBbGwgb3JicyBxdWVzdHMgYWNjZXB0ZWQgQiknKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc3RhcnRBbGxRdWVzdHMoKSB7XG5cdGlmIChydW5uaW5nKSB7XG5cdFx0bWFrZVRvYXN0KFwiUXVlc3QgY29tcGxldGVyIGlzIGFscmVhZHkgcnVubmluZyEgPjpjXCIpO1xuXHRcdHJldHVybjtcdFxuXHR9XG5cdFxuICBcdGNvbnN0IGFsbFF1ZXN0cyA9IFsuLi5RdWVzdHNTdG9yZS5xdWVzdHMudmFsdWVzKCldLmZpbHRlcih4ID0+XG4gICAgXHR4LnVzZXJTdGF0dXM/LmVucm9sbGVkQXQgJiZcbiAgICBcdCF4LnVzZXJTdGF0dXM/LmNvbXBsZXRlZEF0ICYmXG4gICAgXHRuZXcgRGF0ZSh4LmNvbmZpZy5leHBpcmVzQXQpLmdldFRpbWUoKSA+IERhdGUubm93KClcbiAgXHQpO1xuXG5cblx0aWYgKGFsbFF1ZXN0cy5sZW5ndGggPT09IDApIHtcblx0XHRydW5uaW5nID0gZmFsc2U7XG5cdFx0bWFrZVRvYXN0KFwiQWxsIHF1ZXN0cyBhcmUgYWxyZWFkeSBjb21wbGV0ZWQhXCIpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdG1ha2VUb2FzdChgRm91bmQgJHthbGxRdWVzdHMubGVuZ3RofSB1bmNvbXBsZXRlZCBxdWVzdChzKS4gU3RhcnRpbmcuLi5gKTtcblx0XG5cdGZvciAobGV0IHF1ZXN0IG9mIGFsbFF1ZXN0cykge1xuXHRcdHRyeSB7XG5cdFx0XHRydW5uaW5nID0gdHJ1ZTtcblx0XHRcdGF3YWl0IGNvbXBsZXRlUXVlc3QocXVlc3QpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdG1ha2VUb2FzdChgRXJyb3IgY29tcGxldGluZyBxdWVzdDogJHtxdWVzdC5jb25maWcubWVzc2FnZXMucXVlc3ROYW1lfWAsIGUpO1xuXHRcdH1cblx0fVxuXG5cdHJ1bm5pbmcgPSBmYWxzZTtcblx0bWFrZVRvYXN0KFwiQWxsIGFjY2VwdGVkIHF1ZXN0cyBoYXZlIGJlZW4gY29tcGxldGVkIVwiKTtcbn1cblxuZnVuY3Rpb24gbWFrZVRvYXN0KC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgc2hvd1RvYXN0KGNyZWF0ZVRvYXN0KC4uLmFyZ3MpKVxufVxuXG5mdW5jdGlvbiBtYWtlSWNvbigpIHtcbiAgcmV0dXJuICgpID0+IChcbiAgICA8c3ZnIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cbiAgICAgIDxwYXRoXG4gICAgICAgIGZpbGw9e1wiI2NiYTZmN1wifVxuICAgICAgICBkPVwiTTcuNSAyMS43YTguOTUgOC45NSAwIDAgMSA5IDAgMSAxIDAgMCAwIDEtMS43M2MtLjYtLjM1LTEuMjQtLjY0LTEuOS0uODcuNTQtLjMgMS4wNS0uNjUgMS41Mi0xLjA3YTMuOTggMy45OCAwIDAgMCA1LjQ5LTEuOC43Ny43NyAwIDAgMC0uMjQtLjk1IDMuOTggMy45OCAwIDAgMC0yLjAyLS43NkE0IDQgMCAwIDAgMjMgMTAuNDdhLjc2Ljc2IDAgMCAwLS43MS0uNzEgNC4wNiA0LjA2IDAgMCAwLTEuNi4yMiAzLjk5IDMuOTkgMCAwIDAgLjU0LTUuMzUuNzcuNzcgMCAwIDAtLjk1LS4yNGMtLjc1LjM2LTEuMzcuOTUtMS43NyAxLjY3VjZhNCA0IDAgMCAwLTQuOS0zLjkuNzcuNzcgMCAwIDAtLjYuNzIgNCA0IDAgMCAwIDMuNyA0LjE3Yy44OSAxLjMgMS4zIDIuOTUgMS4zIDQuNTEgMCAzLjY2LTIuNzUgNi41LTYgNi41cy02LTIuODQtNi02LjVjMC0xLjU2LjQxLTMuMjEgMS4zLTQuNTFBNCA0IDAgMCAwIDExIDIuODJhLjc3Ljc3IDAgMCAwLS42LS43MiA0LjAxIDQuMDEgMCAwIDAtNC45IDMuOTZBNC4wMiA0LjAyIDAgMCAwIDMuNzMgNC40YS43Ny43NyAwIDAgMC0uOTUuMjQgMy45OCAzLjk4IDAgMCAwIC41NSA1LjM1IDQgNCAwIDAgMC0xLjYtLjIyLjc2Ljc2IDAgMCAwLS43Mi43MWwtLjAxLjI4YTQgNCAwIDAgMCAyLjY1IDMuNzdjLS43NS4wNi0xLjQ1LjMzLTIuMDIuNzYtLjMuMjItLjQuNjItLjI0Ljk1YTQgNCAwIDAgMCA1LjQ5IDEuOGMuNDcuNDIuOTguNzggMS41MyAxLjA3LS42Ny4yMy0xLjMuNTItMS45MS44N2ExIDEgMCAxIDAgMSAxLjczWlwiXG4gICAgICAvPlxuICAgIDwvc3ZnPlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQ29tcGxldGVRdWVzdEJ1dHRvbkludGVybmFsKCkge1xuICByZXR1cm4gKFxuICAgIDxCdXR0b25cbiAgICAgIHRvb2x0aXBUZXh0PXsgXCJDb21wbGV0ZSBxdWVzdHMhIDozXCIgfVxuICAgICAgaWNvbj17IG1ha2VJY29uKCkgfVxuICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICBwbGF0ZWQ9XCJwbGF0ZWRcIlxuICAgICAgb25DbGljaz17ICgpID0+IHN0YXJ0QWxsUXVlc3RzKCkgfVxuICAgICAgb25Db250ZXh0TWVudT17ICgpID0+IGFjY2VwdEFsbFF1ZXN0cygpIH1cbiAgICAvPlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQ29tcGxldGVRdWVzdEJ1dHRvbigpIHtcbiAgcmV0dXJuIDxFcnJvckJvdW5kYXJ5PlxuICAgIDxDb21wbGV0ZVF1ZXN0QnV0dG9uSW50ZXJuYWwgLz5cbiAgPC9FcnJvckJvdW5kYXJ5PlxufVxuXG5cbkNvbW1hbmRzLnJlZ2lzdGVyQ29tbWFuZCh7XG4gIGlkOiBcImFjY2VwdFF1ZXN0c1wiLFxuICBkZXNjcmlwdGlvbjogXCJBY2NlcHQgUXVlc3RzXCIsXG4gIGlucHV0VHlwZTogSW5wdXRUeXBlLkJVSUxUX0lOLFxuICB0eXBlOiBDb21tYW5kVHlwZS5DSEFULFxuICBvcHRpb25zOiBbXSxcbiAgZXhlY3V0ZTogKCkgPT4ge1xuICAgIGFjY2VwdEFsbFF1ZXN0cygpO1xuICB9XG59KTtcblxuQ29tbWFuZHMucmVnaXN0ZXJDb21tYW5kKHtcbiAgaWQ6IFwicXVlc3RcIixcbiAgZGVzY3JpcHRpb246IFwiUnVuIHF1ZXN0IGNvbXBsZXRlclwiLFxuICBpbnB1dFR5cGU6IElucHV0VHlwZS5CVUlMVF9JTixcbiAgdHlwZTogQ29tbWFuZFR5cGUuQ0hBVCxcbiAgb3B0aW9uczogW10sXG4gIGV4ZWN1dGU6ICgpID0+IHtcbiAgICBzdGFydEFsbFF1ZXN0cygpO1xuICB9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1DQUFzQjtBQUN0QixxQkFBa0I7QUFDbEIsb0NBQTBCO0FBQzFCLDZCQUE2RjtBQUM3RiwwQkFBdUI7QUFFdkIsc0JBQW1EO0FBRW5ELGlDQUFx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QTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsTUFBTTtBQUFBLFFBQ04sR0FBRTtBQUFBO0FBQUEsSUFDSixDQUNGO0FBQUEsRUFFSjtBQUVPLFdBQVMsOEJBQThCO0FBQzVDLFdBQ0UsNkJBQUFBLFFBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLGFBQWM7QUFBQSxRQUNkLE1BQU8sU0FBUztBQUFBLFFBQ2hCLE1BQUs7QUFBQSxRQUNMLFFBQU87QUFBQSxRQUNQLFNBQVUsTUFBTSxlQUFlO0FBQUEsUUFDL0IsZUFBZ0IsTUFBTSxnQkFBZ0I7QUFBQTtBQUFBLElBQ3hDO0FBQUEsRUFFSjtBQUVPLFdBQVMsc0JBQXNCO0FBQ3BDLFdBQU8sNkJBQUFBLFFBQUEsY0FBQyw0QkFBQUMsU0FBQSxNQUNOLDZCQUFBRCxRQUFBLGNBQUMsaUNBQTRCLENBQy9CO0FBQUEsRUFDRjtBQUdBLDJCQUFBRSxRQUFTLGdCQUFnQjtBQUFBLElBQ3ZCLElBQUk7QUFBQSxJQUNKLGFBQWE7QUFBQSxJQUNiO0FBQUEsSUFDQTtBQUFBLElBQ0EsU0FBUyxDQUFDO0FBQUEsSUFDVixTQUFTLE1BQU07QUFDYixzQkFBZ0I7QUFBQSxJQUNsQjtBQUFBLEVBQ0YsQ0FBQztBQUVELDJCQUFBQSxRQUFTLGdCQUFnQjtBQUFBLElBQ3ZCLElBQUk7QUFBQSxJQUNKLGFBQWE7QUFBQSxJQUNiO0FBQUEsSUFDQTtBQUFBLElBQ0EsU0FBUyxDQUFDO0FBQUEsSUFDVixTQUFTLE1BQU07QUFDYixxQkFBZTtBQUFBLElBQ2pCO0FBQUEsRUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJzcGFjZXBhY2siLCAicGlkIiwgIkRpc3BhdGNoZXIiLCAiUmVhY3QiLCAiRXJyb3JCb3VuZGFyeSIsICJDb21tYW5kcyJdCn0K
