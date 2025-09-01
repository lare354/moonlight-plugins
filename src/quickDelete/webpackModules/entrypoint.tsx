import spacepack from "@moonlight-mod/wp/spacepack_spacepack";
import { ChannelStore, UserStore, PermissionStore } from "@moonlight-mod/wp/common_stores";
import { Permissions } from "@moonlight-mod/wp/discord/Constants";
import React from "@moonlight-mod/wp/react";

const { deleteMessage } = spacepack.require("discord/actions/MessageActionCreators").deleteMessage;

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
    const channel = ChannelStore.getChannel(channelId);

    console.log("message click!");

    if(!isDeletePressed){
        return;
    }

    if(message.author.id !== self.id) {
            
        // Checks if user has permission to delete messages in current channel
        const hasPermission = PermissionStore.can(Permissions.MANAGE_MESSAGES, channel);
        if (!hasPermission) {
            console.log("Cannot delete message");
            return;
        }
    }

    deleteMesage(channelId, messageId);
}
