import React from 'react';
import "./UserSettings.scss";

export const UserSettings = (props) => {
    const { username, history } = props;

    const deleteToken = () => {
        sessionStorage.clear("authToken");
        history.push("/login");
    }

    const createChannel = () => {}

    const joinChannel = () => {}

    return (
        <div className="user-settings">
            <p>// {username}</p>
            <ul className="user-settings__settings-list">
                <li className="user-settings__settings-item">
                    <p onClick={createChannel}>Create Channel</p>
                </li>
                <li className="user-settings__settings-item">
                    <p onClick={joinChannel}>Join Channel</p>
                </li>
                <li className="user-settings__settings-item">
                    <p onClick={deleteToken}>Logout</p>
                </li>
            </ul>
        </div>
    )
}
