import { Fade, Grid, makeStyles } from '@material-ui/core';
import { IEvents_Event } from 'GraphQL/scenes/Events/queries';
import React, { ReactElement } from 'react';
import { format } from 'date-fns';
import { PageNavs } from 'components/AppNav/components/PageNavs';
import { EventFilter, EventView } from 'scenes/Events';
import { PageTitle } from 'components/AppNav/components/PageTitle/iindex';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
    },
    header: {
        padding: `24px 24px 0px 24px`,
    },
    body: {
        flex: 1,
        padding: 24,
        overflow: 'auto',
    },
    eventRow: {
        padding: 10,
        borderBottom: `1px solid ${theme.palette.divider}`,
        '&:hover': {
            cursor: 'pointer',
            boxShadow: theme.shadows[1],
            zIndex: 1000,
        },
    },
    dateWrap: {
        textAlign: 'center',
    },
    month: {
        fontWeight: 500,
        color: theme.palette.success.dark,
        margin: 0,
        padding: 0,
    },
    date: {
        fontWeight: 500,
        margin: 0,
        fontSize: 22,
        color: theme.palette.text.secondary,
    },
    title: {
        fontWeight: 500,
        margin: 0,
        fontSize: 16,
        padding: '0px 0px 2px 0px',
    },
    subtitle: {
        color: theme.palette.text.secondary,
        margin: 0,
    },
}));

export const EventList = (props: {
    events: IEvents_Event[];
    filter: EventFilter;
    click: (event: IEvents_Event) => void;
    changeFilter: (filter: EventFilter) => void;
}): ReactElement => {
    const classes = useStyles();
    const { events, filter, click, changeFilter } = props;

    const eventRow = (event: IEvents_Event) => (
        <Fade key={event.id} in timeout={400}>
            <div className={classes.eventRow} onClick={() => click(event)}>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    spacing={10}
                >
                    <Grid item>
                        <div className={classes.dateWrap}>
                            <p className={classes.month}>
                                {format(new Date(event.start.local), 'MMM')}
                            </p>
                            <p className={classes.date}>
                                {format(new Date(event.start.local), 'd')}
                            </p>
                        </div>
                    </Grid>
                    <Grid item>
                        <p className={classes.title}>{event.name.text}</p>
                        <p className={classes.subtitle}>{event.status}</p>
                    </Grid>
                    <Grid item></Grid>
                    <Grid item xs />
                </Grid>
            </div>
        </Fade>
    );

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <PageTitle>Events</PageTitle>
                <PageNavs
                    onClick={(value: string) => {
                        changeFilter(value as EventFilter);
                    }}
                    active={filter}
                >
                    {Object.keys(EventFilter)}
                </PageNavs>
            </div>
            <div className={classes.body}>{events.map((e) => eventRow(e))}</div>
        </div>
    );
};
