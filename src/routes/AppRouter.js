import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import { Navbar } from "../components/ui/Navbar";

import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';

export const AppRouter = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Navbar>
                        <Route exact path='/' component={Home} />
                    </Navbar>
                    <Redirect to='/' />
                </Switch>
            </Router>
        </div>
    )
}
