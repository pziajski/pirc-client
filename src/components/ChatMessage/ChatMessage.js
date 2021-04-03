import React from 'react';
import { convertDateToRelative } from "../../functions/ConvertDateToRelative";
import "./ChatMessage.scss";

export const ChatMessage = (props) => {
    const { message, userInfo } = props;
    return (
        <div className="chat-message">
            <div className="chat-message__header">
                <h3 className={message.user_id === userInfo.id ? "chat-message__username--hide" : "chat-message__username"}>{message.user.username}</h3>
                <p className="chat-message__timestamp">{convertDateToRelative(new Date(message.created_at))}</p>
            </div>
            <p className="chat-message__message">{message.message}</p>
        </div>
    )
}
