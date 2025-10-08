import { ExtensionWebpackModule, Patch } from "@moonlight-mod/types";

export const patches: Patch[] = [
  {
    find: '"className","compact","contentOnly","zalgo",',
    replace: {
      match: 'role:"article",onMouseEnter:',
      replacement: 'role:"article",onClick:(event)=>require("quickDelete_entrypoint")?._onClick?.(arguments[0].childrenMessageContent.props,event),onMouseEnter:'
    },
  },
];

export const webpackModules: Record<string, ExtensionWebpackModule> = {
  entrypoint: {
    dependencies: [
      { ext: "spacepack", id: "spacepack" },
      { ext: "common", id: "stores" },
      { id: "react" },
      { id: "discord/Constants" },
      { id: "discord/actions/MessageActionCreators" },
    ],
    entrypoint: true,
  },
};
