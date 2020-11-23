import React, { ReactElement } from 'react';
import { IEvents_Event } from 'GraphQL/scenes/Events/queries';
import { Button, makeStyles } from '@material-ui/core';
import { IEventDetail_Attendee } from 'GraphQL/scenes/EventDetail/queries';
import { PageTitle } from 'components/AppNav/components/PageTitle/iindex';
import { MdChevronLeft } from 'react-icons/md';
import { useHistory } from 'react-router';
import { AttendeeTable } from './components/AttendeeTable';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
    },
    header: {
        padding: 24,
    },
    body: {
        flex: 1,
        padding: `0px 24px 24px 24px`,
        overflow: 'auto',
    },
    backButton: {
        marginBottom: 8,
    },
}));

export const EventDetail = (props: {
    event: IEvents_Event;
    attendees: IEventDetail_Attendee[];
}): ReactElement => {
    const { event, attendees } = props;

    const classes = useStyles();
    const history = useHistory();

    const back = (): void => {
        history.goBack();
    };

    const sorted = attendees.slice().sort(function (a, b) {
        if (a.profile.first_name < b.profile.first_name) {
            return -1;
        }
        if (a.profile.first_name > b.profile.first_name) {
            return 1;
        }
        return 0;
    });

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Button
                    className={classes.backButton}
                    startIcon={<MdChevronLeft />}
                    onClick={back}
                >
                    Back to events
                </Button>
                <PageTitle>{event.name.text}</PageTitle>
            </div>
            <div className={classes.body}>
                <AttendeeTable attendees={sorted} />
            </div>
        </div>
    );
};
