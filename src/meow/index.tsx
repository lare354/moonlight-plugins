import { ExtensionWebpackModule, Patch } from "@moonlight-mod/types";

export const webpackModules: Record<string, ExtensionWebpackModule> = {
  entrypoint: {
    dependencies: [
      { ext: "spacepack", id: "spacepack" },
      { ext: "common", id: "stores" },
      { ext: "common", id: "ErrorBoundary" },
      { ext: "componentEditor", id: "chatButtonList" },
      { id: "discord/actions/MessageActionCreators"},
      ",expressionPickerPositionLayer:",
      "CHAT_INPUT_BUTTON_NOTIFICATION,width",
    ],
    entrypoint: true,
  },
};
