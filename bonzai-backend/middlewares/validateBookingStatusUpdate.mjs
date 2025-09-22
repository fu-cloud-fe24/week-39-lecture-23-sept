import { bookingStatusSchema } from "../models/bookingStatusSchema.mjs";


export const validateBookingStatusUpdate = () => ({
    before: (handler) => {
        if (!handler.event.body) throw new Error('No body provided');

        const { error, value } = bookingStatusSchema.validate(handler.event.body);
        if (error) throw new Error(error.details[0].message);

        return;
    }
});