import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Register, SignIn } from '../pages';

export default function Routes() {

    return (
        <Router>
            <Switch>
                <Route path="/signin">
                    <SignIn />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </Router>
    )
}
