import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { env } from 'config';

import {
    ApolloLink,
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
    HttpLink,
    from,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

import { onError } from '@apollo/client/link/error';
import AppDataProvider from 'providers/AppDataProvider';

const link = createHttpLink({
    uri: env.API_URL,
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? token : '',
        },
    };
});

const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
        if (graphQLErrors) {
            for (const err of graphQLErrors) {
                if (err && err.extensions)
                    switch (err.extensions.code) {
                        case 'UNAUTHENTICATED':
                            localStorage.clear();
                            location.reload();
                    }
            }
        }
        if (networkError) {
            console.log(`[Network error]: ${networkError}`);
        }
    }
);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([authLink, errorLink, link]),
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <AppDataProvider>
                <App />
            </AppDataProvider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
