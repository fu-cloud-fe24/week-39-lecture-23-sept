import { hashPassword } from '../utils/bcrypt.mjs';
import { client } from './client.mjs';
import { PutItemCommand, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

export const addUser = async (user) => {
    console.log(user);
    const command = new PutItemCommand({
        TableName : 'bonzai-table',
        Item : {
            PK : { S : `USER#${user.username}` },
            SK : { S : 'PROFILE' },
            attributes: {
                M: {
                    username: { S: user.username },
                    password: { S: await hashPassword(user.password) },
                    email: { S: user.email },
                    role: { S: user.role }
                }
            }
        }
    });

    try {
        await client.send(command);
        return true;
    } catch(error) {
        console.log('ERROR in db:', error.message);
        return false;
    }
}

export const getUser = async (username) => {
    const command = new GetItemCommand({
        TableName: 'bonzai-table',
        Key: {
            PK: { S: `USER#${username}` },
            SK: { S: 'PROFILE' }
        }
    });

    try {
        const { Item } = await client.send(command);
        if(!Item) return false;

        const user = unmarshall(Item);
        return user;
    } catch(error) {
        console.log('ERROR in db:', error.message);
        return false;
    }
}