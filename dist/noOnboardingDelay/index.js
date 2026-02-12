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

  // src/noOnboardingDelay/index.ts
  var noOnboardingDelay_exports = {};
  __export(noOnboardingDelay_exports, {
    patches: () => patches
  });
  var patches = [
    {
      find: ",{className:g.__invalid_subtitle}):",
      replace: {
        match: "3e3",
        replacement: "0"
      }
    }
  ];
  return __toCommonJS(noOnboardingDelay_exports);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL25vT25ib2FyZGluZ0RlbGF5L2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBQYXRjaCB9IGZyb20gXCJAbW9vbmxpZ2h0LW1vZC90eXBlc1wiO1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vVmVuZGljYXRlZC9WZW5jb3JkL2Jsb2IvbWFpbi9zcmMvcGx1Z2lucy9ub09uYm9hcmRpbmdEZWxheS9pbmRleC50c1xuXG5leHBvcnQgY29uc3QgcGF0Y2hlczogUGF0Y2hbXSA9IFtcbiAge1xuICAgIGZpbmQ6IFwiLHtjbGFzc05hbWU6Zy5fX2ludmFsaWRfc3VidGl0bGV9KTpcIixcbiAgICByZXBsYWNlOiB7XG4gICAgICBtYXRjaDogXCIzZTNcIixcbiAgICAgIHJlcGxhY2VtZW50OiBcIjBcIlxuICAgIH1cbiAgfVxuXTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlPLE1BQU0sVUFBbUI7QUFBQSxJQUM5QjtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLFFBQ1AsT0FBTztBQUFBLFFBQ1AsYUFBYTtBQUFBLE1BQ2Y7QUFBQSxJQUNGO0FBQUEsRUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
