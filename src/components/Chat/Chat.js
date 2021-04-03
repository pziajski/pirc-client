import React from 'react';
import { ChatMessage } from "../ChatMessage/ChatMessage";
import "./Chat.scss";

export const Chat = (props) => {
    const { userInfo, channelMessages, sendMessage, channelDetails } = props;
    const channelId = props.match.params.channelId;

    const submitMessage = (e) => {
        e.preventDefault();
        sendMessage({
            channelId: channelId,
            user_id: userInfo.id,
            message: e.target.message.value
        });
        e.target.reset();
    };

    return (
        <div className="chat">
            <div className="chat__channel-header">
                <h1>{channelDetails.name}</h1>
            </div>
            <ul className="chat__message-list">
                {
                    channelMessages.map(message =>
                        <li key={message.id} className={message.user_id === userInfo.id ? "chat__message-list-item--personal" : "chat__message-list-item"}>
                            <ChatMessage
                                userInfo={userInfo}
                                message={message}/>
                        </li>
                    )
                }
            </ul>
            <form className="chat__send-form" onSubmit={submitMessage}>
                <label className="chat__send-label">
                    <textarea className="chat__send-input" name="message"></textarea>
                </label>
                <button className="chat__send-button">Send</button>
            </form>
        </div>
    )
}
