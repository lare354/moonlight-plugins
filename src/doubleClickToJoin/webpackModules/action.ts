import spacepack from "@moonlight-mod/wp/spacepack_spacepack";
import { SelectedChannelStore, ChannelStore } from "@moonlight-mod/wp/common_stores";


const timers = {} as Record<string, {
    timeout?: NodeJS.Timeout;
    i: number;
}>;

 export function shouldRunOnClick(e: MouseEvent, { channelId }) {
    const channel = ChannelStore.getChannel(channelId);
    if (!channel || ![2, 13].includes(channel.type)) return true;
    return e.detail >= 2;
};

export function schedule(cb: () => void, e: any) {
    const id = e.props.channel.id as string;
    if (SelectedChannelStore.getVoiceChannelId() === id) {
        cb();
        return;
    }
    // use a different counter for each channel
    const data = (timers[id] ??= { timeout: void 0, i: 0 });
    // clear any existing timer
    clearTimeout(data.timeout);

    // if we already have 2 or more clicks, run the callback immediately
    if (++data.i >= 2) {
        cb();
        delete timers[id];
    } else {
        // else reset the counter in 500ms
        data.timeout = setTimeout(() => {
            delete timers[id];
        }, 500);
    }
};
