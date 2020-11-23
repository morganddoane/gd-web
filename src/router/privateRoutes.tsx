import React, { ReactElement } from 'react';
import { IconBaseProps } from 'react-icons';
import { MdEvent, MdLocalShipping } from 'react-icons/md';
import { Events } from 'scenes/Events';
import { Shipments } from 'scenes/Shipments';

export enum RouteKey {
    Events = 'Events',
    EventDetail = 'EventDetail',
    Shipments = 'Shipments',
    ShipmentDetail = 'ShipmentDetail',
}

export interface IRouteProps {
    displayName: string;
    path: string;
    component: () => ReactElement;
    icon?: IconBaseProps;
    exact?: boolean;
    parentKey?: RouteKey;
    subRoutes?: KeyedRoute[];
}

export type KeyedRoute = Record<RouteKey, IRouteProps>;

export const privateRoutes: KeyedRoute[] = [
    {
        [RouteKey.Events]: {
            displayName: 'Events',
            path: '/events',
            icon: <MdEvent />,
            component: Events,
            exact: true,
        },
        [RouteKey.EventDetail]: {
            displayName: 'Event Detail',
            path: '/events/:id',
            component: Events,
            exact: true,
        },
        [RouteKey.Shipments]: {
            displayName: 'Shipping',
            path: '/shipping',
            icon: <MdLocalShipping />,
            component: Shipments,
            exact: true,
        },
        [RouteKey.ShipmentDetail]: {
            displayName: 'Shipment Detail',
            path: '/shipping/:id',
            component: Shipments,
            exact: true,
        },
    },
];
