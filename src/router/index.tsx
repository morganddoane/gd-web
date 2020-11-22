import React, { ReactElement } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Login } from 'scenes/Login';
import { Logout } from 'scenes/Logout';
import { PrivateRoute } from './components/PrivateRoute';
import { PublicOnlyRoute } from './components/PublicOnlyRoute';
import { privateRoutes } from './privateRoutes';

export const AppRouter = (): ReactElement => {
    const renderPrivateRoutes = (): ReactElement[] => {
        const componentArray: ReactElement[] = [];
        privateRoutes.map((r) => {
            for (const [key, value] of Object.entries(r)) {
                const ChildComponent = value.component;

                componentArray.push(
                    <PrivateRoute
                        key={key}
                        path={value.path}
                        exact={value.exact}
                    >
                        <ChildComponent />
                    </PrivateRoute>
                );
            }
        });
        return componentArray;
    };

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/events" />
                </Route>
                <PrivateRoute path="/logout" exact>
                    <Logout />
                </PrivateRoute>
                {renderPrivateRoutes()}
                <PublicOnlyRoute path="/login" exact>
                    <Login />
                </PublicOnlyRoute>
                <PrivateRoute path="*">
                    <h1>Not found</h1>
                </PrivateRoute>
            </Switch>
        </BrowserRouter>
    );
};
