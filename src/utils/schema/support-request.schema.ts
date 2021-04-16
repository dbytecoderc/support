import Joi from '@hapi/joi';

// import BaseSchema from './base.schema';

export default class SupportRequestSchema {
  static createSupportRequestSchema() {
    return Joi.object({
      description: Joi.string().required(),
    });
  }

  // static supportRequestStatusSchema() {
  //   return Joi.object({
  //     status: BaseSchema.stringSchema().uppercase().valid('CLOSED').required(),
  //   });
  // }

  static singleSupportRequestSchema() {
    return Joi.object({
      id: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    });
  }
}
