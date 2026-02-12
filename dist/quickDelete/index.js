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

  // src/quickDelete/index.tsx
  var quickDelete_exports = {};
  __export(quickDelete_exports, {
    patches: () => patches,
    webpackModules: () => webpackModules
  });
  var patches = [
    {
      find: '"className","compact","contentOnly","zalgo",',
      replace: {
        match: 'role:"article",onMouseEnter:',
        replacement: 'role:"article",onClick:(event)=>require("quickDelete_entrypoint")?._onClick?.(arguments[0].childrenMessageContent.props,event),onMouseEnter:'
      }
    }
  ];
  var webpackModules = {
    entrypoint: {
      dependencies: [
        { ext: "spacepack", id: "spacepack" },
        { ext: "common", id: "stores" },
        { id: "react" },
        { id: "discord/Constants" },
        { id: "discord/actions/MessageActionCreators" }
      ],
      entrypoint: true
    }
  };
  return __toCommonJS(quickDelete_exports);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL3F1aWNrRGVsZXRlL2luZGV4LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgRXh0ZW5zaW9uV2VicGFja01vZHVsZSwgUGF0Y2ggfSBmcm9tIFwiQG1vb25saWdodC1tb2QvdHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IHBhdGNoZXM6IFBhdGNoW10gPSBbXG4gIHtcbiAgICBmaW5kOiAnXCJjbGFzc05hbWVcIixcImNvbXBhY3RcIixcImNvbnRlbnRPbmx5XCIsXCJ6YWxnb1wiLCcsXG4gICAgcmVwbGFjZToge1xuICAgICAgbWF0Y2g6ICdyb2xlOlwiYXJ0aWNsZVwiLG9uTW91c2VFbnRlcjonLFxuICAgICAgcmVwbGFjZW1lbnQ6ICdyb2xlOlwiYXJ0aWNsZVwiLG9uQ2xpY2s6KGV2ZW50KT0+cmVxdWlyZShcInF1aWNrRGVsZXRlX2VudHJ5cG9pbnRcIik/Ll9vbkNsaWNrPy4oYXJndW1lbnRzWzBdLmNoaWxkcmVuTWVzc2FnZUNvbnRlbnQucHJvcHMsZXZlbnQpLG9uTW91c2VFbnRlcjonXG4gICAgfSxcbiAgfSxcbl07XG5cbmV4cG9ydCBjb25zdCB3ZWJwYWNrTW9kdWxlczogUmVjb3JkPHN0cmluZywgRXh0ZW5zaW9uV2VicGFja01vZHVsZT4gPSB7XG4gIGVudHJ5cG9pbnQ6IHtcbiAgICBkZXBlbmRlbmNpZXM6IFtcbiAgICAgIHsgZXh0OiBcInNwYWNlcGFja1wiLCBpZDogXCJzcGFjZXBhY2tcIiB9LFxuICAgICAgeyBleHQ6IFwiY29tbW9uXCIsIGlkOiBcInN0b3Jlc1wiIH0sXG4gICAgICB7IGlkOiBcInJlYWN0XCIgfSxcbiAgICAgIHsgaWQ6IFwiZGlzY29yZC9Db25zdGFudHNcIiB9LFxuICAgICAgeyBpZDogXCJkaXNjb3JkL2FjdGlvbnMvTWVzc2FnZUFjdGlvbkNyZWF0b3JzXCIgfSxcbiAgICBdLFxuICAgIGVudHJ5cG9pbnQ6IHRydWUsXG4gIH0sXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFTyxNQUFNLFVBQW1CO0FBQUEsSUFDOUI7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLGFBQWE7QUFBQSxNQUNmO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFTyxNQUFNLGlCQUF5RDtBQUFBLElBQ3BFLFlBQVk7QUFBQSxNQUNWLGNBQWM7QUFBQSxRQUNaLEVBQUUsS0FBSyxhQUFhLElBQUksWUFBWTtBQUFBLFFBQ3BDLEVBQUUsS0FBSyxVQUFVLElBQUksU0FBUztBQUFBLFFBQzlCLEVBQUUsSUFBSSxRQUFRO0FBQUEsUUFDZCxFQUFFLElBQUksb0JBQW9CO0FBQUEsUUFDMUIsRUFBRSxJQUFJLHdDQUF3QztBQUFBLE1BQ2hEO0FBQUEsTUFDQSxZQUFZO0FBQUEsSUFDZDtBQUFBLEVBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
