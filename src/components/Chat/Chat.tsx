import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from "react-router-dom";
import { ChatMessage } from "../ChatMessage/ChatMessage";
import { authGetRequest, authPostRequest } from "../../functions/AuthorizedAPIRequests";
import "./Chat.scss";
import iUserInfo from '../../interface/iUserInfo';
import iChannel from '../../interface/iChannel';
import iMessage from '../../interface/iMessage';
import iChannelMessages from '../../interface/iChannelMessages';

interface iMatchParams {
    channelId: string
}

interface iMatchProps extends RouteComponentProps<iMatchParams> {
    userInfo: iUserInfo
};

export const Chat: React.FC<iMatchProps> = ({ userInfo, match }) => {
    const channelId = match.params.channelId;
    const [userInput, setUserInput] = useState("");
    const viewChannel = channelId;

    const [channelDetails, setChannelDetails] = useState<iChannel | {}>({});
    useEffect(() => {
        let isMounted = true;
        authGetRequest(`channels/${viewChannel}`)
            .then((details: iChannel) => {
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

    const [channelMessages, setChannelMessages] = useState<iChannelMessages | []>([]);
    useEffect(() => {
        let isMounted = true;
        authGetRequest(`chats/${channelId}`)
            .then(messages => {
                if (isMounted) {
                    setChannelMessages(messages.sort((a: iMessage, b: iMessage) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
                }
            })
            .catch(error => {
                console.error(error);
            })
        const getMessagesOnInterval = setInterval(() => {
            authGetRequest(`chats/${channelId}`)
                .then(messages => {
                    if (isMounted) {
                        setChannelMessages(messages.sort((a: iMessage, b: iMessage) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
                    }
                })
                .catch(error => {
                    console.error(error);
                })
        }, 1000);

        return () => {
            isMounted = false;
            clearInterval(getMessagesOnInterval);
        }
    }, [channelId]);

    // TODO set exact prop type
    const sendMessage = (e: any) => {
        e.preventDefault();
        const data = {
            user_id: userInfo.id,
            message: e.target.message.value
        };

        setUserInput("");

        authPostRequest(`chats/${channelId}`, data)
            .then((comment: iMessage) => {
                setChannelMessages([comment, ...channelMessages]);
            })
            .catch(error => {
                console.error("...ERROR... failed to send message sendMessage ->", error);
            })
    };

    // TODO set exact prop type
    const updateInputState = (e: any) => {
        const { target: text } = e;
        setUserInput(text.value);
    }

    if (!channelMessages) {
        return <>Loading...</>
    }

    return (
        <div className="chat">
            <div className="chat__channel-header">
                <h1>{(channelDetails as iChannel).name}</h1>
            </div>
            <ul className="chat__message-list">
                {
                    channelMessages.map((message: iMessage) =>
                        <li key={message.created_at} className={message.username === userInfo.username ? "chat__message-list-item--personal" : "chat__message-list-item"}>
                            <ChatMessage
                                userInfo={userInfo}
                                message={message} />
                        </li>
                    )
                }
            </ul>
            <form className="chat__send-form" onSubmit={e => sendMessage(e)}>
                <textarea className="chat__send-input" name="message" maxLength={1000} placeholder="Enter your message here..." value={userInput} onChange={e => updateInputState(e)}></textarea>
                <button className="chat__send-button" disabled={userInput === "" ? true : false}>Send</button>
            </form>
        </div>
    )
}
