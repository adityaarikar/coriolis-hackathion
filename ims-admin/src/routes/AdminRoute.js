import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import LoadingComponent from 'components/loading';
import Categories from './Categories/Categories';
import Inventories from './Inventories/Inventories';
import Employees from './Employees/Employees';
import Chat from './Chat/Chat';
import InventoriesById from './Inventories/InventoriesById';

const DashboardComponent = lazy(() => import('./dashboard'));

function AdminRoute() {
    return (
        <Suspense fallback={<LoadingComponent loading />}>
            <Switch>
                <Route exact path={SLUGS.home} component={DashboardComponent} />
                <Route path={SLUGS.categories} component={Categories} />
                <Route path={SLUGS.getInventoriesById} component={InventoriesById} />
                <Route path={SLUGS.inventories} component={Inventories} />
                <Route path={SLUGS.employees} component={Employees} />
                <Route path={SLUGS.chat} component={Chat} />
                {/* <Redirect to={SLUGS.home} /> */}
            </Switch>
        </Suspense>
    );
}

export default AdminRoute;
