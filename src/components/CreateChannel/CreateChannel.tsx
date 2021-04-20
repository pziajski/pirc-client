import React from "react";
import iCreatChannel from "../../interface/iCreateChannel";
import "./CreateChannel.scss";

export const CreateChannel: React.FC<iCreatChannel> = ({ goBack, createChannel }) => {
    // TODO set event type
    const submitHandler = (e: any) => {
        e.preventDefault();
        createChannel(e.target.name.value);
        goBack();
    }

    return (
        <div className="create-channel">
            <form className="create-channel__form" onSubmit={submitHandler}>
                <h2 className="create-channel__title">{"// Create a new Channel"}</h2>
                <input className="create-channel__input" type="text" placeholder="Channel Name" name="name" autoComplete="off" required />
                <div className="create-channel__actions">
                    <button className="create-channel__submit">Submit</button>
                    <button className="create-channel__cancel" type="button" onClick={goBack}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
