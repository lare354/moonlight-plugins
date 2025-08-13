import { ExtensionWebExports, Patch } from "@moonlight-mod/types";

export const webpackModules: Record<string, ExtensionWebpackModule> = {
  entrypoint: {
    dependencies: [
      { ext: "spacepack", id: "spacepack" },
      { ext: "common", id: "stores" },
      { ext: "common", id: "ErrorBoundary" },
      { ext: "componentEditor", id: "chatButtonList" },
      { id: "discord/actions/MessageActionCreators"},
    ],
    entrypoint: true,
  },
};
