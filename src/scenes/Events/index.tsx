import React, { ReactElement } from 'react';

import { makeStyles, Typography } from '@material-ui/core';
import { AppNav } from 'components/AppNav';
import { RouteKey } from 'router/privateRoutes';
import { PageTitle } from 'components/AppNav/components/PageTitle/iindex';

const useStyles = makeStyles((theme) => ({
    root: {},
    content: {
        padding: 24,
    },
}));

export const Events = (): ReactElement => {
    const classes = useStyles();

    return (
        <AppNav routeKey={RouteKey.Events}>
            <div className={classes.content}>
                <PageTitle>Events</PageTitle>
            </div>
        </AppNav>
    );
};
