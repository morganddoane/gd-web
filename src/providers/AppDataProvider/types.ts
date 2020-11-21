import { UserContext } from './userContext';

export interface ISnackbar {
    message: string;
    severity: 'error' | 'warning' | 'info' | 'success';
    duration: number;
    open: boolean;
}

export enum AppActionType {
    SetUser,
    SetLoading,
    SetError,
    SetComplete,
    SetSnackbar,
}

export interface IAction {
    type: AppActionType;
    payload?: unknown;
}

export interface IActionSetUser extends IAction {
    payload: UserContext;
}

export interface IActionSetError extends IAction {
    payload: Error;
}

export interface IActionSetSnackbar extends IAction {
    payload: ISnackbar;
}

export interface IAppState {
    user: UserContext | null;
    loading: boolean;
    error: boolean;
    complete: boolean;
    snackbar: ISnackbar;
    exception?: Error;
}

export interface IContextState extends IAppState {
    setUser: (user: UserContext) => void;
    setSnackbar: (data: ISnackbar) => void;
    logoutUser: () => void;
}
