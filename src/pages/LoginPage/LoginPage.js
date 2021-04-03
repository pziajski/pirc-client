import React from 'react';
import Cookies from "universal-cookie";
import "./LoginPage.scss";
import { Redirect } from 'react-router';
import { authPostRequest } from "../../functions/AuthorizedAPIRequests";


export const LoginPage = (props) => {
    const cookies = new Cookies();

    if (!!cookies.get("authToken")) {
        return <Redirect to="/channels" />
    }

    const loginUser = (e) => {
        const username = e.target.username.value;
        const password = e.target.password.value;

        authPostRequest(`login`, { username, password })
            .then(response => {
                props.history.push("/channels");
            })
            .catch(error => {
                console.error("failed to login", error);
            })
    }

    const createUser = (e) => {
        const username = e.target.username.value;
        const password = e.target.password.value;

        authPostRequest(`signup`, { username, password })
            .then(response => {
                props.history.push("/channels");
            })
            .catch(error => {
                console.error("failed to login", error);
            })
    }

    const formSubmit = (e) => {
        e.preventDefault();
        const { name: action } = e.nativeEvent.submitter;
        action === "login" ? loginUser(e) : createUser(e);
    }

    return (
        <section className="login-page">
            <div className="login-page__container">
                <h1 className="login-page__title">{`< PiRC />`}</h1>
                <form className="login-page__form" onSubmit={formSubmit}>
                    <label className="login-page__label">
                        Username:
                        <input type="text" name="username" />
                    </label>
                    <label className="login-page__label">
                        Password:
                        <input type="password" name="password" />
                    </label>
                    <button name="login">Login</button>
                    <button name="signup">Signup</button>
                </form>
            </div>
        </section>
    )
}
