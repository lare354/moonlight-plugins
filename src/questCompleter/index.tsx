import { ExtensionWebpackModule, Patch } from "@moonlight-mod/types";

export const patches: Patch[] = [
  {
    find: "shouldShowSpeakingWhileMutedTooltip",
    replace: {
      match: /className:\i\.buttons,.{0,50}children:\[/,
      replacement: "$&require('questCompleter_action').CompleteQuestButton(),"
    },
  },
];

export const webpackModules: Record<string, ExtensionWebpackModule> = {
  action: {
    dependencies: [
      { ext: "spacepack", id: "spacepack" },
      { ext: "commands", id: "commands" },
      { ext: "common", id: "stores" },
      { ext: "common", id: "ErrorBoundary" },
      { id: "react" },
    ],
  },
};
