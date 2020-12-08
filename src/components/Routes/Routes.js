import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";


import Home from '../../components/General/Home';
import Login from '../../components/Login/Login'

const Routes = (props) => {
    

	return (
		<Router>
            <div>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <PrivateRoute
                        exact
                        path='/home'
                        isAuthenticated={ isLoggedIn() }
                        component={ Home }
                    />
                    <PrivateRoute
                        exact
                        path='/products'
                        isAuthenticated={ isLoggedIn() }
                        component={ Product }
                    />
                    <Redirect to="/login" />
                </Switch>
            </div>
        </Router>
	);
};


export default Routes;
