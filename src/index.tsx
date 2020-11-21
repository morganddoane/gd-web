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
} from '@apollo/client';

import { onError } from '@apollo/client/link/error';
import AppDataProvider from 'providers/AppDataProvider';

const link = createHttpLink({
    uri: env.API_URL,
    credentials: 'include',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([errorLink, link]),
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
