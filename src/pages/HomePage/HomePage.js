import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Chat } from "../../components/Chat/Chat";
import { Channels } from "../../components/Channels/Channels";
import { UserSettings } from "../../components/UserSettings/UserSettings";
import { authGetRequest, authPostRequest } from "../../functions/AuthorizedAPIRequests";
import "./HomePage.scss";

export const HomePage = (props) => {
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        let isMounted = true;
        authGetRequest(`users/userInfo`)
            .then(response => {
                console.log("GET USERS INFO ->>", response)
                if (isMounted) {
                    setUserInfo(response.data);
                }
            })
            .catch(error => {
                props.history.push("/login");
            })

        return () => {
            isMounted = false;
        }
    }, []);

    const [userChannelsJoined, setUserChannelsJoined] = useState([]);
    useEffect(() => {
        let isMounted = true;
        if (!!userInfo) {
            authGetRequest(`users/${userInfo.id}/channels`)
                .then(response => {
                    if (isMounted) {
                        setUserChannelsJoined(response.data);
                    }
                })
        }

        return () => {
            isMounted = false;
        }

    }, [userInfo]);

    const [viewChannel, setViewChannel] = useState(1);
    useEffect(() => {
        props.history.push(`/channels/${viewChannel}`);
    }, [viewChannel]);

    const [channelDetails, setChannelDetails] = useState([]);
    useEffect(() => {
        let isMounted = true;
        authGetRequest(`channels/${viewChannel}`)
            .then(response => {
                if (isMounted) {
                    setChannelDetails(response.data);
                }
            })

        return () => {
            isMounted = false;
        }
    }, [viewChannel]);

    // get channel messages
    const getChannelMessages = (isMounted) => {
        authGetRequest(`chats/${viewChannel}`)
            .then(response => {
                if (isMounted) {
                    setChannelMessages(response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
                }
            })
    }

    const [channelMessages, setChannelMessages] = useState([]);
    useEffect(() => {
        let isMounted = true;
        getChannelMessages(isMounted);

        return () => {
            isMounted = false;
        }
    }, [viewChannel]);

    // get messages at an interval
    useEffect(() => {
        let isMounted = true;
        const getMessagesOnInterval = setInterval(() => {
            getChannelMessages(isMounted);
        }, 1000);
        return () => {
            isMounted = false;
            clearInterval(getMessagesOnInterval);
        }
    }, [])

    const sendMessage = (messageData) => {
        const { channelId, user_id, message } = messageData;
        const data = {
            user_id,
            message
        };

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
    }

    const changeChannels = (channelId) => {
        setViewChannel(channelId);
    }

    if (!userChannelsJoined && !channelMessages && !channelDetails) {
        return <>loading...</>
    }

    return (
        <section className="home-page">
            <aside className="sidebar">
                <Channels
                    userChannelsJoined={userChannelsJoined}
                    changeChannels={changeChannels} />
                <UserSettings
                    username={userInfo.username}
                    history={props.history} />
            </aside>
            <Switch>
                <Route path="/channels/:channelId" render={renderProps =>
                    <Chat
                        {...renderProps}
                        userInfo={userInfo}
                        channelMessages={channelMessages}
                        sendMessage={sendMessage}
                        channelDetails={channelDetails} />
                } />
            </Switch>
        </section>
    )
}
