import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { sendResponse } from '../../../responses/index.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { authenticateUser } from '../../../middlewares/authenticateUser.mjs';
import { authorizeRole } from '../../../middlewares/authorizeRole.mjs';
import { validateBooking } from '../../../middlewares/validateBooking.mjs';
import { addBooking, getConfirmedBookings } from '../../../services/bookings.mjs';
import { getRoomCount } from '../../../utils/index.mjs';

export const handler = middy(async (event) => {
    const confirmed = await getConfirmedBookings();
    let confirmedRooms = 0;
    confirmed.forEach(booking => {
        confirmedRooms += getRoomCount(booking.attributes.rooms);
    })
    if((confirmedRooms + getRoomCount(event.body.rooms)) <= 20) {
        const response = await addBooking(event.user.username, event.body, event.pathParameters.id);
        if(response) {
            return sendResponse(200, { message : 'Your booking has been successfully updated', booking : response });
        } else {
            return sendResponse(404, { message : 'Your update was unsuccessful' });
        }
    } else {
        return sendResponse(404, { message : 'Your update was unsuccessful due to shortage of rooms' });
    }
}).use(httpJsonBodyParser())
    .use(authenticateUser())
    .use(authorizeRole(['GUEST']))
    .use(validateBooking())
    .use(errorHandler());
