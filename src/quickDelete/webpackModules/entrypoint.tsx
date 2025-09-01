import spacepack from "@moonlight-mod/wp/spacepack_spacepack";
import { ChannelStore, UserStore, PermissionStore } from "@moonlight-mod/wp/common_stores";
import { Permissions } from "@moonlight-mod/wp/discord/Constants";
import React from "@moonlight-mod/wp/react";
import MessageActionCreators from '@moonlight-mod/wp/discord/actions/MessageActionCreators';

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);

// sets backspace value depending on if it is currently pressed or not
let backspace = false; 
let useDelete = moonlight.getConfigOption<boolean>("quickDelete", "useDelete") ?? false;

function keyDown(keyevent) {
    if (backspace) return;
    if (useDelete) {
        if (keyevent.key !== "Delete") return;
    }
    else if (keyevent.key !== "Backspace") return;

    backspace = true;
};

function keyUp(keyevent) {
    if (!backspace) return;
    if (useDelete) {
        if (keyevent.key !== "Delete") return;
    }
    else if (keyevent.key !== "Backspace") return;

    backspace = false;
};

export function _onClick({ message }: { message: any }, event: MouseEvent) {

    const self = UserStore.getCurrentUser();
    const channelId = message.channel_id;
    const messageId = message.id;
    const channel = ChannelStore.getChannel(channelId);

    if(!backspace){
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

    MessageActionCreators.deleteMessage(channelId, messageId);
}
