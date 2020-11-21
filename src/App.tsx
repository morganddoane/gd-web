import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { GlobalSnackbar } from 'components/GlobalSnackbar';
import React, { ReactElement } from 'react';
import { AppRouter } from 'router';

function App(): ReactElement {
    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    primary: {
                        main: '#007BFF',
                    },
                    background: {
                        default: '#E9ECEF',
                    },
                },
            }),
        []
    );

    return (
        <ThemeProvider theme={theme}>
            <GlobalSnackbar>
                <AppRouter />
            </GlobalSnackbar>
        </ThemeProvider>
    );
}

export default App;
