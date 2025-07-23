import spacepack from "@moonlight-mod/wp/spacepack_spacepack";
import { SelectedChannelStore, ChannelStore } from "@moonlight-mod/wp/common_stores";
import React from "@moonlight-mod/wp/react";

export function shouldRunOnClick(e: MouseEvent, { channelId }) {
    const channel = ChannelStore.getChannel(channelId);
    if (!channel || ![2, 13].includes(channel.type)) return true;
    return e.detail >= 2;
};

export const _handleClick = ({
	channel,
	onClick,
  }: {
	channel: Channel;
	onClick: (event: React.MouseEvent) => void;
}): void => {
  if (SelectedChannelStore.getVoiceChannelId() !== channel.id) return;
  onClick();
};
