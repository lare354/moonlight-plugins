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

  // src/quickDelete/webpackModules/entrypoint.tsx
  var entrypoint_exports = {};
  __export(entrypoint_exports, {
    _onClick: () => _onClick
  });
  var import_common_stores = __require("common_stores");
  var import_Constants = __require("discord/Constants");
  var import_MessageActionCreators = __toESM(__require("discord/actions/MessageActionCreators"));
  window.addEventListener("keydown", keyDown);
  window.addEventListener("keyup", keyUp);
  var backspace = false;
  var useDelete = moonlight.getConfigOption("quickDelete", "useDelete") ?? false;
  function keyDown(keyevent) {
    if (backspace)
      return;
    if (useDelete) {
      if (keyevent.key !== "Delete")
        return;
    } else if (keyevent.key !== "Backspace")
      return;
    backspace = true;
  }
  function keyUp(keyevent) {
    if (!backspace)
      return;
    if (useDelete) {
      if (keyevent.key !== "Delete")
        return;
    } else if (keyevent.key !== "Backspace")
      return;
    backspace = false;
  }
  function _onClick({ message }, event) {
    const self = import_common_stores.UserStore.getCurrentUser();
    const channelId = message.channel_id;
    const messageId = message.id;
    const channel = import_common_stores.ChannelStore.getChannel(channelId);
    if (!backspace) {
      return;
    }
    if (message.author.id !== self.id) {
      const hasPermission = import_common_stores.PermissionStore.can(import_Constants.Permissions.MANAGE_MESSAGES, channel);
      if (!hasPermission) {
        return;
      }
    }
    import_MessageActionCreators.default.deleteMessage(channelId, messageId);
  }
  return __toCommonJS(entrypoint_exports);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL3F1aWNrRGVsZXRlL3dlYnBhY2tNb2R1bGVzL2VudHJ5cG9pbnQudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgc3BhY2VwYWNrIGZyb20gXCJAbW9vbmxpZ2h0LW1vZC93cC9zcGFjZXBhY2tfc3BhY2VwYWNrXCI7XG5pbXBvcnQgeyBDaGFubmVsU3RvcmUsIFVzZXJTdG9yZSwgUGVybWlzc2lvblN0b3JlIH0gZnJvbSBcIkBtb29ubGlnaHQtbW9kL3dwL2NvbW1vbl9zdG9yZXNcIjtcbmltcG9ydCB7IFBlcm1pc3Npb25zIH0gZnJvbSBcIkBtb29ubGlnaHQtbW9kL3dwL2Rpc2NvcmQvQ29uc3RhbnRzXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcIkBtb29ubGlnaHQtbW9kL3dwL3JlYWN0XCI7XG5pbXBvcnQgTWVzc2FnZUFjdGlvbkNyZWF0b3JzIGZyb20gJ0Btb29ubGlnaHQtbW9kL3dwL2Rpc2NvcmQvYWN0aW9ucy9NZXNzYWdlQWN0aW9uQ3JlYXRvcnMnO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwga2V5RG93bik7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGtleVVwKTtcblxuLy8gc2V0cyBiYWNrc3BhY2UgdmFsdWUgZGVwZW5kaW5nIG9uIGlmIGl0IGlzIGN1cnJlbnRseSBwcmVzc2VkIG9yIG5vdFxubGV0IGJhY2tzcGFjZSA9IGZhbHNlOyBcbmxldCB1c2VEZWxldGUgPSBtb29ubGlnaHQuZ2V0Q29uZmlnT3B0aW9uPGJvb2xlYW4+KFwicXVpY2tEZWxldGVcIiwgXCJ1c2VEZWxldGVcIikgPz8gZmFsc2U7XG5cbmZ1bmN0aW9uIGtleURvd24oa2V5ZXZlbnQpIHtcbiAgICBpZiAoYmFja3NwYWNlKSByZXR1cm47XG4gICAgaWYgKHVzZURlbGV0ZSkge1xuICAgICAgICBpZiAoa2V5ZXZlbnQua2V5ICE9PSBcIkRlbGV0ZVwiKSByZXR1cm47XG4gICAgfVxuICAgIGVsc2UgaWYgKGtleWV2ZW50LmtleSAhPT0gXCJCYWNrc3BhY2VcIikgcmV0dXJuO1xuXG4gICAgYmFja3NwYWNlID0gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIGtleVVwKGtleWV2ZW50KSB7XG4gICAgaWYgKCFiYWNrc3BhY2UpIHJldHVybjtcbiAgICBpZiAodXNlRGVsZXRlKSB7XG4gICAgICAgIGlmIChrZXlldmVudC5rZXkgIT09IFwiRGVsZXRlXCIpIHJldHVybjtcbiAgICB9XG4gICAgZWxzZSBpZiAoa2V5ZXZlbnQua2V5ICE9PSBcIkJhY2tzcGFjZVwiKSByZXR1cm47XG5cbiAgICBiYWNrc3BhY2UgPSBmYWxzZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfb25DbGljayh7IG1lc3NhZ2UgfTogeyBtZXNzYWdlOiBhbnkgfSwgZXZlbnQ6IE1vdXNlRXZlbnQpIHtcblxuICAgIGNvbnN0IHNlbGYgPSBVc2VyU3RvcmUuZ2V0Q3VycmVudFVzZXIoKTtcbiAgICBjb25zdCBjaGFubmVsSWQgPSBtZXNzYWdlLmNoYW5uZWxfaWQ7XG4gICAgY29uc3QgbWVzc2FnZUlkID0gbWVzc2FnZS5pZDtcbiAgICBjb25zdCBjaGFubmVsID0gQ2hhbm5lbFN0b3JlLmdldENoYW5uZWwoY2hhbm5lbElkKTtcblxuICAgIGlmKCFiYWNrc3BhY2Upe1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYobWVzc2FnZS5hdXRob3IuaWQgIT09IHNlbGYuaWQpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAvLyBDaGVja3MgaWYgdXNlciBoYXMgcGVybWlzc2lvbiB0byBkZWxldGUgbWVzc2FnZXMgaW4gY3VycmVudCBjaGFubmVsXG4gICAgICAgIGNvbnN0IGhhc1Blcm1pc3Npb24gPSBQZXJtaXNzaW9uU3RvcmUuY2FuKFBlcm1pc3Npb25zLk1BTkFHRV9NRVNTQUdFUywgY2hhbm5lbCk7XG4gICAgICAgIGlmICghaGFzUGVybWlzc2lvbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgTWVzc2FnZUFjdGlvbkNyZWF0b3JzLmRlbGV0ZU1lc3NhZ2UoY2hhbm5lbElkLCBtZXNzYWdlSWQpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQSw2QkFBeUQ7QUFDekQseUJBQTRCO0FBRTVCLHFDQUFrQztBQUVsQyxTQUFPLGlCQUFpQixXQUFXLE9BQU87QUFDMUMsU0FBTyxpQkFBaUIsU0FBUyxLQUFLO0FBR3RDLE1BQUksWUFBWTtBQUNoQixNQUFJLFlBQVksVUFBVSxnQkFBeUIsZUFBZSxXQUFXLEtBQUs7QUFFbEYsV0FBUyxRQUFRLFVBQVU7QUFDdkIsUUFBSTtBQUFXO0FBQ2YsUUFBSSxXQUFXO0FBQ1gsVUFBSSxTQUFTLFFBQVE7QUFBVTtBQUFBLElBQ25DLFdBQ1MsU0FBUyxRQUFRO0FBQWE7QUFFdkMsZ0JBQVk7QUFBQSxFQUNoQjtBQUVBLFdBQVMsTUFBTSxVQUFVO0FBQ3JCLFFBQUksQ0FBQztBQUFXO0FBQ2hCLFFBQUksV0FBVztBQUNYLFVBQUksU0FBUyxRQUFRO0FBQVU7QUFBQSxJQUNuQyxXQUNTLFNBQVMsUUFBUTtBQUFhO0FBRXZDLGdCQUFZO0FBQUEsRUFDaEI7QUFFTyxXQUFTLFNBQVMsRUFBRSxRQUFRLEdBQXFCLE9BQW1CO0FBRXZFLFVBQU0sT0FBTywrQkFBVSxlQUFlO0FBQ3RDLFVBQU0sWUFBWSxRQUFRO0FBQzFCLFVBQU0sWUFBWSxRQUFRO0FBQzFCLFVBQU0sVUFBVSxrQ0FBYSxXQUFXLFNBQVM7QUFFakQsUUFBRyxDQUFDLFdBQVU7QUFDVjtBQUFBLElBQ0o7QUFFQSxRQUFHLFFBQVEsT0FBTyxPQUFPLEtBQUssSUFBSTtBQUc5QixZQUFNLGdCQUFnQixxQ0FBZ0IsSUFBSSw2QkFBWSxpQkFBaUIsT0FBTztBQUM5RSxVQUFJLENBQUMsZUFBZTtBQUNoQjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBRUEsaUNBQUFBLFFBQXNCLGNBQWMsV0FBVyxTQUFTO0FBQUEsRUFDNUQ7IiwKICAibmFtZXMiOiBbIk1lc3NhZ2VBY3Rpb25DcmVhdG9ycyJdCn0K
