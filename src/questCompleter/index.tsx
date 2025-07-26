import { ExtensionWebpackModule } from "@moonlight-mod/types";

export const patches: Patch[] = [];

export const webpackModules: Record<string, ExtensionWebpackModule> = {
  action: {
    dependencies: [
      { ext: "spacepack", id: "spacepack" },
      { ext: "commands", id: "commands" },
      { ext: "common", id: "stores" },
      { id: "react" },
    ],
    entrypoint: true,
  },
};
