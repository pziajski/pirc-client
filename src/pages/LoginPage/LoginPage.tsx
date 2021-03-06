import React, { useState } from 'react';
import { RouteComponentProps } from "react-router-dom";
import "./LoginPage.scss";
import { Redirect } from 'react-router';
import { authPostRequest } from "../../functions/AuthorizedAPIRequests";
import loginImage from "../../assets/images/umberto-FewHpO4VC9Y-unsplash.jpg"
import iconImage from "../../assets/images/Source-Code-256.png";

export const LoginPage: React.FC<RouteComponentProps> = (props) => {
    const [action, setAction] = useState("login");
    const [error, setError] = useState("");

    // TODO change event type
    const loginUser = (e: any) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        authPostRequest(`login`, { username, password })
            .then(response => {
                localStorage.setItem("authToken", response.token);
                props.history.push("/channels");
            })
            .catch(error => {
                setError("incorrect username or password.")
                console.error("failed to login", error);
            })
    }

    // TODO change event type
    const createUser = (e: any) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const verifyPassword = e.target.verifyPassword.value;

        if (password !== verifyPassword) {
            setError("paswords must match.");
            return;
        }

        if (password.length < 3 || password.length > 16) {
            setError("pasword must be between 3 and 16 characters.");
            return;
        }

        if (username.length < 3 || username.length > 16) {
            setError("username must be between 3 and 16 characters.");
            return;
        }

        authPostRequest(`signup`, { username, password })
            .then(response => {
                localStorage.setItem("authToken", response.token);
                props.history.push("/channels");
            })
            .catch(error => {
                setError("username is already in use.")
                console.error("failed to login", error);
            })
    }

    const toggleFormActions = () => {
        action === "login"
            ? setAction("signup")
            : setAction("login");
        setError("");
    }

    if (!!localStorage.getItem("authToken")) {
        return <Redirect to="/channels" />
    }

    return (
        <section className="login-page">
            <div className="login-page__container">
                <div className="login-page__left">
                    <img className="login-page__image" src={loginImage} alt="glowing fireworks" />
                </div>
                <div className="login-page__right">
                    <div className="login-page__header">
                        <img className="login-page__icon" src={iconImage} alt="source code" />
                        <h1 className="login-page__title">PiRC</h1>
                    </div>
                    <form className="login-page__form" onSubmit={action === "login" ? loginUser : createUser}>
                        <input className="login-page__input" type="text" name="username" placeholder="Username" autoComplete="off" required />
                        <input className="login-page__input" type="password" name="password" placeholder="Password" required />
                        {
                            action === "signup"
                                ? <input className="login-page__input" type="password" name="verifyPassword" placeholder="Repeat Password" required />
                                : <></>
                        }
                        {
                            action === "login"
                                ? <button className="login-page__button" name="login">Login</button>
                                : <button className="login-page__button" name="signup">Signup</button>
                        }
                        {
                            error !== ""
                                ? <p className="login-page__error">{error}</p>
                                : <></>
                        }
                    </form>
                    {
                        action === "login"
                            ? <div className="login-page__notice">
                                <p>Don't have an account?</p>
                                <p>make one <span className="login-page__redirect" onClick={toggleFormActions}>here</span></p>
                            </div>
                            : <div className="login-page__notice">
                                <p>Already made an account?</p>
                                <p>login <span className="login-page__redirect" onClick={toggleFormActions}>here</span></p>
                            </div>
                    }
                </div>
            </div>
            <p className="login-page__slogo">Where dark mode is the only mode</p>
        </section>
    )
}