import { gql } from '@apollo/client';

export const QEventDetail = gql`
    query($eventId: String!) {
        attendees(eventId: $eventId) {
            id
            created
            changed
            ticket_class_id
            variant_id
            ticket_class_name
            quantity
            costs {
                tax {
                    value
                    display
                    major_value
                    currency
                }
                gross {
                    value
                    display
                    major_value
                    currency
                }
            }
            profile {
                name
                email
                first_name
                last_name
                prefix
                suffix
                age
                job_title
                company
                website
                blog
                gender
                birth_date
                cell_phone
                addresses {
                    home {
                        address_1
                        address_2
                        city
                        region
                        postal_code
                        country
                        latitude
                        longitude
                        localized_area_display
                        localized_address_display
                        localized_multi_line_address_display
                    }
                    ship {
                        address_1
                        address_2
                        city
                        region
                        postal_code
                        country
                        latitude
                        longitude
                        localized_area_display
                        localized_address_display
                        localized_multi_line_address_display
                    }
                    work {
                        address_1
                        address_2
                        city
                        region
                        postal_code
                        country
                        latitude
                        longitude
                        localized_area_display
                        localized_address_display
                        localized_multi_line_address_display
                    }
                }
            }

            checked_in
            cancelled
            refunded
            status
            event_id
            order_id
            guestlist_id
            invited_by
            delivery_method
            note
        }
    }
`;

export interface IEventDetail_Args {
    eventId: string;
}

export interface IEventDetail_Response {
    attendees: IEventDetail_Attendee[];
}

interface ICost {
    value: number;
    display: string;
    major_value: string;
    currency: string;
}

export interface IAddress {
    address_1?: string;
    address_2?: string;
    city?: string;
    region?: string;
    postal_code?: string;
    country?: string;
    latitude?: string;
    longitude?: string;
    localized_area_display?: string;
    localized_address_display?: string;
    localized_multi_line_address_display?: string[];
}

export interface IEventDetail_Attendee {
    id: string;
    created: Date;
    changed: Date;
    ticket_class_id: string;
    variant_id: string;
    ticket_class_name: string;
    quantity: number;
    costs: {
        tax: ICost;
        gross: ICost;
    };
    profile: {
        name: string;
        email: string;
        first_name: string;
        last_name: string;
        prefix?: string;
        suffix?: string;
        age?: string;
        job_title?: string;
        company?: string;
        website?: string;
        blog?: string;
        gender?: string;
        birth_date?: string;
        cell_phone?: string;
        addresses: {
            home?: IAddress;
            ship?: IAddress;
            work?: IAddress;
        };
    };
    checked_in: boolean;
    cancelled: boolean;
    refunded: boolean;
    status: string;
    event_id: string;
    order_id: string;
    guestlist_id: string;
    invited_by: string;
    delivery_method: string;
    note: string;
}
