import React, { useEffect, useState } from 'react';
import { ChatMessage } from "../ChatMessage/ChatMessage";
import { authGetRequest, authPostRequest } from "../../functions/AuthorizedAPIRequests";
import "./Chat.scss";

export const Chat = (props) => {
    const { userInfo } = props;
    const channelId = props.match.params.channelId;

    const [userInput, setUserInput] = useState("");

    const viewChannel = props.match.params.channelId;

    const [channelDetails, setChannelDetails] = useState([]);
    useEffect(() => {
        let isMounted = true;
        authGetRequest(`channels/${viewChannel}`)
            .then(details => {
                if (isMounted) {
                    setChannelDetails(details);
                }
            })
            .catch(error => {
                console.error(error);
            })

        return () => {
            isMounted = false;
        }
    }, [viewChannel]);

    const [channelMessages, setChannelMessages] = useState([]);
    useEffect(() => {
        let isMounted = true;
        authGetRequest(`chats/${channelId}`)
            .then(messages => {
                if (isMounted) {
                    setChannelMessages(messages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
                }
            })
            .catch(error => {
                console.error(error);
            })
        const getMessagesOnInterval = setInterval(() => {
            authGetRequest(`chats/${channelId}`)
                .then(messages => {
                    if (isMounted) {
                        setChannelMessages(messages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
                    }
                })
                .catch(error => {
                    console.error(error);
                })
        }, 2000);

        return () => {
            isMounted = false;
            clearInterval(getMessagesOnInterval);
        }
    }, [channelId]);

    const sendMessage = (e) => {
        e.preventDefault();
        const data = {
            user_id: userInfo.id,
            message: e.target.message.value
        };

        setUserInput("");

        authPostRequest(`chats/${channelId}`, data)
            .then(comment => {
                setChannelMessages([comment, ...channelMessages]);
            })
            .catch(error => {
                console.error("...ERROR... failed to send message sendMessage ->", error);
            })
    };

    const updateInputState = (e) => {
        const { target: text } = e;
        setUserInput(text.value);
    }

    if (!channelMessages) {
        return <>Loading...</>
    }

    return (
        <div className="chat">
            <div className="chat__channel-header">
                <h1>{channelDetails.name}</h1>
            </div>
            <ul className="chat__message-list">
                {
                    channelMessages.map(message =>
                        <li key={message.created_at} className={message.username === userInfo.username ? "chat__message-list-item--personal" : "chat__message-list-item"}>
                            <ChatMessage
                                userInfo={userInfo}
                                message={message} />
                        </li>
                    )
                }
            </ul>
            <form className="chat__send-form" onSubmit={sendMessage}>
                <textarea className="chat__send-input" name="message" maxLength="250" placeholder="Enter your message here..." value={userInput} onChange={e => updateInputState(e)}></textarea>
                <button className="chat__send-button" disabled={userInput === "" ? true : false}>Send</button>
            </form>
        </div>
    )
}
