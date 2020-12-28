import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import { Navbar } from "../components/ui/Navbar";

import { ComidasContextProvider } from "../context/comidas-context"

import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Food } from '../pages/Food';



export const AppRouter = () => {

    return (
        <ComidasContextProvider>
            <Router>
                <div>
                    <Switch>
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/register' component={Register} />
                        <Navbar>
                            <Route exact path='/food' component={Food} />
                        </Navbar>
                        <Redirect to ="/login" />
                    </Switch>
                </div>
            </Router>
        </ComidasContextProvider>
    )
}
