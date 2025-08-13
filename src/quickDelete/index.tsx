import { ExtensionWebpackModule, Patch } from "@moonlight-mod/types";

export const webpackModules: Record<string, ExtensionWebpackModule> = {
  entrypoint: {
    dependencies: [
      { ext: "spacepack", id: "spacepack" },
      { ext: "common", id: "stores" },
      { id: "discord/actions/MessageActionCreators"},
      { id: "react" },
    ],
    entrypoint: true
  },
};
