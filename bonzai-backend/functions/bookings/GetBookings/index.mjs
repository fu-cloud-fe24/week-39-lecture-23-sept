import middy from '@middy/core';
import { sendResponse } from '../../../responses/index.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { authenticateUser } from '../../../middlewares/authenticateUser.mjs';
import { authorizeRole } from '../../../middlewares/authorizeRole.mjs';
import { getAllBookings, queryBookingByStatus, queryBookingsByUser } from '../../../services/bookings.mjs';

export const handler = middy(async (event) => {
  const { role, username } = event.user;

  if(role === 'ADMIN') {
    if(!event.body) {
      const response = await getAllBookings();
      return sendResponse(200, { bookings : response });
    } else {
      const { status } = JSON.parse(event.body);
      if(!status) {
        const response = await getAllBookings();
        return sendResponse(200, { bookings : response });
      }
      const response = await queryBookingByStatus(status);
      return sendResponse(200, { bookings : response });
    }
  }

  if(role === 'GUEST') {
    const response = await queryBookingsByUser(username);
    return sendResponse(200, { bookings: response });
  }
}).use(authenticateUser())
  .use(authorizeRole(['ADMIN', 'GUEST']))
  .use(errorHandler());
