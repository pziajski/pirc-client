import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Chat } from "../../components/Chat/Chat";
import { Channels } from "../../components/Channels/Channels";
import { UserSettings } from "../../components/UserSettings/UserSettings";
import { authGetRequest } from "../../functions/AuthorizedAPIRequests";
import "./HomePage.scss";

export const HomePage = (props) => {
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        let isMounted = true;
        authGetRequest(`users/userInfo`)
            .then(response => {
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
                .catch(error => {
                    console.error(error);
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
            .catch(error => {
                console.error(error);
            })

        return () => {
            isMounted = false;
        }
    }, [viewChannel]);



    const changeChannels = (channelId) => {
        setViewChannel(channelId);
    }

    if (!userChannelsJoined && !channelDetails) {
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
                        channelDetails={channelDetails} />
                } />
            </Switch>
        </section>
    )
}
