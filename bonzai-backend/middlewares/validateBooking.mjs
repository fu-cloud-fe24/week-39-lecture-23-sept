import { bookingSchema } from "../models/bookingSchema.mjs";
const ROOM_CAPACITY = {
    SINGLE: 1,
    DOUBLE: 2,
    SUITE: 3
};

export const validateBooking = () => ({
    before: (handler) => {
        if (!handler.event.body) throw new Error('No body provided');

        const { error, value } = bookingSchema.validate(handler.event.body);
        if (error) throw new Error(error.details[0].message);

        const totalGuests = value.guests;
        const rooms = value.rooms;

        const totalCapacity = rooms.reduce((sum, room) => {
            const cap = ROOM_CAPACITY[room.type.toUpperCase()];
            if (!cap) throw new Error(`Unknown room type: ${room.type}`);
            return sum + (cap * room.count);
        }, 0);

        if (totalGuests > totalCapacity) {
            throw new Error(`Rooms booked cannot accommodate ${totalGuests} guests. Total capacity: ${totalCapacity}`);
        }

        return;
    }
});