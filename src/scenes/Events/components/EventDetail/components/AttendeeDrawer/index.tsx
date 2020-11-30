import { IEventDetail_Attendee } from 'GraphQL/scenes/EventDetail/queries';
import React, { ReactElement } from 'react';

import { makeStyles, Drawer, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {},
    drawer: {
        padding: 24,
    },
    [theme.breakpoints.down('sm')]: {
        drawer: {
            width: '100vw',
        },
    },
    [theme.breakpoints.up('sm')]: {
        drawer: {
            minWidth: 340,
        },
    },
}));

enum DrawerView {
    Details = 'Details',
    Shipment = 'Shipment',
}

export const AttendeeDrawer = (props: {
    open: boolean;
    attendee: IEventDetail_Attendee;
    onClose: () => void;
}): ReactElement => {
    const { attendee, open, onClose } = props;
    const classes = useStyles();

    const [view, setView] = React.useState<DrawerView>(DrawerView.Details);

    const renderView: Record<DrawerView, ReactElement> = {
        [DrawerView.Details]: <div />,
        [DrawerView.Shipment]: <div />,
    };

    return (
        <Drawer
            PaperProps={{ className: classes.drawer }}
            anchor="right"
            open={open}
            onClose={onClose}
        >
            {renderView[view]}
        </Drawer>
    );
};
