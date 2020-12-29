import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import { Navbar } from "../components/ui/Navbar";

import { ComidasContextProvider } from "../context/comidas-context"
import { PacientesContextProvider } from "../context/pacientes-context";

import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Food } from '../pages/Food';
import { Patients } from "../pages/Patients";



export const AppRouter = () => {

    return (
        <Router>
                <div>
                    <Switch>
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/register' component={Register} />
                        <Navbar>
                            <ComidasContextProvider>
                                <Route exact path='/food' component={Food} />
                            </ComidasContextProvider>
                            <PacientesContextProvider>
                                <Route exact path='/patients' component={Patients} />
                            </PacientesContextProvider>
                        </Navbar>
                        <Redirect to ="/login" />
                    </Switch>
                </div>
            </Router>
    )
}
