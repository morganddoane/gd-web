import { gql } from '@apollo/client';

export const QEvents = gql`
    query {
        events {
            id
            name {
                text
            }
            summary
            description {
                text
            }
            url
            start {
                timezone
                utc
                local
            }
            created
            status
        }
    }
`;

export interface IEvents_Event {
    id: string;
    name: {
        text: string;
    };
    summary: string;
    description: {
        text: string;
    };
    url: string;
    start: {
        timezone: string;
        utc: Date;
        local: Date;
    };
    created: string;
    status: string;
}

export interface IEvents_Response {
    events: IEvents_Event[];
}
