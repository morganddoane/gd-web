import React, { ReactElement } from 'react';
import { ColParams, DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import {
    IShipments_response,
    QShipments,
} from 'GraphQL/scenes/Shipments/queries';
import LottieAnimation, {
    LottieAnimationType,
} from 'components/LottieAnimation';
import { SizeMe } from 'react-sizeme';

interface IStyleProps {
    rowCount: number;
}

const useStyles = (props: IStyleProps) => {
    const { rowCount } = props;
    return makeStyles((theme) => ({
        root: { height: '100%' },
        message: {
            height: '100%',
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        column: {
            width: `calc(100% / ${rowCount})`,
        },
    }))();
};

const HeaderCell = (props: {
    size: {
        readonly width: number | null;
        readonly height: number | null;
    };
}): ReactElement => {
    return <div></div>;
};

HeaderCell.displayName = 'HeaderCell;';

export const ShipmentTable = (): ReactElement => {
    const classes = useStyles({ rowCount: 6 });

    const { data, error, loading } = useQuery<IShipments_response>(QShipments);

    const shipments = data ? data.shipments : [];

    const loadingDisplay = (
        <div className={classes.message}>
            <LottieAnimation
                height={100}
                width={100}
                animation={LottieAnimationType.Loading}
                loop
            />
        </div>
    );
    const noDataDisplay = (
        <div className={classes.message}>
            <LottieAnimation
                height={100}
                width={100}
                animation={LottieAnimationType.Airplane}
                loop
            />
            <p>{"There ain't nothin here"}</p>
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

    const cellProps = () => {
        return {
            headerClassName: classes.column,
        };
    };

    const grid = (
        <DataGrid
            columns={[
                {
                    field: 'Name',
                    ...cellProps(),
                },
                {
                    field: 'Location',
                    ...cellProps(),
                },
                {
                    field: 'Date Purchased',
                    ...cellProps(),
                },
                {
                    field: 'Status',
                    ...cellProps(),
                },
                {
                    field: 'Shipping',
                    ...cellProps(),
                },
                {
                    field: 'Notes',
                    ...cellProps(),
                },
            ]}
            rows={shipments.map((ship, index) => {
                return {
                    id: ship.id,
                    Name: ship.attendee,
                    Location: ship.attendee,
                    'Date Purchased': ship.attendee,
                    Status: ship.attendee,
                    Shipping: ship.attendee,
                    Notes: ship.attendee,
                };
            })}
            components={{
                noRowsOverlay: () => noDataDisplay,
            }}
        />
    );

    const genView = (): ReactElement => {
        if (loading) return loadingDisplay;
        if (error) return errorDisplay;
        else return grid;
    };

    return <div className={classes.root}>{genView()}</div>;
};
