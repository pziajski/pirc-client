import React from 'react';
import { convertDateToRelative } from "../../functions/ConvertDateToRelative";
import iChatMessage from '../../interface/iChatMessage';
import "./ChatMessage.scss";

export const ChatMessage: React.FC<iChatMessage> = ({ message, userInfo }) => {
    return (
        <div className="chat-message">
            <div className="chat-message__header">
                <h3 className={message.username === userInfo.username ? "chat-message__username--hide" : "chat-message__username"}>{`// ${message.username}`}</h3>
                <p className="chat-message__timestamp">{convertDateToRelative(new Date(message.created_at))}</p>
            </div>
            <p className="chat-message__message">{message.message}</p>
        </div>
    )
}
