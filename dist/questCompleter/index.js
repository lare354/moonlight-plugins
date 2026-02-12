"use strict";
var module;
(module ||= {}).exports = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
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
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/questCompleter/index.tsx
  var questCompleter_exports = {};
  __export(questCompleter_exports, {
    webpackModules: () => webpackModules
  });
  var webpackModules = {
    action: {
      dependencies: [
        { ext: "spacepack", id: "spacepack" },
        { ext: "common", id: "stores" },
        { ext: "common", id: "ErrorBoundary" },
        { id: "discord/components/common/index" },
        { id: "discord/components/common/PanelButton" },
        { id: "discord/Dispatcher" },
        { id: "discord/utils/HTTPUtils" },
        { id: "react" },
        { ext: "commands", id: "commands" }
      ],
      entrypoint: true
    }
  };
  return __toCommonJS(questCompleter_exports);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL3F1ZXN0Q29tcGxldGVyL2luZGV4LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgRXh0ZW5zaW9uV2VicGFja01vZHVsZSwgUGF0Y2ggfSBmcm9tIFwiQG1vb25saWdodC1tb2QvdHlwZXNcIjtcblxuXG4vL2V4cG9ydCBjb25zdCBwYXRjaGVzOiBQYXRjaFtdID0gW1xuLy8gIHtcbi8vICAgIGZpbmQ6IFwiI3tpbnRsOjpBQ0NPVU5UX1NQRUFLSU5HX1dISUxFX01VVEVEfVwiLFxuLy8gICAgcmVwbGFjZToge1xuLy8gICAgICBtYXRjaDogL2NoaWxkcmVuOlxcWyg/PS57MCwyNX0/YWNjb3VudENvbnRhaW5lclJlZikvLFxuLy8gICAgICByZXBsYWNlbWVudDogXCJjaGlsZHJlbjpbcmVxdWlyZSgncXVlc3RDb21wbGV0ZXJfYWN0aW9uJykuQ29tcGxldGVRdWVzdEJ1dHRvbigpLFwiXG4vLyAgICB9LFxuLy8gIH0sXG4vL107XG5cbmV4cG9ydCBjb25zdCB3ZWJwYWNrTW9kdWxlczogUmVjb3JkPHN0cmluZywgRXh0ZW5zaW9uV2VicGFja01vZHVsZT4gPSB7XG4gIGFjdGlvbjoge1xuICAgIGRlcGVuZGVuY2llczogW1xuICAgICAgeyBleHQ6IFwic3BhY2VwYWNrXCIsIGlkOiBcInNwYWNlcGFja1wiIH0sXG4gICAgICB7IGV4dDogXCJjb21tb25cIiwgaWQ6IFwic3RvcmVzXCIgfSxcbiAgICAgIHsgZXh0OiBcImNvbW1vblwiLCBpZDogXCJFcnJvckJvdW5kYXJ5XCIgfSxcbiAgICAgIHsgaWQ6IFwiZGlzY29yZC9jb21wb25lbnRzL2NvbW1vbi9pbmRleFwiIH0sXG4gICAgICB7IGlkOiBcImRpc2NvcmQvY29tcG9uZW50cy9jb21tb24vUGFuZWxCdXR0b25cIiB9LFxuICAgICAgeyBpZDogXCJkaXNjb3JkL0Rpc3BhdGNoZXJcIiB9LFxuICAgICAgeyBpZDogXCJkaXNjb3JkL3V0aWxzL0hUVFBVdGlsc1wiIH0sXG4gICAgICB7IGlkOiBcInJlYWN0XCIgfSxcbiAgICAgIHsgZXh0OiBcImNvbW1hbmRzXCIsIGlkOiBcImNvbW1hbmRzXCIgfSxcbiAgICBdLFxuICAgIGVudHJ5cG9pbnQ6IHRydWUsXG4gIH0sXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBYU8sTUFBTSxpQkFBeUQ7QUFBQSxJQUNwRSxRQUFRO0FBQUEsTUFDTixjQUFjO0FBQUEsUUFDWixFQUFFLEtBQUssYUFBYSxJQUFJLFlBQVk7QUFBQSxRQUNwQyxFQUFFLEtBQUssVUFBVSxJQUFJLFNBQVM7QUFBQSxRQUM5QixFQUFFLEtBQUssVUFBVSxJQUFJLGdCQUFnQjtBQUFBLFFBQ3JDLEVBQUUsSUFBSSxrQ0FBa0M7QUFBQSxRQUN4QyxFQUFFLElBQUksd0NBQXdDO0FBQUEsUUFDOUMsRUFBRSxJQUFJLHFCQUFxQjtBQUFBLFFBQzNCLEVBQUUsSUFBSSwwQkFBMEI7QUFBQSxRQUNoQyxFQUFFLElBQUksUUFBUTtBQUFBLFFBQ2QsRUFBRSxLQUFLLFlBQVksSUFBSSxXQUFXO0FBQUEsTUFDcEM7QUFBQSxNQUNBLFlBQVk7QUFBQSxJQUNkO0FBQUEsRUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
