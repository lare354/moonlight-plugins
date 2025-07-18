import spacepack from "@moonlight-mod/wp/spacepack_spacepack";
import { SelectedChannelStore, ChannelStore } from "@moonlight-mod/wp/common_stores";

export function shouldRunOnClick(e: MouseEvent, { channelId }) {
    const channel = ChannelStore.getChannel(channelId);
    if (!channel || ![2, 13].includes(channel.type)) return true;
    return e.detail >= 2;
};
