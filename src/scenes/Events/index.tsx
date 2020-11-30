import React, { ReactElement } from 'react';

import { makeStyles } from '@material-ui/core';
import { AppNav } from 'components/AppNav';
import { RouteKey } from 'router/privateRoutes';
import { PageTitle } from 'components/AppNav/components/PageTitle/iindex';
import { PageNavs } from 'components/AppNav/components/PageNavs';
import {
    IEvents_Event,
    IEvents_Response,
    QEvents,
} from 'GraphQL/scenes/Events/queries';
import { useQuery } from '@apollo/client';
import { EventList } from './components/EventList';
import {
    IEventDetail_Args,
    IEventDetail_Attendee,
    IEventDetail_Response,
    QEventDetail,
} from 'GraphQL/scenes/EventDetail/queries';
import { useHistory, useParams } from 'react-router';
import LottieAnimation, {
    LottieAnimationType,
} from 'components/LottieAnimation';
import { EventDetail } from './components/EventDetail';

const pad = 24;

const useStyles = makeStyles((theme) => ({
    root: {},
    content: {
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
    },
    body: {
        flex: 1,
        overflow: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
        body: {
            padding: 0,
        },
        header: {
            borderBottom: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.shadows[2],
        },
    },
}));

export enum EventView {
    List = 'List',
    Detail = 'Detail',
}

export enum EventFilter {
    Published = 'Published',
    Complete = 'Complete',
    Drafts = 'Drafts',
}

export const eventStatus: Record<EventFilter, string> = {
    [EventFilter.Published]: 'live',
    [EventFilter.Drafts]: 'draft',
    [EventFilter.Complete]: 'completed',
};

export const Events = (): ReactElement => {
    const classes = useStyles();

    const { id } = useParams<{ id: string }>();
    const history = useHistory();

    const view = id && id.length > 0 ? EventView.Detail : EventView.List;

    const [filter, setFilter] = React.useState<EventFilter>(
        localStorage.getItem('eventFilter')
            ? (localStorage.getItem('eventFilter') as EventFilter)
            : EventFilter.Published
    );

    const {
        data: attendeeData,
        error: attendeeError,
        loading: attendeeLoading,
    } = useQuery<IEventDetail_Response, IEventDetail_Args>(QEventDetail, {
        variables: {
            eventId: id,
        },
        skip: !id || id.length === 0,
    });

    const attendees =
        attendeeData && attendeeData.attendees ? attendeeData.attendees : [];

    const { data, error, loading } = useQuery<IEvents_Response>(QEvents);

    const events = data
        ? data.events.filter((e) => e.status === eventStatus[filter])
        : [];

    const focusedEvent: IEvents_Event | undefined = events.find(
        (e) => e.id === id
    );

    const message = (): ReactElement => {
        const getAnimation = (): LottieAnimationType => {
            if (loading || attendeeLoading) return LottieAnimationType.Loading;
            else if (error || attendeeError) return LottieAnimationType.Error;
            else return LottieAnimationType.Airplane;
        };

        return (
            <div className={classes.messageWrap}>
                <LottieAnimation loop={!error} animation={getAnimation()} />
            </div>
        );
    };

    const eventClick = (event: IEvents_Event) => {
        history.push(`/events/${event.id}`);
    };

    const genView = (): ReactElement => {
        if (loading || attendeeLoading || error || attendeeError)
            return message();
        else if (view === EventView.Detail && focusedEvent)
            return <EventDetail event={focusedEvent} attendees={attendees} />;
        else
            return (
                <EventList
                    filter={filter}
                    changeFilter={(filter: EventFilter) => {
                        setFilter(filter);
                        localStorage.setItem('eventFilter', filter);
                    }}
                    click={eventClick}
                    events={events}
                />
            );
    };

    return (
        <AppNav routeKey={RouteKey.Events}>
            <div className={classes.content}>
                <div className={classes.body}>{genView()}</div>
            </div>
        </AppNav>
    );
};
