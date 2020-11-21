import { makeStyles, Snackbar } from '@material-ui/core';
import { useAppDataProvider } from 'providers/AppDataProvider';
import React, { ReactElement } from 'react';

import { AlertProps } from '@material-ui/lab';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props: AlertProps): ReactElement => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export const GlobalSnackbar = (props: {
    children: ReactElement | ReactElement[];
}): ReactElement => {
    const { children } = props;
    const { snackbar, setSnackbar } = useAppDataProvider();
    const classes = useStyles();

    const handleClose = (): void => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <div className={classes.root}>
            {children}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={snackbar.duration}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};
