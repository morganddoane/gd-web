import {
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';
import { format } from 'date-fns';
import {
    IAddress,
    IEventDetail_Attendee,
} from 'GraphQL/scenes/EventDetail/queries';
import React, { ReactElement } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {},
    cell: {
        paddingTop: 10,
        paddingBottom: 10,
    },
}));

export const AttendeeTable = (props: {
    attendees: IEventDetail_Attendee[];
    click: (attendee: IEventDetail_Attendee) => void;
}): ReactElement => {
    const { attendees, click } = props;

    const classes = useStyles();

    const getAddress = (
        attendee: IEventDetail_Attendee
    ): IAddress | undefined => {
        if (attendee.profile.addresses) {
            const home = attendee.profile.addresses.home;
            const ship = attendee.profile.addresses.ship;
            const work = attendee.profile.addresses.work;

            if (ship) return ship;
            if (home) return home;
            if (work) return work;
        }
    };

    const getLocation = (address: IAddress | undefined): string => {
        if (address)
            return `${address.city ? address.city : ''}, ${
                address.region ? address.region : ''
            }`;
        else return 'Not found';
    };

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Date Purchased</TableCell>
                    <TableCell>Status</TableCell>
                    {/* <TableCell>Shipping</TableCell> */}
                    <TableCell>Notes</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {attendees.map((att) => (
                    <TableRow hover key={att.id} onClick={() => click(att)}>
                        <TableCell
                            className={classes.cell}
                            component="th"
                            scope="row"
                        >
                            {att.profile.name}
                        </TableCell>
                        <TableCell
                            className={classes.cell}
                            component="th"
                            scope="row"
                        >
                            {getLocation(getAddress(att))}
                        </TableCell>
                        <TableCell
                            className={classes.cell}
                            component="th"
                            scope="row"
                        >
                            {format(
                                new Date(att.created),
                                'EEE , MMM Qo  (h:mm a)'
                            )}
                        </TableCell>
                        <TableCell
                            className={classes.cell}
                            component="th"
                            scope="row"
                        >
                            {`${att.status}${
                                att.refunded ? ' (Refunded)' : ''
                            }`}
                        </TableCell>
                        <TableCell
                            className={classes.cell}
                            component="th"
                            scope="row"
                        >
                            {att.note ? att.note : ''}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
