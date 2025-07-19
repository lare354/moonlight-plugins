import { ExtensionWebpackModule, Patch } from "@moonlight-mod/types";

export const patches: Patch[] = [
  {
    // voice and stage channels (thank you Nanakusa :3)
    find: ".iconContainerWithGuildIcon", 
    replace: [ 
      { 
        match: ".link,onClick:", 
        replacement: () => `.link,onClick:()=>null,onDoubleClick:` 
      }, 
    ], 
  },
  {
    // channel mentions
    find: 'className:"channelMention",children',
    replace: [
      {
        match: /onClick:(\i)(?=,.{0,30}className:"channelMention".+?(\i)\.inContent)/,
        replacement: (_, onClick, props) => "" 
          + `onClick:(vcDoubleClickEvt)=>require("doubleClickToJoin_action")?.shouldRunOnClick(vcDoubleClickEvt,${props})&&${onClick}()`,
      },
    ],
  },
  {
    // call icons in DM (thank you Nanakusa :3)
    find: ".renderVoiceCallButton",
    replace: [
      {
        match: "onClick:this.handleVoiceClick",
        replacement: "onClick:()=>null,onDoubleClick:this.handleVoiceClick",
      },
      {
        match: /(this\.handleBrowserNotSupported.{50,75})onClick:/,
        replacement: (_orig: string, prefix: string) => `${prefix}onClick:()=>null,onDoubleClick:`,
      },
    ],
  },
  {
    // call icons in DM (thank you Nanakusa :3)
    find: ".Masks.HEADER_BAR_BADGE_TOP", 
    replace: [ 
      { 
        match: /onClick:(\w+\?void 0:)\w+,/, 
        replacement: (prefix, condition: string) => 
        `${prefix}onDoubleClick:${condition}arguments[0]?.onDoubleClick,`, 
      }, 
    ], 
  },
  {
    // activity tab
    find: '.voiceSection,ref',
    replace: [
      {
        match: /onClick:\s?\(\)\s?=>/g,
        replacement: `onClick:()=>null,onDoubleClick:()=>`,
      },
    ],
  },
];

export const webpackModules: Record<string, ExtensionWebpackModule> = {
  action: {
    dependencies: [
      { ext: "spacepack", id: "spacepack" },
      { ext: "common", id: "stores" },
      ".voiceSection,ref"
    ],
  },
};
