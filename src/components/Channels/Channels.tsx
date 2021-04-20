import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Channels.scss";
import iUserChannelsJoined from "../../interface/iUserChannelsJoined";
import iChannelJoined from "../../interface/iChannelJoined";

export const Channels: React.FC<{ userChannelsJoined:iUserChannelsJoined }> = ({ userChannelsJoined }) => {

    const addToSession = (channelID: number) => {
        sessionStorage.setItem("lastChannel", channelID.toString());
    }

    return (
        <div className="channels">
            <h2 className="channels__title">{"// Channels"}</h2>
            <div className="channels__joined" >
                <ul>
                    {
                        userChannelsJoined.map((channel:iChannelJoined) =>
                            <li className="channels__list-item" key={channel.id}>
                                <NavLink to={`/channels/${channel.channel_id}`} className="channels__channel" onClick={() => addToSession(channel.channel_id)}>{`< ${channel.channel.name} />`}</NavLink>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}
