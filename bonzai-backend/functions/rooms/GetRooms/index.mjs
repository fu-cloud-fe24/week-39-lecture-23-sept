import middy from '@middy/core';
import { sendResponse } from '../../../responses/index.mjs';
import { getRooms } from '../../../services/rooms.mjs';


export const handler = middy(async (event) => {
    const response = await getRooms();
    if(response) {
        return sendResponse(200, { rooms : response });
    } else {
        return sendResponse(404, { message : 'No rooms found!' });
    }
});
