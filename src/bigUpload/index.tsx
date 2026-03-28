import { ExtensionWebpackModule, Patch } from "@moonlight-mod/types";



export const webpackModules: Record<string, ExtensionWebpackModule> = {
  entrypoint: {
    dependencies: [
      { ext: "spacepack", id: "spacepack" },
      { ext: "common", id: "stores" },
      { ext: "commands", id: "commands" },
      { id: "react" },
      { id: "discord/components/common/index" },
      { id: "discord/actions/MessageActionCreators" },
      ".fromTimestampWithSequence",
      "ChannelMessage", "SlashCommand", "ThreadSettings", "FirstThreadMessage",
      "CHAT_INPUT_BUTTON_NOTIFICATION,width",
      'dispatch({type:"UPLOAD_ATTACHMENT_CLEAR_ALL_FILES",channelId:',
    ],
    entrypoint: true,
  },
};
