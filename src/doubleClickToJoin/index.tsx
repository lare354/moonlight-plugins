import { ExtensionWebpackModule, Patch } from "@moonlight-mod/types";

export const patches: Patch[] = [
  {
    find: ".handleVoiceStatusClick",
    replace: [
      {
          match: /onClick:\(\)=>\{this.handleClick\(\)/g,
          replacement: 'onClick:()=>{require("doubleClickToJoin_action")?.schedule(()=>{this.handleClick()},this)',  
        },
    ]
  },
  {
    find: ".handleClickChat",
    replace: [
      {
          match: /onClick:\(\)=>\{this.handleClick\(\)/g,
          replacement: 'onClick:()=>{require("doubleClickToJoin_action")?.schedule(()=>{this.handleClick()},this)',  
        },
    ]
  },
  {
    // channel mentions
    find: 'className:"channelMention",children',
    replace: {
        match: /onClick:(\i)(?=,.{0,30}className:"channelMention".+?(\i)\.inContent)/,
        replacement: (_, onClick, props) => "" 
          + `onClick:(vcDoubleClickEvt)=>shouldRunOnClick(vcDoubleClickEvt,${props})&&${onClick}()`,
     }
  }
];

export const webpackModules: Record<string, ExtensionWebpackModule> = {
  action: {
    dependencies: [
      { ext: "spacepack", id: "spacepack" },
      { ext: "common", id: "stores" }
    ]
  }
};
