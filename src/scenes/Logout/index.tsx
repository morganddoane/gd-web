import { useAppDataProvider } from 'providers/AppDataProvider';
import React, { ReactElement } from 'react';
import { Redirect } from 'react-router';

export const Logout = (): ReactElement => {
    const { logoutUser } = useAppDataProvider();

    logoutUser();

    return <Redirect to="/" />;
};
