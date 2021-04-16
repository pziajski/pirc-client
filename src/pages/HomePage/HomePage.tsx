import React, { useEffect, useState, useCallback } from "react";
import { Switch, Route } from "react-router-dom";
import { Chat } from "../../components/Chat/Chat";
import { Channels } from "../../components/Channels/Channels";
import { UserSettings } from "../../components/UserSettings/UserSettings";
import { authGetRequest, authPostRequest } from "../../functions/AuthorizedAPIRequests";
import { CreateChannel } from "../../components/CreateChannel/CreateChannel";
import { JoinChannel } from "../../components/JoinChannel/JoinChannel";
import "./HomePage.scss";

interface iUserInfo {
    id: number,
    username: String
};

interface iUserChannelsJoined extends Array<iChannelJoined> {};

interface iChannelJoined {
    id: number,
    user_id: number,
    channel_id: number
};

interface iChannel {
    name: String,
    id: number
};

//TODO change props type
export const HomePage = (props: any) => {
    const pushToHistory = useCallback((url) => {
        props.history.push(url);
    }, [props.history]);

    const [lastChannel, setLastChannel] = useState<number>(!sessionStorage.getItem("lastChannel") ? 1 : parseInt(sessionStorage.getItem("lastChannel") || ""));
    
    const [userInfo, setUserInfo] = useState<iUserInfo | {}>({});
    useEffect(() => {
        let isMounted = true;
        authGetRequest(`users/userInfo`)
            .then((userInfo: iUserInfo) => {
                if (isMounted) {
                    setUserInfo(userInfo);
                }
            })
            .catch(error => {
                pushToHistory("/login");
            });

        return () => {
            isMounted = false;
        };
    }, [pushToHistory]);

    const [userChannelsJoined, setUserChannelsJoined] = useState<iUserChannelsJoined | []>([]);
    useEffect(() => {
        let isMounted = true;
        if (!!userInfo) {
            authGetRequest(`users/channels`)
                .then((channelsJoined: iUserChannelsJoined) => {
                    if (isMounted) {
                        setUserChannelsJoined(channelsJoined);
                        !!channelsJoined.find(channel => channel.channel_id === lastChannel)
                            ? pushToHistory(`/channels/${lastChannel}`)
                            : setLastChannel(1);
                    };
                })
                .catch(error => {
                    console.error(error);
                });
        };

        return () => {
            isMounted = false;
        };

    }, [userInfo, lastChannel, pushToHistory]);

    const redirectToLogin = () => {
        localStorage.removeItem("authToken");
        props.history.push("/login");
    };

    const [createAction, setCreateAction] = useState(false);
    const createChannel = (name: String) => {
        authPostRequest("channels", { name })
            .then((newChannel: iChannel) => {
                const { id } = newChannel;
                setLastChannel(id);
                sessionStorage.setItem("lastChannel", id.toString());
            })
            .catch(error => {
                console.error(error);
            })
    };

    const [joinAction, setJoinAction] = useState(false);
    const joinChannel = (channelId: number) => {
        authPostRequest(`channels/${channelId}/users`, { user_id: (userInfo as iUserInfo).id })
            .then((joinedChannel: iChannelJoined) => {
                setLastChannel(joinedChannel.channel_id);
            })
            .catch(error => {
                console.error(error);
            })
    };

    if (!userChannelsJoined && !userInfo) {
        return <>loading...</>
    };

    return (
        <section className="home-page">
            <aside className="sidebar">
                <Channels
                    userChannelsJoined={userChannelsJoined} />
                <UserSettings
                    username={(userInfo as iUserInfo).username}
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
    );
}
