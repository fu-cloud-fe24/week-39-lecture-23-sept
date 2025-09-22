import { client } from './client.mjs';
import { QueryCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

export const getRooms = async () => {

    const command = new QueryCommand({
        TableName : 'bonzai-table',
        KeyConditionExpression : 'PK = :pk',
        ExpressionAttributeValues : {
            ':pk' : { S : 'ROOMTYPE' }
        }
    });

    try {
        const { Items } = await client.send(command);
        const rooms = Items.map(item => unmarshall(item));
        return rooms;
    } catch(error) {
        console.log('ERROR in db:', error.message);
        return false;
    }
}