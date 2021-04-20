export default interface iChannelJoined {
    id: number,
    user_id: number,
    channel_id: number,
    channel: {
        id: number,
        name: string
    }
};