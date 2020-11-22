import React, { ReactElement } from 'react';

import { makeStyles } from '@material-ui/core';
import { AppNav } from 'components/AppNav';
import { RouteKey } from 'router/privateRoutes';
import { PageTitle } from 'components/AppNav/components/PageTitle/iindex';
import { PageNavs } from 'components/AppNav/components/PageNavs';
import { ShipmentTable } from './components/ShipmentTable';

const pad = 24;

const useStyles = makeStyles((theme) => ({
    root: {},
    content: {
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
    },
    header: {
        padding: pad,
    },
    body: {
        flex: 1,
        padding: `0px ${pad}px ${pad}px ${pad}px`,
    },
    [theme.breakpoints.down('sm')]: {
        header: {
            borderBottom: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.shadows[2],
            padding: `${pad}px ${pad}px 0px ${pad}px`,
        },
    },
}));

enum ShipmentView {
    Pending = 'Pending',
    Complete = 'Complete',
}

export const Shipments = (): ReactElement => {
    const classes = useStyles();

    const [view, setView] = React.useState<ShipmentView>(ShipmentView.Pending);

    return (
        <AppNav routeKey={RouteKey.Shipments} overflow>
            <div className={classes.content}>
                <div className={classes.header}>
                    <PageTitle>Shipments</PageTitle>
                    <PageNavs
                        onClick={(value: string) => {
                            setView(value as ShipmentView);
                        }}
                        active={view}
                    >
                        {Object.keys(ShipmentView)}
                    </PageNavs>
                </div>
                <div className={classes.body}>
                    <ShipmentTable />
                </div>
            </div>
        </AppNav>
    );
};
