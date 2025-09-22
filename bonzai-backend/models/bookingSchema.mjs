import Joi from 'joi';

export const bookingSchema = Joi.object({
    rooms : Joi.array()
        .items(
            Joi.object({
                type : Joi.string()
                    .valid('SINGLE', 'DOUBLE', 'SUITE')
                    .required(),
                count : Joi.number()
                    .integer()
                    .min(1)
                    .required()
            })
        ).min(1).required(),
    guests : Joi.number().integer().min(1).required(),
    specialRequest : Joi.string().max(500).optional()    
});