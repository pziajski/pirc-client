export default interface iUserSettings {
    username: string,
    redirectToLogin: () => void,
    createChannel: () => void,
    joinChannel: () => void
}