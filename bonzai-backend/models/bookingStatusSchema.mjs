import Joi from 'joi';

export const bookingStatusSchema = Joi.object({
    status : Joi.string().valid('CANCELLED', 'CONFIRMED').required()
});