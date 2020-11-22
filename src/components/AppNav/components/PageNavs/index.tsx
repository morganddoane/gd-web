import {
    Tab,
    TabProps,
    Tabs,
    TabsProps,
    useMediaQuery,
    useTheme,
    withStyles,
} from '@material-ui/core';
import React, { ReactElement } from 'react';

const CustomTabs = withStyles((theme) => ({
    root: {
        paddingTop: 12,
    },
    [theme.breakpoints.up('md')]: {
        indicator: {
            display: 'flex',
            justifyContent: 'left',
            backgroundColor: 'transparent',
            height: 4,
            '& > span': {
                width: '100%',
                backgroundColor: theme.palette.primary.main,
            },
        },
    },
}))((props: TabsProps) => (
    <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />
));

const CustomTab = withStyles((theme) => ({
    [theme.breakpoints.up('md')]: {
        wrapper: {
            alignItems: 'flex-start',
        },
        root: {
            minWidth: '24px',
            padding: '0px',
            textTransform: 'none',
            fontSize: theme.typography.pxToRem(18),
            fontWeight: 400,
            marginRight: theme.spacing(4),
        },
    },
}))((props: TabProps) => <Tab disableRipple {...props} />);

export const PageNavs = (props: {
    children: string[];
    active: string;
    onClick: (nav: string) => void;
}): ReactElement => {
    const { children, onClick, active } = props;
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (!children.includes(active))
        throw new Error('Active tab is not found in values!');

    const index = children.indexOf(active);

    const tabClick = (index: number) => {
        onClick(children[index]);
    };

    return (
        <CustomTabs
            value={index}
            indicatorColor="primary"
            textColor="primary"
            aria-label="disabled tabs example"
            variant={mobile ? 'fullWidth' : undefined}
        >
            {children.map((n, i) => (
                <CustomTab
                    onClick={() => tabClick(i)}
                    key={`tab[${i}]${n}`}
                    label={n}
                />
            ))}
        </CustomTabs>
    );
};
