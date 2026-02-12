import { ExtensionWebpackModule, Patch } from "@moonlight-mod/types";

export const patches: Patch[] = [
  {
    find: "#{intl::ACCOUNT_SPEAKING_WHILE_MUTED}",
    replace: {
      match: /children:\[(?=.{0,25}?accountContainerRef)/,
      replacement: "children:[require('questCompleter_action').CompleteQuestButton(arguments[0]),"
    },
  },
];

export const webpackModules: Record<string, ExtensionWebpackModule> = {
  action: {
    dependencies: [
      { ext: "spacepack", id: "spacepack" },
      { ext: "common", id: "stores" },
      { ext: "common", id: "ErrorBoundary" },
      { id: "discord/components/common/index" },
      { id: "discord/components/common/PanelButton" },
      { id: "discord/Dispatcher" },
      { id: "discord/utils/HTTPUtils" },
      { id: "react" },
      { ext: "commands", id: "commands" },
    ],
    entrypoint: true,
  },
};
