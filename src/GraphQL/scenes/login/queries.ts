import { gql } from '@apollo/client';

export const QLogin = gql`
    mutation($method: String!, $password: String!) {
        loginUser(method: $method, password: $password) {
            token
            user {
                id
                username
                firstName
                lastName
                fullName
                admin
                email
            }
            expiration
        }
    }
`;

export interface IQLogin_Response {
    loginUser: {
        token: string;
        user: {
            id: string;
            username: string;
            firstName: string;
            lastName: string;
            fullName: string;
            admin: boolean;
            email: string;
        };
        expiration: number;
    };
}

export interface IQLogin_Variables {
    method: string;
    password: string;
}
