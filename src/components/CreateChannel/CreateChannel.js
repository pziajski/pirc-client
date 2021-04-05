import React from "react";
import "./CreateChannel.scss";

export const CreateChannel = (props) => {
    const { goBack, createChannel } = props;

    const submitHandler = (e) => {
        e.preventDefault();
        createChannel(e.target.name.value);
        goBack();
    }

    return (
        <div className="create-channel">
            <form className="create-channel__form" onSubmit={submitHandler}>
                <h2 className="create-channel__title">{"// Create a new Channel"}</h2>
                <input className="create-channel__input" type="text" placeholder="Channel Name" name="name" />
                <div className="create-channel__actions">
                    <button className="create-channel__submit">Submit</button>
                    <button className="create-channel__cancel" type="click" onClick={goBack}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
