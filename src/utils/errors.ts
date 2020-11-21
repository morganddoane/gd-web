import { ApolloError } from '@apollo/client';

export enum ApolloErrorType {
    Unauthenticated = 'UNAUTHENTICATED',
    Forbidden = 'FORBIDDEN',
    BadUserInput = 'BAD_USER_INPUT',
}

export const isUnauthenticatedError = (error: ApolloError): boolean => {
    return (
        error.graphQLErrors.length > 0 &&
        (error.graphQLErrors[0].extensions as { code: ApolloErrorType })
            .code === ApolloErrorType.Unauthenticated
    );
};
