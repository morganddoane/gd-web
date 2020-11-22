import React, { ReactElement } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import {
    IShipments_response,
    QShipments,
} from 'GraphQL/scenes/Shipments/queries';
import LottieAnimation, {
    LottieAnimationType,
} from 'components/LottieAnimation';

const useStyles = makeStyles((theme) => ({
    root: { height: '100%' },
    message: {
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export const ShipmentTable = (): ReactElement => {
    const classes = useStyles();

    const { data, error, loading } = useQuery<IShipments_response>(QShipments);

    const shipments = data ? data.shipments : [];

    const loadingDisplay = (
        <div className={classes.message}>
            <LottieAnimation
                height={100}
                width={100}
                animation={LottieAnimationType.Loading}
            />
        </div>
    );
    const errorDisplay = (
        <div className={classes.message}>
            <LottieAnimation
                height={100}
                width={100}
                animation={LottieAnimationType.Error}
            />
            <p>{error?.message}</p>
        </div>
    );

    const grid = (
        <DataGrid
            columns={[
                { field: 'Name' },
                { field: 'Location' },
                { field: 'Date Purchased' },
                { field: 'Status' },
                { field: 'Shipping' },
                { field: 'Notes' },
            ]}
            rows={[]}
        />
    );

    const genView = (): ReactElement => {
        if (loading) return loadingDisplay;
        if (error) return errorDisplay;
        else return grid;
    };

    return <div className={classes.root}>{genView()}</div>;
};
