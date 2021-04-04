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
            <ul className="channels__list">
                {
                    userChannelsJoined.map(channel => 
                        <li className="channels__list-item" key={channel.id}>
                            <NavLink to={`/channels/${channel.channel_id}`} className="channels__channel" onClick={() => addToSession(channel.channel_id)}>{`< ${channel.channel.name} />`}</NavLink>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}
