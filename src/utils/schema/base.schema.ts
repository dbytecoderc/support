const Joi = require('@hapi/joi');

export default class BaseSchema {
  static stringSchema() {
    return Joi.string().trim();
  }

  static email() {
    return this.stringSchema().email({
      multiple: false,
    });
  }
}
