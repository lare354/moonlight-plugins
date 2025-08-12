import { sendMessage } from "discord/actions/MessageActionCreators";
import { ChannelStore } from "@moonlight-mod/wp/common_stores";
import { ChatButtonList } from "@moonlight-mod/wp/componentEditor_chatButtonList";

async function handleButtonClick() {
    // @ts-expect-error typing issue
    sendMessage(ChannelStore.getCurrentChannel().id, { content: "meow" });
}

export default {
    
}
