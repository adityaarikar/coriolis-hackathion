import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import Login from './Login/Login';

function PublicRoutes() {
    return (
        <Switch>
            <Route path={SLUGS.login} render={() => <Login />} />
            <Redirect to={SLUGS.login} />
        </Switch>
    );
}

export default PublicRoutes;
