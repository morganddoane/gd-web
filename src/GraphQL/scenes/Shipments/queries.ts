import { gql } from '@apollo/client';

export const QShipments = gql`
    query {
        shipments {
            id
            attendee
            shipmentId
            status
        }
    }
`;

export interface IShipments_response {
    shipments: {
        id: string;
        attendee: string;
        shipmentId: string;
        status: string;
    }[];
}
