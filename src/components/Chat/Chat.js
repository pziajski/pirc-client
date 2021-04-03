import React, { useEffect, useState } from 'react';
import { ChatMessage } from "../ChatMessage/ChatMessage";
import { authGetRequest, authPostRequest } from "../../functions/AuthorizedAPIRequests";
import "./Chat.scss";

export const Chat = (props) => {
    const { userInfo } = props;
    const channelId = props.match.params.channelId;

    const [viewChannel, setViewChannel] = useState(props.match.params.channelId ? props.match.params.channelId : 1);
    useEffect(() => {
        setViewChannel(props.match.params.channelId);
    }, [props.match.params.channelId])

    const [channelDetails, setChannelDetails] = useState([]);
    useEffect(() => {
        let isMounted = true;
        authGetRequest(`channels/${viewChannel}`)
            .then(response => {
                if (isMounted) {
                    setChannelDetails(response.data);
                }
            })
            .catch(error => {
                console.error(error);
            })

        return () => {
            isMounted = false;
        }
    }, [viewChannel]);

    
    // get channel messages
    const getChannelMessages = (isMounted) => {
        authGetRequest(`chats/${channelId}`)
        .then(response => {
            if (isMounted) {
                setChannelMessages(response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
            }
        })
        .catch(error => {
            console.error(error);
        })
    }
    
    const [channelMessages, setChannelMessages] = useState([]);
    useEffect(() => {
        let isMounted = true;
        getChannelMessages(isMounted);
        const getMessagesOnInterval = setInterval(() => {
            getChannelMessages(isMounted);
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

        e.target.reset();

        authPostRequest(`chats/${channelId}`, data)
            .then(response => {
                const newMessage = {
                    ...response.data,
                    user: {
                        ...userInfo
                    }
                };
                setChannelMessages([newMessage, ...channelMessages]);
            })
            .catch(error => {
                console.error("...ERROR... failed to send message sendMessage ->", error);
            })
    };

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
                        <li key={message.id} className={message.user_id === userInfo.id ? "chat__message-list-item--personal" : "chat__message-list-item"}>
                            <ChatMessage
                                userInfo={userInfo}
                                message={message} />
                        </li>
                    )
                }
            </ul>
            <form className="chat__send-form" onSubmit={sendMessage}>
                <label className="chat__send-label">
                    <textarea className="chat__send-input" name="message"></textarea>
                </label>
                <button className="chat__send-button">Send</button>
            </form>
        </div>
    )
}
