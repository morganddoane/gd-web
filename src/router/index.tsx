import React, { ReactElement } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Login } from 'scenes/Login';
import { PrivateRoute } from './components/PrivateRoute';
import { PublicOnlyRoute } from './components/PublicOnlyRoute';
import { privateRoutes } from './privateRoutes';

export const AppRouter = (): ReactElement => {
    const renderPrivateRoutes = (): ReactElement[] =>
        privateRoutes.map((r) => {
            const key = Object.keys(r)[0];
            const props = Object.values(r)[0];

            const ChildComponent = props.component;

            return (
                <PrivateRoute key={key} path={props.path} exact={props.exact}>
                    <ChildComponent />
                </PrivateRoute>
            );
        });

    return (
        <BrowserRouter>
            <Switch>
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
