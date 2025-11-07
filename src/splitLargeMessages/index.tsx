import { ExtensionWebpackModule, Patch } from "@moonlight-mod/types";

// https://github.com/Equicord/Equicord/blob/8ffff9af78a5f9549d68be21227613956b7440bf/src/equicordplugins/splitLargeMessages/index.ts#L132

export const patches: Patch[] = [
  {
    find: 'type:"MESSAGE_LENGTH_UPSELL"', // bypass message length check
    replace: {
      match: /if\(\i.length>\i/,
      replacement: "if(false",
    }
  },

  {
    find: '(this,"hideAutocomplete"', // disable file conversion
    replace: {
      match: /if\(\i.length>\i\)/,
      replacement: "if(false)",
    },
  },
];

export const webpackModules: Record<string, ExtensionWebpackModule> = {
  entrypoint: {
    dependencies: [
      { ext: "spacepack", id: "spacepack" },
      { ext: "common", id: "stores" },
      { ext: "common", id: "ErrorBoundary" },
      { id: "discord/actions/MessageActionCreators"},
    ],
    entrypoint: true,
  },
};
