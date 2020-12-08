import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';

export const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/' component={Home} />
                <Redirect to='/' />
            </Switch>
        </Router>
    )
}
