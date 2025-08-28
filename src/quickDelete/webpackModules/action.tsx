import spacepack from "@moonlight-mod/wp/spacepack_spacepack";
import { ChannelStore, UserStore, PermissionStore, PermissionsBits } from "@moonlight-mod/wp/common_stores";
import { Permissions } from "@moonlight-mod/wp/discord/Constants";
import React from "@moonlight-mod/wp/react";

const { MessageActionCreators } = spacepack.require("discord/actions/MessageActionCreators")[0].default;

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// sets value depending on if quickDelete button is currently pressed or not

let isDeletePressed = false;
const keyDown = (e: KeyboardEvent) => e.key === "Backspace" && (isDeletePressed = true);
const keyUp =  (e: KeyboardEvent) => e.key === "Backspace" && (isDeletePressed = false);


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

    MessageActionCreators.deleteMesage(channelId, messageId);
}
