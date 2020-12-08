import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import NavBar from '../General/NavBar'


export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    path,
    ...rest

}) => {

    return (
        <div>
            <NavBar>
                <Route
                    {...rest}
                    component={(props) => (
                        (isAuthenticated)
                            ? (<Component {...props} />)
                            : (<Redirect to="/u/login" />)
                    )}

                />
            </NavBar>
        </div>
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}