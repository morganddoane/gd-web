import { useAppDataProvider } from 'providers/AppDataProvider';
import React, { ReactElement } from 'react';
import { useCookies } from 'react-cookie/es6';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface IPrivateRouteProps extends RouteProps {
    children: ReactElement;
}

export const PublicOnlyRoute = (props: IPrivateRouteProps): ReactElement => {
    const { children, ...rest } = props;
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                !cookies.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};
