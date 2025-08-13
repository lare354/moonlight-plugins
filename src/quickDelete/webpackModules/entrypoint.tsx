import spacepack from "@moonlight-mod/wp/spacepack_spacepack";
import { ChannelStore, GuildChannelStore } from "@moonlight-mod/wp/common_stores";
import Dispatcher from "@moonlight-mod/wp/discord/Dispatcher";

// sets backspace value depending on if it is currently pressed or not
let backspace = false; 
async function keyDown(keyevent) {
    if (keyevent.key !== "Backspace") return;

    backspace = true;
    console.log("backspace is set to True");
};

async function keyUp(keyevent) {
    if (keyevent.key !== "Backspace") return;

    backspace = false;
    console.log("backspace is set to False");
};

