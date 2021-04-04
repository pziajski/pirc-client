import React from 'react';
import "./UserSettings.scss";

export const UserSettings = (props) => {
    const { username, redirectToLogin } = props;

    const createChannel = () => {}

    const joinChannel = () => {}

    return (
        <div className="user-settings">
            <p className="user-settings__user">{`// ${username}`}</p>
            <ul className="user-settings__settings-list">
                <li className="user-settings__settings-item">
                    <p onClick={createChannel}>Create Channel</p>
                </li>
                <li className="user-settings__settings-item">
                    <p onClick={joinChannel}>Join Channel</p>
                </li>
                <li className="user-settings__settings-item">
                    <p onClick={redirectToLogin}>Logout</p>
                </li>
            </ul>
        </div>
    )
}
