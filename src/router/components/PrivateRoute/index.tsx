import { useAppDataProvider } from 'providers/AppDataProvider';
import React, { ReactElement } from 'react';
import { useCookies } from 'react-cookie/es6';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface IPrivateRouteProps extends RouteProps {
    children: ReactElement;
}

export const PrivateRoute = (props: IPrivateRouteProps): ReactElement => {
    const { children, ...rest } = props;

    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    return (
        <Route
            {...rest}
            render={({ location }) =>
                token && user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};
