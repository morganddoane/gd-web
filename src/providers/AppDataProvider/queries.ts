import { gql } from '@apollo/client';
import { IUserContextInput } from './userContext';

/*
 *   Logged In User Query
 */

export const LoggedInUserQuery = gql`
    query {
        loggedInUser {
            id
            username
            firstName
            lastName
            fullName
            admin
            email
        }
    }
`;

export interface ILoggedInUserQueryType {
    loggedInUser: { user: IUserContextInput };
}
