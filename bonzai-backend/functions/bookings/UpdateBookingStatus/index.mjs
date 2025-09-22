import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { sendResponse } from '../../../responses/index.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { validateBookingStatusUpdate } from '../../../middlewares/validateBookingStatusUpdate.mjs';
import { updateBookingStatus } from '../../../services/bookings.mjs';
import { authenticateUser } from '../../../middlewares/authenticateUser.mjs';
import { authorizeRole } from '../../../middlewares/authorizeRole.mjs';

export const handler = middy(async (event) => {
  const booking = await updateBookingStatus(event.pathParameters.id, event.body.status);
  if(booking) {
    return sendResponse(201, { message : 'Booking successfully updated', data : booking.attributes });
  } else {
    return sendResponse(400, { message : 'Booking not updated' });
  }
}).use(httpJsonBodyParser())
  .use(authenticateUser())
  .use(authorizeRole(['GUEST', 'ADMIN']))
  .use(validateBookingStatusUpdate())
  .use(errorHandler());
