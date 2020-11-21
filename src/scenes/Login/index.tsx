import React, { ReactElement } from 'react';
import { Button, Fade, Grow, makeStyles, TextField } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import {
    IQLogin_Response,
    IQLogin_Variables,
    QLogin,
} from 'GraphQL/scenes/login/queries';
import { useAppDataProvider } from 'providers/AppDataProvider';
import useCookies from 'react-cookie/es6/useCookies';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.background.default,
    },
    card: {
        width: 420,
        background: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
        padding: 32,
        borderRadius: 4,
        textAlign: 'center',
    },
    subText: {
        marginTop: 16,
    },
    cardElement: {
        '&:first-child': {
            marginTop: 72,
        },
        marginTop: 32,
    },
    cardButton: {
        marginTop: 48,
        marginBottom: 48,
    },
    [theme.breakpoints.down('xs')]: {
        card: {
            height: '100%',
            width: '100%',
        },
        cardWrap: {
            padding: 24,
        },
    },
}));

export const Login = (): ReactElement => {
    const classes = useStyles();

    const { setSnackbar } = useAppDataProvider();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const history = useHistory();

    const [formState, setFormState] = React.useState<{
        open: boolean;
        method: string;
        password: string;
    }>({ open: false, method: '', password: '' });

    const [attemptLogin, { data, error, loading }] = useMutation<
        IQLogin_Response,
        IQLogin_Variables
    >(QLogin, {
        variables: {
            method: formState.method,
            password: formState.password,
        },
        onCompleted: (data: IQLogin_Response) => {
            setCookie('user', data.loginUser.user, {
                expires: new Date(data.loginUser.expiration * 1000),
            });
            setCookie('token', data.loginUser.token, { httpOnly: true });
            history.push('/', {
                state: {
                    from: '/login',
                },
            });
        },
        onError: (data) => {
            setSnackbar({
                open: true,
                duration: 3000,
                severity: 'error',
                message: data.message,
            });
        },
    });

    return (
        <div className={classes.root}>
            <Grow
                in
                timeout={500}
                onEntered={() => setFormState({ ...formState, open: true })}
            >
                <div className={classes.card}>
                    <div className={classes.cardWrap}>
                        <Typography variant="h3">Welcome</Typography>
                        <Typography
                            variant="h6"
                            color="textSecondary"
                            className={classes.subText}
                        >
                            Log in to get started
                        </Typography>
                        <Fade in={formState.open}>
                            <div>
                                <TextField
                                    className={classes.cardElement}
                                    variant="outlined"
                                    label="Username or email"
                                    fullWidth
                                    value={formState.method}
                                    onChange={(e) => {
                                        setFormState({
                                            ...formState,
                                            method: e.target.value,
                                        });
                                    }}
                                ></TextField>
                                <TextField
                                    className={classes.cardElement}
                                    variant="outlined"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    value={formState.password}
                                    onChange={(e) => {
                                        setFormState({
                                            ...formState,
                                            password: e.target.value,
                                        });
                                    }}
                                ></TextField>
                                <Button
                                    className={classes.cardButton}
                                    color="primary"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    onClick={() => attemptLogin()}
                                >
                                    {"Let's go!"}
                                </Button>
                            </div>
                        </Fade>
                    </div>
                </div>
            </Grow>
        </div>
    );
};
