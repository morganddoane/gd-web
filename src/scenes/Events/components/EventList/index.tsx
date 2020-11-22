import { Fade, Grid, Grow, makeStyles } from '@material-ui/core';
import { IEvents_Event } from 'GraphQL/scenes/Events/queries';
import React, { ReactElement } from 'react';

import { format } from 'date-fns';

const useStyles = makeStyles((theme) => ({
    root: {},
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

export const EventList = (props: { events: IEvents_Event[] }): ReactElement => {
    const classes = useStyles();

    const eventRow = (event: IEvents_Event) => (
        <Fade in>
            <div className={classes.eventRow}>
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

    return <div>{props.events.map((e) => eventRow(e))}</div>;
};
