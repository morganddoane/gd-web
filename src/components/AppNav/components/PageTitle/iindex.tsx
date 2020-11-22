import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    title: {
        margin: 0,
        padding: 0,
        fontWeight: 500,
        fontSize: 32,
    },
}));

export const PageTitle = (props: { children: string }): ReactElement => {
    const classes = useStyles();
    return <p className={classes.title}>{props.children}</p>;
};
