import Joi from '@hapi/joi';

// import BaseSchema from './baseSchema';

export default class CommentSchema {
  static postComment() {
    return Joi.object({
      comment: Joi.string().required(),
    });
  }

  static singleSupportRequestSchema() {
    return Joi.object({
      supportRequestId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    });
  }
}
