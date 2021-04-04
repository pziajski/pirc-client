import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Cookies from "universal-cookie";
import { Chat } from "../../components/Chat/Chat";
import { Channels } from "../../components/Channels/Channels";
import { UserSettings } from "../../components/UserSettings/UserSettings";
import { authGetRequest } from "../../functions/AuthorizedAPIRequests";
import "./HomePage.scss";

export const HomePage = (props) => {
    const cookies = new Cookies();
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
            authGetRequest(`users/channels`)
                .then(response => {
                    if (isMounted) {
                        setUserChannelsJoined(response.data);
                        props.history.push("/channels/1");
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

    const changeChannels = (channelId) => {
        props.history.push(`/channels/${channelId}`);
    }

    const redirectToLogin = () => {
        cookies.remove("authToken", { path: "/" });
        props.history.push("/login");
    }

    if (!userChannelsJoined && !userInfo) {
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
                    redirectToLogin={redirectToLogin} />
            </aside>
            <Switch>
                <Route path="/channels/:channelId" render={renderProps =>
                    <Chat
                        {...renderProps}
                        userInfo={userInfo} />
                } />
            </Switch>
        </section>
    )
}
