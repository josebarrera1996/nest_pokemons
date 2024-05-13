import * as Joi from 'joi';

// Validando las variables de entorno
export const JoiValidationSchema = Joi.object({
    // Validaciones 
    MONGO_URI: Joi.required(),
    PORT: Joi.number().default(3000),
    DEFAULT_LIMIT: Joi.number().default(7)
});