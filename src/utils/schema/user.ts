import Joi from '@hapi/joi';

import BaseSchema from './base.schema';

export default class UserSchema {
  static signupSchema() {
    return Joi.object({
      name: Joi.string().required(),
      email: BaseSchema.email().required(),
      password: Joi.string().min(5).required(),
    });
  }

  // static loginSchema() {
  //   return Joi.object({
  //     email: BaseSchema.email().required(),
  //     password: Joi.string().required(),
  //   });
  // }
}
