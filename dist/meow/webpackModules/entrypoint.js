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

  // src/meow/webpackModules/entrypoint.tsx
  var import_common_stores = __require("common_stores");
  var import_componentEditor_chatButtonList = __toESM(__require("componentEditor_chatButtonList"));
  var import_common_ErrorBoundary = __toESM(__require("common_ErrorBoundary"));
  var import_react = __toESM(__require("react"));
  var import_common = __require("discord/components/common/index");
  var import_spacepack_spacepack = __toESM(__require("spacepack_spacepack"));
  var { sendMessage } = import_spacepack_spacepack.default.require("discord/actions/MessageActionCreators").default;
  var ChatBarButton = import_spacepack_spacepack.default.findByCode("CHAT_INPUT_BUTTON_NOTIFICATION,width")[0].exports.A;
  var ButtonStyles = import_spacepack_spacepack.default.findByCode(",expressionPicker")[1].exports.A;
  var getNonce = import_spacepack_spacepack.default.findByCode(".fromTimestampWithSequence")[0].exports.r;
  var meowMsgs = ["meow", "mew", "nyan", "nya", "myaow", "mreow", "mrow"];
  var woofMsgs = ["woof", "arf", "bark", "wruff", "ruff", "awruff"];
  var meowBtn = moonlight.getConfigOption("meow", "meow") ?? true;
  var woofBtn = moonlight.getConfigOption("meow", "woof") ?? false;
  function MeowButton() {
    function onClick() {
      let channel = import_common_stores.ChannelStore.getChannel(import_common_stores.SelectedChannelStore.getChannelId());
      sendMessage(channel.id, { content: meowMsgs[Math.floor(Math.random() * meowMsgs.length)] }, void 0, { nonce: getNonce() });
    }
    return /* @__PURE__ */ import_react.default.createElement(import_common_ErrorBoundary.default, { noop: true }, /* @__PURE__ */ import_react.default.createElement(import_common.Tooltip, { text: "Meow" }, (tooltipProps) => /* @__PURE__ */ import_react.default.createElement(
      ChatBarButton,
      {
        ...tooltipProps,
        className: ButtonStyles.button,
        onClick
      },
      /* @__PURE__ */ import_react.default.createElement("svg", { width: "20", height: "20", viewBox: "0 0 576 512" }, /* @__PURE__ */ import_react.default.createElement(
        "path",
        {
          fill: "currentColor",
          d: "M320 192h17.1c22.1 38.3 63.5 64 110.9 64c11 0 21.8-1.4 32-4v228c0 17.7-14.3 32-32 32s-32-14.3-32-32V339.2L280 448h56c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-53 0-96-43-96-96V192.5c0-16.1-12-29.8-28-31.8l-7.9-1c-17.5-2.2-30-18.2-27.8-35.7S50.5 94 68 96.2l7.9 1c48 6 84.1 46.8 84.1 95.3v85.3c34.4-51.7 93.2-85.8 160-85.8m160 26.5c-10 3.5-20.8 5.5-32 5.5c-28.4 0-54-12.4-71.6-32c-3.7-4.1-7-8.5-9.9-13.2C357.3 164 352 146.6 352 128V10.7C352 4.8 356.7.1 362.6 0h.2c3.3 0 6.4 1.6 8.4 4.2v.1l12.8 17l27.2 36.3L416 64h64l4.8-6.4L512 21.3l12.8-17v-.1c2-2.6 5.1-4.2 8.4-4.2h.2c5.9.1 10.6 4.8 10.6 10.7V128c0 17.3-4.6 33.6-12.6 47.6c-11.3 19.8-29.6 35.2-51.4 42.9M432 128a16 16 0 1 0-32 0a16 16 0 1 0 32 0m48 16a16 16 0 1 0 0-32a16 16 0 1 0 0 32"
        }
      ))
    )));
  }
  function WoofButton() {
    function onClick() {
      let channel = import_common_stores.ChannelStore.getChannel(import_common_stores.SelectedChannelStore.getChannelId());
      sendMessage(channel.id, { content: woofMsgs[Math.floor(Math.random() * woofMsgs.length)] }, void 0, { nonce: getNonce() });
    }
    return /* @__PURE__ */ import_react.default.createElement(import_common_ErrorBoundary.default, { noop: true }, /* @__PURE__ */ import_react.default.createElement(import_common.Tooltip, { text: "Woof" }, (tooltipProps) => /* @__PURE__ */ import_react.default.createElement(
      ChatBarButton,
      {
        ...tooltipProps,
        className: ButtonStyles.button,
        onClick
      },
      /* @__PURE__ */ import_react.default.createElement("svg", { width: "20", height: "20", viewBox: "0 0 576 512" }, /* @__PURE__ */ import_react.default.createElement(
        "path",
        {
          fill: "currentColor",
          d: "m309.6 158.5l23.1-138.7C334.6 8.4 344.5 0 356.1 0c7.5 0 14.5 3.5 19 9.5L392 32h52.1c12.7 0 24.9 5.1 33.9 14.1L496 64h56c13.3 0 24 10.7 24 24v24c0 44.2-35.8 80-80 80h-69.3l-5.1 30.5zM416 256.1V480c0 17.7-14.3 32-32 32h-32c-17.7 0-32-14.3-32-32V364.8c-24 12.3-51.2 19.2-80 19.2s-56-6.9-80-19.2V480c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V249.8c-28.8-10.9-51.4-35.3-59.2-66.5L1 167.8c-4.3-17.1 6.1-34.5 23.3-38.8s34.5 6.1 38.8 23.3l3.9 15.5C70.5 182 83.3 192 98 192h205.8zM464 80a16 16 0 1 0-32 0a16 16 0 1 0 32 0"
        }
      ))
    )));
  }
  if (meowBtn) {
    import_componentEditor_chatButtonList.default.addButton("meowButton", MeowButton, "gif", true);
  }
  if (woofBtn) {
    import_componentEditor_chatButtonList.default.addButton("woofButton", WoofButton, "gif", true);
  }
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL21lb3cvd2VicGFja01vZHVsZXMvZW50cnlwb2ludC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIlxuaW1wb3J0IHsgU2VsZWN0ZWRDaGFubmVsU3RvcmUsIENoYW5uZWxTdG9yZSB9IGZyb20gXCJAbW9vbmxpZ2h0LW1vZC93cC9jb21tb25fc3RvcmVzXCI7XG5pbXBvcnQgQ2hhdEJ1dHRvbkxpc3QgZnJvbSBcIkBtb29ubGlnaHQtbW9kL3dwL2NvbXBvbmVudEVkaXRvcl9jaGF0QnV0dG9uTGlzdFwiO1xuaW1wb3J0IEVycm9yQm91bmRhcnkgZnJvbSAnQG1vb25saWdodC1tb2Qvd3AvY29tbW9uX0Vycm9yQm91bmRhcnknO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJAbW9vbmxpZ2h0LW1vZC93cC9yZWFjdFwiO1xuaW1wb3J0IHsgVG9vbHRpcCB9IGZyb20gXCJAbW9vbmxpZ2h0LW1vZC93cC9kaXNjb3JkL2NvbXBvbmVudHMvY29tbW9uL2luZGV4XCI7XG5pbXBvcnQgc3BhY2VwYWNrIGZyb20gXCJAbW9vbmxpZ2h0LW1vZC93cC9zcGFjZXBhY2tfc3BhY2VwYWNrXCI7XG5cbmNvbnN0IHsgc2VuZE1lc3NhZ2UgfSA9IHNwYWNlcGFjay5yZXF1aXJlKFwiZGlzY29yZC9hY3Rpb25zL01lc3NhZ2VBY3Rpb25DcmVhdG9yc1wiKS5kZWZhdWx0O1xuY29uc3QgQ2hhdEJhckJ1dHRvbiA9IHNwYWNlcGFjay5maW5kQnlDb2RlKFwiQ0hBVF9JTlBVVF9CVVRUT05fTk9USUZJQ0FUSU9OLHdpZHRoXCIpWzBdLmV4cG9ydHMuQTtcbmNvbnN0IEJ1dHRvblN0eWxlcyA9IHNwYWNlcGFjay5maW5kQnlDb2RlKFwiLGV4cHJlc3Npb25QaWNrZXJcIilbMV0uZXhwb3J0cy5BO1xuY29uc3QgZ2V0Tm9uY2UgPSBzcGFjZXBhY2suZmluZEJ5Q29kZShcIi5mcm9tVGltZXN0YW1wV2l0aFNlcXVlbmNlXCIpWzBdLmV4cG9ydHMucjtcblxuY29uc3QgbWVvd01zZ3MgPSBbXCJtZW93XCIsIFwibWV3XCIsIFwibnlhblwiLCBcIm55YVwiLCBcIm15YW93XCIsIFwibXJlb3dcIiwgXCJtcm93XCJdO1xuY29uc3Qgd29vZk1zZ3MgPSBbXCJ3b29mXCIsIFwiYXJmXCIsIFwiYmFya1wiLCBcIndydWZmXCIsIFwicnVmZlwiLCBcImF3cnVmZlwiXTtcblxubGV0IG1lb3dCdG4gPSBtb29ubGlnaHQuZ2V0Q29uZmlnT3B0aW9uPGJvb2xlYW4+KFwibWVvd1wiLCBcIm1lb3dcIikgPz8gdHJ1ZTtcbmxldCB3b29mQnRuID0gbW9vbmxpZ2h0LmdldENvbmZpZ09wdGlvbjxib29sZWFuPihcIm1lb3dcIiwgXCJ3b29mXCIpID8/IGZhbHNlO1xuXG5mdW5jdGlvbiBNZW93QnV0dG9uKCkge1xuICBmdW5jdGlvbiBvbkNsaWNrKCkge1xuICAgIGxldCBjaGFubmVsID0gQ2hhbm5lbFN0b3JlLmdldENoYW5uZWwoU2VsZWN0ZWRDaGFubmVsU3RvcmUuZ2V0Q2hhbm5lbElkKCkpO1xuICAgIHNlbmRNZXNzYWdlKGNoYW5uZWwuaWQsIHsgY29udGVudDogbWVvd01zZ3NbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWVvd01zZ3MubGVuZ3RoKV0gfSwgdm9pZCAwLCB7IG5vbmNlOiBnZXROb25jZSgpIH0pO1xuICB9XG4gIFxuICByZXR1cm4gKFxuICAgIDxFcnJvckJvdW5kYXJ5IG5vb3A9e3RydWV9PlxuICAgICAgICA8VG9vbHRpcCB0ZXh0PXsgXCJNZW93XCIgfT5cbiAgICAgICAgICAgIHsodG9vbHRpcFByb3BzOiBhbnkpID0+IChcbiAgICAgICAgICAgICAgICA8Q2hhdEJhckJ1dHRvbiB7Li4udG9vbHRpcFByb3BzfSBcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17QnV0dG9uU3R5bGVzLmJ1dHRvbn1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyBvbkNsaWNrIH0+IFxuICAgICAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDU3NiA1MTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgICAgICAgICBmaWxsPXtcImN1cnJlbnRDb2xvclwifVxuICAgICAgICAgICAgICAgICAgICAgIGQ9XCJNMzIwIDE5MmgxNy4xYzIyLjEgMzguMyA2My41IDY0IDExMC45IDY0YzExIDAgMjEuOC0xLjQgMzItNHYyMjhjMCAxNy43LTE0LjMgMzItMzIgMzJzLTMyLTE0LjMtMzItMzJWMzM5LjJMMjgwIDQ0OGg1NmMxNy43IDAgMzIgMTQuMyAzMiAzMnMtMTQuMyAzMi0zMiAzMkgxOTJjLTUzIDAtOTYtNDMtOTYtOTZWMTkyLjVjMC0xNi4xLTEyLTI5LjgtMjgtMzEuOGwtNy45LTFjLTE3LjUtMi4yLTMwLTE4LjItMjcuOC0zNS43UzUwLjUgOTQgNjggOTYuMmw3LjkgMWM0OCA2IDg0LjEgNDYuOCA4NC4xIDk1LjN2ODUuM2MzNC40LTUxLjcgOTMuMi04NS44IDE2MC04NS44bTE2MCAyNi41Yy0xMCAzLjUtMjAuOCA1LjUtMzIgNS41Yy0yOC40IDAtNTQtMTIuNC03MS42LTMyYy0zLjctNC4xLTctOC41LTkuOS0xMy4yQzM1Ny4zIDE2NCAzNTIgMTQ2LjYgMzUyIDEyOFYxMC43QzM1MiA0LjggMzU2LjcuMSAzNjIuNiAwaC4yYzMuMyAwIDYuNCAxLjYgOC40IDQuMnYuMWwxMi44IDE3bDI3LjIgMzYuM0w0MTYgNjRoNjRsNC44LTYuNEw1MTIgMjEuM2wxMi44LTE3di0uMWMyLTIuNiA1LjEtNC4yIDguNC00LjJoLjJjNS45LjEgMTAuNiA0LjggMTAuNiAxMC43VjEyOGMwIDE3LjMtNC42IDMzLjYtMTIuNiA0Ny42Yy0xMS4zIDE5LjgtMjkuNiAzNS4yLTUxLjQgNDIuOU00MzIgMTI4YTE2IDE2IDAgMSAwLTMyIDBhMTYgMTYgMCAxIDAgMzIgMG00OCAxNmExNiAxNiAwIDEgMCAwLTMyYTE2IDE2IDAgMSAwIDAgMzJcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgPC9DaGF0QmFyQnV0dG9uPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9Ub29sdGlwPlxuICAgIDwvRXJyb3JCb3VuZGFyeT5cbiAgKTtcbn1cblxuZnVuY3Rpb24gV29vZkJ1dHRvbigpIHtcblxuICBmdW5jdGlvbiBvbkNsaWNrKCkge1xuICAgIGxldCBjaGFubmVsID0gQ2hhbm5lbFN0b3JlLmdldENoYW5uZWwoU2VsZWN0ZWRDaGFubmVsU3RvcmUuZ2V0Q2hhbm5lbElkKCkpO1xuICAgIHNlbmRNZXNzYWdlKGNoYW5uZWwuaWQsIHsgY29udGVudDogd29vZk1zZ3NbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogd29vZk1zZ3MubGVuZ3RoKV0gfSwgdm9pZCAwLCB7IG5vbmNlOiBnZXROb25jZSgpIH0pO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8RXJyb3JCb3VuZGFyeSBub29wPXt0cnVlfT5cbiAgICAgICAgPFRvb2x0aXAgdGV4dD17IFwiV29vZlwiIH0+XG4gICAgICAgICAgICB7KHRvb2x0aXBQcm9wczogYW55KSA9PiAoXG4gICAgICAgICAgICAgICAgPENoYXRCYXJCdXR0b24gey4uLnRvb2x0aXBQcm9wc30gXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e0J1dHRvblN0eWxlcy5idXR0b259XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsgb25DbGljayB9PiBcbiAgICAgICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCA1NzYgNTEyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgICAgICAgICAgZmlsbD17XCJjdXJyZW50Q29sb3JcIn1cbiAgICAgICAgICAgICAgICAgICAgICBkPVwibTMwOS42IDE1OC41bDIzLjEtMTM4LjdDMzM0LjYgOC40IDM0NC41IDAgMzU2LjEgMGM3LjUgMCAxNC41IDMuNSAxOSA5LjVMMzkyIDMyaDUyLjFjMTIuNyAwIDI0LjkgNS4xIDMzLjkgMTQuMUw0OTYgNjRoNTZjMTMuMyAwIDI0IDEwLjcgMjQgMjR2MjRjMCA0NC4yLTM1LjggODAtODAgODBoLTY5LjNsLTUuMSAzMC41ek00MTYgMjU2LjFWNDgwYzAgMTcuNy0xNC4zIDMyLTMyIDMyaC0zMmMtMTcuNyAwLTMyLTE0LjMtMzItMzJWMzY0LjhjLTI0IDEyLjMtNTEuMiAxOS4yLTgwIDE5LjJzLTU2LTYuOS04MC0xOS4yVjQ4MGMwIDE3LjctMTQuMyAzMi0zMiAzMkg5NmMtMTcuNyAwLTMyLTE0LjMtMzItMzJWMjQ5LjhjLTI4LjgtMTAuOS01MS40LTM1LjMtNTkuMi02Ni41TDEgMTY3LjhjLTQuMy0xNy4xIDYuMS0zNC41IDIzLjMtMzguOHMzNC41IDYuMSAzOC44IDIzLjNsMy45IDE1LjVDNzAuNSAxODIgODMuMyAxOTIgOTggMTkyaDIwNS44ek00NjQgODBhMTYgMTYgMCAxIDAtMzIgMGExNiAxNiAwIDEgMCAzMiAwXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgIDwvQ2hhdEJhckJ1dHRvbj5cbiAgICAgICAgICAgICl9XG4gICAgICAgIDwvVG9vbHRpcD5cbiAgICA8L0Vycm9yQm91bmRhcnk+XG4gICk7XG59XG5cbmlmIChtZW93QnRuKXtcbiAgQ2hhdEJ1dHRvbkxpc3QuYWRkQnV0dG9uKFwibWVvd0J1dHRvblwiLCBNZW93QnV0dG9uLCBcImdpZlwiLCB0cnVlKTtcbiAgXG59XG5cbmlmICh3b29mQnRuKXtcbiAgQ2hhdEJ1dHRvbkxpc3QuYWRkQnV0dG9uKFwid29vZkJ1dHRvblwiLCBXb29mQnV0dG9uLCBcImdpZlwiLCB0cnVlKTsgIFxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDZCQUFtRDtBQUNuRCw4Q0FBMkI7QUFDM0Isb0NBQTBCO0FBQzFCLHFCQUFrQjtBQUNsQixzQkFBd0I7QUFDeEIsbUNBQXNCO0FBRXRCLE1BQU0sRUFBRSxZQUFZLElBQUksMkJBQUFBLFFBQVUsUUFBUSx1Q0FBdUMsRUFBRTtBQUNuRixNQUFNLGdCQUFnQiwyQkFBQUEsUUFBVSxXQUFXLHNDQUFzQyxFQUFFLENBQUMsRUFBRSxRQUFRO0FBQzlGLE1BQU0sZUFBZSwyQkFBQUEsUUFBVSxXQUFXLG1CQUFtQixFQUFFLENBQUMsRUFBRSxRQUFRO0FBQzFFLE1BQU0sV0FBVywyQkFBQUEsUUFBVSxXQUFXLDRCQUE0QixFQUFFLENBQUMsRUFBRSxRQUFRO0FBRS9FLE1BQU0sV0FBVyxDQUFDLFFBQVEsT0FBTyxRQUFRLE9BQU8sU0FBUyxTQUFTLE1BQU07QUFDeEUsTUFBTSxXQUFXLENBQUMsUUFBUSxPQUFPLFFBQVEsU0FBUyxRQUFRLFFBQVE7QUFFbEUsTUFBSSxVQUFVLFVBQVUsZ0JBQXlCLFFBQVEsTUFBTSxLQUFLO0FBQ3BFLE1BQUksVUFBVSxVQUFVLGdCQUF5QixRQUFRLE1BQU0sS0FBSztBQUVwRSxXQUFTLGFBQWE7QUFDcEIsYUFBUyxVQUFVO0FBQ2pCLFVBQUksVUFBVSxrQ0FBYSxXQUFXLDBDQUFxQixhQUFhLENBQUM7QUFDekUsa0JBQVksUUFBUSxJQUFJLEVBQUUsU0FBUyxTQUFTLEtBQUssTUFBTSxLQUFLLE9BQU8sSUFBSSxTQUFTLE1BQU0sQ0FBQyxFQUFFLEdBQUcsUUFBUSxFQUFFLE9BQU8sU0FBUyxFQUFFLENBQUM7QUFBQSxJQUMzSDtBQUVBLFdBQ0UsNkJBQUFDLFFBQUEsY0FBQyw0QkFBQUMsU0FBQSxFQUFjLE1BQU0sUUFDakIsNkJBQUFELFFBQUEsY0FBQyx5QkFBUSxNQUFPLFVBQ1gsQ0FBQyxpQkFDRSw2QkFBQUEsUUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQWUsR0FBRztBQUFBLFFBQ2pCLFdBQVcsYUFBYTtBQUFBLFFBQ3hCO0FBQUE7QUFBQSxNQUNBLDZCQUFBQSxRQUFBLGNBQUMsU0FBSSxPQUFNLE1BQUssUUFBTyxNQUFLLFNBQVEsaUJBQ2xDLDZCQUFBQSxRQUFBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxNQUFNO0FBQUEsVUFDTixHQUFFO0FBQUE7QUFBQSxNQUNKLENBQ0Y7QUFBQSxJQUNGLENBRVIsQ0FDSjtBQUFBLEVBRUo7QUFFQSxXQUFTLGFBQWE7QUFFcEIsYUFBUyxVQUFVO0FBQ2pCLFVBQUksVUFBVSxrQ0FBYSxXQUFXLDBDQUFxQixhQUFhLENBQUM7QUFDekUsa0JBQVksUUFBUSxJQUFJLEVBQUUsU0FBUyxTQUFTLEtBQUssTUFBTSxLQUFLLE9BQU8sSUFBSSxTQUFTLE1BQU0sQ0FBQyxFQUFFLEdBQUcsUUFBUSxFQUFFLE9BQU8sU0FBUyxFQUFFLENBQUM7QUFBQSxJQUMzSDtBQUVBLFdBQ0UsNkJBQUFBLFFBQUEsY0FBQyw0QkFBQUMsU0FBQSxFQUFjLE1BQU0sUUFDakIsNkJBQUFELFFBQUEsY0FBQyx5QkFBUSxNQUFPLFVBQ1gsQ0FBQyxpQkFDRSw2QkFBQUEsUUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQWUsR0FBRztBQUFBLFFBQ2pCLFdBQVcsYUFBYTtBQUFBLFFBQ3hCO0FBQUE7QUFBQSxNQUNBLDZCQUFBQSxRQUFBLGNBQUMsU0FBSSxPQUFNLE1BQUssUUFBTyxNQUFLLFNBQVEsaUJBQ2xDLDZCQUFBQSxRQUFBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxNQUFNO0FBQUEsVUFDTixHQUFFO0FBQUE7QUFBQSxNQUNKLENBQ0Y7QUFBQSxJQUNGLENBRVIsQ0FDSjtBQUFBLEVBRUo7QUFFQSxNQUFJLFNBQVE7QUFDViwwQ0FBQUUsUUFBZSxVQUFVLGNBQWMsWUFBWSxPQUFPLElBQUk7QUFBQSxFQUVoRTtBQUVBLE1BQUksU0FBUTtBQUNWLDBDQUFBQSxRQUFlLFVBQVUsY0FBYyxZQUFZLE9BQU8sSUFBSTtBQUFBLEVBQ2hFOyIsCiAgIm5hbWVzIjogWyJzcGFjZXBhY2siLCAiUmVhY3QiLCAiRXJyb3JCb3VuZGFyeSIsICJDaGF0QnV0dG9uTGlzdCJdCn0K
