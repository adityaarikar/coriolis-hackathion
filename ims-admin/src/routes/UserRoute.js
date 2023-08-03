import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import User from './User/User';

function UserRoute() {
    return (
        <Switch>
            <Route path={SLUGS.user} render={() => <User />} />
            <Redirect to={SLUGS.user} />
        </Switch>
    );
}

export default UserRoute;
