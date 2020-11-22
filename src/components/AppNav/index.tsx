import React, { ReactElement } from 'react';

import { makeStyles, Tooltip } from '@material-ui/core';
import {
    IRouteProps,
    KeyedRoute,
    privateRoutes,
    RouteKey,
} from 'router/privateRoutes';
import clsx from 'clsx';
import shadows from '@material-ui/core/styles/shadows';
import { isPlainObject } from 'lodash';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
    },
    wrap: {
        flex: 1,
        overflow: 'hidden',
    },
    overflow: {
        overflow: 'auto',
    },
    sideBar: {
        flexShrink: 1,
        borderRight: `1px solid ${theme.palette.divider}`,
        paddingTop: 8,
    },
    tile: {
        width: 54,
        height: 54,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 32,
        margin: '12px 12px 18px 12px',
        borderRadius: 10,
        color: theme.palette.text.secondary,
        cursor: 'pointer',
        '&:hover': {
            background: theme.palette.action.hover,
        },
    },
    activeTile: {
        cursor: 'default',
        color: theme.palette.common.white,
        background: theme.palette.primary.main,
        '&:hover': {
            background: theme.palette.primary.main,
        },
    },
    [theme.breakpoints.down('sm')]: {
        sideBar: {
            display: 'none',
        },
    },
}));

export const AppNav = (props: {
    routeKey: RouteKey;
    children: ReactElement;
    overflow?: boolean;
}): ReactElement => {
    const classes = useStyles();
    const { children, routeKey, overflow = false } = props;
    const history = useHistory();

    const makeTile = (
        tileRouteKey: RouteKey,
        route: IRouteProps
    ): ReactElement => {
        return (
            <Tooltip
                key={tileRouteKey}
                arrow
                placement="right"
                title={route.displayName}
                TransitionProps={{ timeout: 600 }}
            >
                <div
                    onClick={() => history.push(route.path)}
                    className={clsx(classes.tile, {
                        [classes.activeTile]: tileRouteKey === routeKey,
                    })}
                >
                    {route.icon ? route.icon : ''}
                </div>
            </Tooltip>
        );
    };

    const makeTiles = (): ReactElement[] => {
        const componentArray: ReactElement[] = [];
        for (const keyedRoute of privateRoutes) {
            for (const [key, value] of Object.entries(keyedRoute)) {
                if (value.icon)
                    componentArray.push(makeTile(key as RouteKey, value));
            }
        }
        return componentArray;
    };

    return (
        <div className={classes.root}>
            <div className={classes.sideBar}>{makeTiles()}</div>
            <div
                className={clsx(classes.wrap, { [classes.overflow]: overflow })}
            >
                {children}
            </div>
        </div>
    );
};
