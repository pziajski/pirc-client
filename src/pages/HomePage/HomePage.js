import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Cookies from "universal-cookie";
import { Chat } from "../../components/Chat/Chat";
import { Channels } from "../../components/Channels/Channels";
import { UserSettings } from "../../components/UserSettings/UserSettings";
import { authGetRequest, authPostRequest } from "../../functions/AuthorizedAPIRequests";
import { CreateChannel } from "../../components/CreateChannel/CreateChannel";
import { JoinChannel } from "../../components/JoinChannel/JoinChannel";
import "./HomePage.scss";

export const HomePage = (props) => {
    const cookies = new Cookies();
    const [lastChannel, setLastChannel] = useState(!sessionStorage.getItem("lastChannel") ? 1 : parseInt(sessionStorage.getItem("lastChannel")));
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        let isMounted = true;
        authGetRequest(`users/userInfo`)
            .then(userInfo => {
                if (isMounted) {
                    setUserInfo(userInfo);
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
            authGetRequest(`users/channels`)
                .then(channelsJoined => {
                    if (isMounted) {
                        setUserChannelsJoined(channelsJoined);
                        !!channelsJoined.find(channel => channel.channel_id === lastChannel)
                            ? props.history.push(`/channels/${lastChannel}`)
                            : setLastChannel(1);
                    }
                })
                .catch(error => {
                    console.error(error);
                })
        }

        return () => {
            isMounted = false;
        }

    }, [userInfo, lastChannel]);

    const redirectToLogin = () => {
        cookies.remove("authToken", { path: "/" });
        props.history.push("/login");
    }

    const [createAction, setCreateAction] = useState(false);
    const createChannel = (name) => {
        authPostRequest("channels", { name })
            .then(newChannel => {
                const { id } = newChannel;
                setLastChannel(id);
                sessionStorage.setItem("lastChannel", id);
            })
            .catch(error => {
                console.error(error);
            })
    }

    const [joinAction, setJoinAction] = useState(false);
    const joinChannel = (channelId) => {
        authPostRequest(`channels/${channelId}/users`, { user_id: userInfo.id })
            .then(joinedChannel => {
                setLastChannel(joinedChannel.channel_id);
            })
            .catch(error => {
                console.error(error);
            })
    }

    if (!userChannelsJoined && !userInfo) {
        return <>loading...</>
    }

    return (
        <section className="home-page">
            <aside className="sidebar">
                <Channels
                    userChannelsJoined={userChannelsJoined} />
                <UserSettings
                    username={userInfo.username}
                    redirectToLogin={redirectToLogin}
                    createChannel={() => setCreateAction(true)}
                    joinChannel={() => setJoinAction(true)}/>
            </aside>
            <Switch>
                <Route path="/channels/:channelId" render={renderProps =>
                    <Chat
                        {...renderProps}
                        userInfo={userInfo} />
                } />
            </Switch>
            {
                createAction
                    ? <CreateChannel
                        goBack={() => setCreateAction(false)}
                        createChannel={createChannel} />
                    : <></>
            }
            {
                joinAction
                    ? <JoinChannel
                        goBack={() => setJoinAction(false)}
                        joinChannel={joinChannel}
                        userChannelsJoined={userChannelsJoined} />
                    : <></>
            }
        </section>
    )
}
