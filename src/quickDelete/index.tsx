import { ExtensionWebpackModule, Patch } from "@moonlight-mod/types";

export const patches: Patch[] = [
  {
    find: '["className","compact","contentOnly","zalgo",',
    replace: {
      match: 'role:"article",onMouseEnter:',
      replacement: 'role:"article",onClick:(event)=>require("quickDelete_action")?.default?.(arguments[0].childrenMessageContent.props,event),onMouseEnter:'
    }
  }
];

export const webpackModules: Record<string, ExtensionWebpackModule> = {
  action: {
    dependencies: [
      { ext: "spacepack", id: "spacepack" },
      { ext: "common", id: "stores" },
      { id: "discord/Dispatcher" },
      { id: "discord/utils/HTTPUtils" },
    ],
    entrypoint: true,
  },
};
