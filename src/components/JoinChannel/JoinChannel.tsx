import React, { useEffect, useState } from 'react';
import { authGetRequest } from '../../functions/AuthorizedAPIRequests';
import iChannels from '../../interface/iChannels';
import iJoinChannel from '../../interface/iJoinChannel';
import "./JoinChannel.scss";

export const JoinChannel: React.FC<iJoinChannel> = ({ goBack, joinChannel, userChannelsJoined }) => {
    const [availChannels, setAvailChannels] = useState<iChannels>([]);
    useEffect(() => {
        authGetRequest("channels")
            .then((channels: iChannels) => {
                setAvailChannels(channels.filter(channel => !userChannelsJoined.find(joined => joined.channel_id === channel.id)));
            })
    }, [userChannelsJoined])

    // TODO set event type
    const submitHandler = (e: any) => {
        e.preventDefault();
        joinChannel(e.target.channel.value);
        goBack();
    }

    return (
        <div className="join-channel">
            <form className="join-channel__form" onSubmit={submitHandler}>
                <h2 className="join-channel__title">{"// Join a Channel"}</h2>
                {
                    availChannels.length !== 0
                        ? <select className="join-channel__input" name="channel">
                            {
                                availChannels.map(channel =>
                                    <option key={`${channel.id}`} value={`${channel.id}`}>{`${channel.name}`}</option>
                                )
                            }
                        </select>
                        : <p className="join-channel__error">You've joined every channel!</p>
                }
                <div className="join-channel__actions">
                    {
                        availChannels.length !== 0
                            ? <button className="join-channel__submit">Submit</button>
                            : <></>
                    }
                    <button className="join-channel__cancel" type="button" onClick={goBack}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
