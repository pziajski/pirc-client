import iUserChannelsJoined from "./iUserChannelsJoined";

export default interface iJoinChannel {
    goBack: () => void,
    joinChannel: (channelId: number) => void,
    userChannelsJoined: iUserChannelsJoined
}