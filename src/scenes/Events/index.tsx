import React, { ReactElement } from 'react';

import { makeStyles } from '@material-ui/core';
import { AppNav } from 'components/AppNav';
import { RouteKey } from 'router/privateRoutes';
import { PageTitle } from 'components/AppNav/components/PageTitle/iindex';
import { PageNavs } from 'components/AppNav/components/PageNavs';
import { IEvents_Response, QEvents } from 'GraphQL/scenes/Events/queries';
import { useQuery } from '@apollo/client';
import { EventList } from './components/EventList';

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
        overflow: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
        body: {
            padding: 0,
        },
        header: {
            borderBottom: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.shadows[2],
            padding: `${pad}px ${pad}px 0px ${pad}px`,
        },
    },
}));

enum EventView {
    Published = 'Published',
    Complete = 'Complete',
    Drafts = 'Drafts',
}

const eventStatus: Record<EventView, string> = {
    [EventView.Published]: 'live',
    [EventView.Drafts]: 'draft',
    [EventView.Complete]: 'completed',
};

export const Events = (): ReactElement => {
    const classes = useStyles();

    const [view, setView] = React.useState<EventView>(EventView.Published);

    const { data, error, loading } = useQuery<IEvents_Response>(QEvents);

    const events = data
        ? data.events.filter((e) => e.status === eventStatus[view])
        : [];

    return (
        <AppNav routeKey={RouteKey.Events}>
            <div className={classes.content}>
                <div className={classes.header}>
                    <PageTitle>Events</PageTitle>
                    <PageNavs
                        onClick={(value: string) => {
                            setView(value as EventView);
                        }}
                        active={view}
                    >
                        {Object.keys(EventView)}
                    </PageNavs>
                </div>
                <div className={classes.body}>
                    <EventList events={events} />
                </div>
            </div>
        </AppNav>
    );
};
