import { ExtensionWebExports, Patch } from "@moonlight-mod/types";

export const webpackModules: Record<string, ExtensionWebpackModule> = {
  entrypoint: {
    dependencies: [
      { ext: "spacepack", id: "spacepack" },
      { ext: "common", id: "stores" },
      { ext: "common", id: "ErrorBoundary" },
      { id: "discord/Dispatcher" },
      { ext: "componentEditor", id: "chatButtonList" },
      { id: "discord/components/common/index" },
      "CHAT_INPUT_BUTTON_NOTIFICATION,width",
      "discord/actions/MessageActionCreators",
    ],
    entrypoint: true,
  },
};
