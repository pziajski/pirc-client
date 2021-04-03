import React from 'react';
import "./Channels.scss";

export const Channels = (props) => {
    const { userChannelsJoined, changeChannels } = props;

    return (
        <div className="channels">
            <h2 className="channels__title">{"// Channels"}</h2>
            <ul className="channels__list">
                {
                    userChannelsJoined.map(channel => 
                        <li className="channels__list-item" key={channel.id}>
                            <p className="channels__channel" onClick={() => changeChannels(channel.channel_id)}>{`< ${channel.channel.name} />`}</p>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}
