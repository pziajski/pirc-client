import React, { useEffect, useState } from 'react';
import { authGetRequest } from '../../functions/AuthorizedAPIRequests';
import "./JoinChannel.scss";

export const JoinChannel = (props) => {
    const { goBack, joinChannel, userChannelsJoined } = props;
    const [availChannels, setAvailChannels] = useState([]);
    useEffect(() => {
        authGetRequest("channels")
            .then(channels => {
                setAvailChannels(channels.filter(channel => !userChannelsJoined.find(joined => joined.channel_id === channel.id)));
            })
    }, [userChannelsJoined])

    const submitHandler = (e) => {
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
                    <button className="join-channel__cancel" type="click" onClick={goBack}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
