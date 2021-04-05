import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Channels.scss";

export const Channels = (props) => {
    const { userChannelsJoined } = props;

    const addToSession = (channelID) => {
        sessionStorage.setItem("lastChannel", channelID);
    }

    return (
        <div className="channels">
            <h2 className="channels__title">{"// Channels"}</h2>
            <div className="channels__joined" >
                <ul>
                    {
                        userChannelsJoined.map(channel =>
                            <li className="channels__list-item" key={channel.id}>
                                <NavLink to={`/channels/${channel.channel.id}`} className="channels__channel" onClick={() => addToSession(channel.channel.id)}>{`< ${channel.channel.name} />`}</NavLink>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}
