import iMessage from "./iMessage";
import iUserInfo from "./iUserInfo";

export default interface iChatMessage {
    userInfo: iUserInfo,
    message: iMessage
};