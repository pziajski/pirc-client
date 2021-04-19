import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import "./App.scss";

export const App: React.FC = () => {
    return (
        <div className="app">
            <BrowserRouter>
                <Switch>
                    <Route path="/login" exact component={LoginPage} />
                    <Route path="/channels" component={HomePage} />
                    <Route path="/">
                        <Redirect to="/login" />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}