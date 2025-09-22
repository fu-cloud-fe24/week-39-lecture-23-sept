import { client } from './client.mjs';
import { PutItemCommand, QueryCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { generateId } from '../utils/uuid.mjs';

export const addBooking = async (username, booking, bookingId = null) => {
    if(!bookingId) {
        bookingId = generateId(4);
    }

    const command = new PutItemCommand({
        TableName: 'bonzai-table',
        Item: {
            PK: { S: `USER#${username}` },
            SK: { S: `BOOKING#${bookingId}` },
            GSI1PK: { S: 'BOOKING' },
            GSI1SK: { S: `${bookingId}` },
            attributes: {
                M: {
                    status : { S : 'CONFIRMED' },
                    rooms: {
                        L: booking.rooms.map(r => ({
                            M: {
                                type: { S: r.type },
                                count: { N: r.count.toString() }
                            }
                        }))
                    },
                    guests: { N: booking.guests.toString() },
                    specialRequest: { S: booking.specialRequest || '' },
                }
            }
        }
    });
    try {
        const response = await client.send(command);
        console.log('RESPONSE', response);
        
        return {
            bookingId : bookingId,
            guestName : username,
            rooms : booking.rooms,
            guests : booking.guests,
            specialRequest : booking.specialRequest || null
        };
    } catch(error) {
        console.log('ERROR in db:', error.message);
        return false;
    }
}

const queryBooking = async (bookingId) => {
    const command = new QueryCommand({
        TableName: "bonzai-table",
        IndexName: "GSI1",
        KeyConditionExpression: "GSI1PK = :pk AND GSI1SK = :sk",
        ExpressionAttributeValues: {
            ":pk": { S: "BOOKING" },
            ":sk": { S: bookingId }
        }
    });

    try {   
        const result = await client.send(command);
        if (!result.Items || result.Items.length === 0) {
            throw new Error("Booking not found");
        }
        console.log('RESULT:', result);
        return result.Items[0];
    } catch(error) {
        console.log('ERROR in db:', error.message);
        return null;
    }
}

export const updateBookingStatus = async (bookingId, status) => {
    const booking = await queryBooking(bookingId);
    const pk = booking.PK.S;
    const sk = booking.SK.S;

    const command = new UpdateItemCommand({
        TableName : 'bonzai-table',
        Key : {
            PK : { S : pk },
            SK : { S : sk }
        },
        UpdateExpression : 'SET attributes.#status = :status',
        ExpressionAttributeNames : {
            '#status' : 'status'
        },
        ExpressionAttributeValues : {
            ':status' : { S : status }
        },
        ReturnValues : 'ALL_NEW'
    });

    try {
        const { Attributes } = await client.send(command);
        return unmarshall(Attributes);
    } catch(error) {
        console.log('ERROR in db:', error.message);
        return null;
    }
}

export const queryBookingByStatus = async (status) => {
    const command = new QueryCommand({
        TableName: 'bonzai-table',
        IndexName: 'GSI1',
        KeyConditionExpression: 'GSI1PK = :gsi1pk',
        FilterExpression: 'attributes.#st = :status',
        ExpressionAttributeNames: { '#st': 'status' },
        ExpressionAttributeValues: {
            ':gsi1pk': { S: 'BOOKING' },
            ':status': { S: status }
        }
    });

    try {
        const { Items } = await client.send(command);
        const bookings = Items.map(item => unmarshall(item));
        return bookings;
    } catch (error) {
        console.error('Error fetching confirmed bookings:', error.message);
        return [];
    }
};
export const queryBookingsByUser = async (username) => {
    const command = new QueryCommand({
        TableName: 'bonzai-table',
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        ExpressionAttributeValues: {
            ':pk': { S: `USER#${username}` },
            ':sk': { S: 'BOOKING' }
        }
    });

    try {
        const { Items } = await client.send(command);
        const bookings = Items.map(item => unmarshall(item));
        return bookings;
    } catch (error) {
        console.error('Error fetching confirmed bookings:', error.message);
        return [];
    }
};

export const getAllBookings = async (status) => {
    const command = new QueryCommand({
        TableName: 'bonzai-table',
        IndexName: 'GSI1',
        KeyConditionExpression: 'GSI1PK = :gsi1pk',
        ExpressionAttributeValues: {
            ':gsi1pk': { S: 'BOOKING' }
        }
    });

    try {
        const { Items } = await client.send(command);
        const bookings = Items.map(item => unmarshall(item));
        return bookings;
    } catch (error) {
        console.error('Error fetching confirmed bookings:', error.message);
        return [];
    }
};