import React, { ReactElement } from 'react';
import { UserContext } from './userContext';

import {
    IAppState,
    IAction,
    AppActionType,
    IActionSetUser,
    IActionSetError,
    IContextState,
    IActionSetSnackbar,
    ISnackbar,
} from './types';
import useCookies from 'react-cookie/es6/useCookies';

const reducer = (state: IAppState, action: IAction): IAppState => {
    switch (action.type) {
        case AppActionType.SetUser:
            return {
                ...state,
                loading: false,
                complete: true,
                user: (action as IActionSetUser).payload,
            };
        case AppActionType.SetLoading:
            return {
                ...state,
                loading: true,
            };
        case AppActionType.SetError:
            return {
                ...state,
                complete: true,
                error: true,
                exception: (action as IActionSetError).payload,
            };
        case AppActionType.SetComplete:
            return {
                ...state,
                loading: false,
                complete: true,
            };
        case AppActionType.SetSnackbar:
            return {
                ...state,
                loading: false,
                complete: true,
                snackbar: (action as IActionSetSnackbar).payload,
            };
        default:
            return state;
    }
};

const initState: IAppState = {
    user: null,
    loading: true,
    error: false,
    complete: false,
    snackbar: {
        message: '',
        duration: 0,
        open: false,
        severity: 'success',
    },
};

export const AppDataContext = React.createContext<IContextState>({
    ...initState,
    setUser: (user: UserContext) => null,
    logoutUser: () => null,
    setSnackbar: (data: ISnackbar) => null,
});

const AppDataProvider = (props: { children: ReactElement }): ReactElement => {
    const { children } = props;
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [state, dispatch] = React.useReducer(reducer, initState);

    const logoutUser = (): void => {
        removeCookie('token');
        window.location.reload();
    };

    const setUser = (data: UserContext): void => {
        dispatch({
            type: AppActionType.SetUser,
            payload: data,
        });
    };

    const setSnackbar = (data: ISnackbar): void => {
        dispatch({
            type: AppActionType.SetSnackbar,
            payload: data,
        });
    };

    const user = cookies.user as UserContext;

    React.useEffect(() => {
        if (user) setUser(user);
    }, [user]);

    return (
        <AppDataContext.Provider
            value={{ ...state, setUser, logoutUser, setSnackbar }}
        >
            {children}
        </AppDataContext.Provider>
    );
};

export const useAppDataProvider = (): IContextState =>
    React.useContext(AppDataContext);

export default AppDataProvider;
