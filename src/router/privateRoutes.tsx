import { ReactElement } from 'react';
import { IconType } from 'react-icons';
import { MdEvent } from 'react-icons/md';
import { Events } from 'scenes/Events';

export enum RouteKey {
    Events,
    EventDetail,
}

export interface IRouteProps {
    path: string;
    component: () => ReactElement;
    icon?: IconType;
    exact?: boolean;
    subRoutes?: KeyedRoute[];
}

type KeyedRoute = Record<RouteKey, IRouteProps>;

export const privateRoutes: KeyedRoute[] = [
    {
        [RouteKey.Events]: {
            path: '/events',
            icon: MdEvent,
            component: Events,
        },
        [RouteKey.EventDetail]: {
            path: '/events/:hbsjhbsdc',
            icon: MdEvent,
            component: Events,
        },
    },
];

// const flattenRoutes = (): IRouteProps[] => {
//     const flat: IRouteProps[] = [];

//     const flattenRoute = (route: IRouteProps): void => {
//         const copy = { ...route };

//         if (copy.subRoutes) {
//             for (const s of copy.subRoutes) {
//                 flattenRoute(s);
//             }
//         }
//         delete copy.subRoutes;
//         flat.push(copy);
//     };

//     for (const r of priateRoutes) {
//         flattenRoute(r);
//     }

//     return flat;
// };
