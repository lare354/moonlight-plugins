import spacepack from "@moonlight-mod/wp/spacepack_spacepack";
import { ChannelStore, UserStore, PermissionStore } from "@moonlight-mod/wp/common_stores";
import Dispatcher from "@moonlight-mod/wp/discord/Dispatcher";
const { HTTP } = spacepack.require("discord/utils/HTTPUtils");

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);


// sets backspace value depending on if it is currently pressed or not
let backspace = false; 
function keyDown(keyevent) {
    if (backspace) return;
    if (keyevent.key !== "Backspace") return;

    backspace = true;
    console.log("backspace is set to True");
};

function keyUp(keyevent) {
    if (!backspace) return;
    if (keyevent.key !== "Backspace") return;

    backspace = false;
    console.log("backspace is set to False");
};

export default function onClick({ message }: { message: any }, event: MouseEvent) {

    const self = UserStore.getCurrentUser();
    const channelId = message.channel_id;
    const messageId = message.id

    console.log("message click!");

    if(!backspace){
        return;
    }

    if(message.author.id !== self.id) {
            
        // 8192 === MANAGE_MESSAGES (https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags)
        // Checks if user has permission to delete messages in current channel
        const hasPermission = PermissionStore.can(8192n, message.channel_id);
        if (!hasPermission) {
            console.log("Cannot delete message");
            return;
        }
    }

    Dispatcher.dispatch({
        type: "MESSAGE_DELETE",
        messageId,
        channelId,
    });

    HTTP.del(`/channels/${channelId}/messages/${messageId}`)
        .then(() => console.log("Message deleted successfully"))
        .catch((err) => console.error("Failed to delete message:", err));

}
