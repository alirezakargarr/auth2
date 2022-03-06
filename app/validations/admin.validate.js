const Schema = require('validate');
const _ = require('lodash');
const log = require('../utils/log.utility');
// const toString = require('../utils/to-string.utility');
const Exception = require('../utils/error.utility');


class Validate {
  constructor() {
    this.fields = {
      service: {
        type: String,
      },
      role: {
        type: String,
      },
      username: {
        type: String,
      },
      phone_number: {
        type: String,
      },
    };
    this.errorMessages = {
      required: () => 'ERROR_MESSAGE_REQUIRED',
      validation: () => 'ERROR_MESSAGE_INVALID',
      type: () => 'ERROR_MESSAGE_WRONG_TYPE',
      length: () => 'ERROR_MESSAGE_INVALID_LENGTH_8-48',
    };
    this.headerErrorMessages = {
      required: () => 'ERROR_MESSAGE_HEADER_REQUIRED',
      validation: () => 'ERROR_MESSAGE_INVALID',
      type: () => 'ERROR_MESSAGE_WRONG_TYPE',
      length: () => 'ERROR_MESSAGE_INVALID_LENGTH',
    };
  }

  header(items, throwErrors = true) {
    const schema = new Schema({
      service: _.assign({},
          this.fields.service, {
            required: true
          },
      ),
    });


    schema.message(this.headerErrorMessages);

    return this.constructor.sanitizeErrors(
        schema.validate(_.assign({}, items)),
        throwErrors,
    );
  }

  register(items, throwErrors = true) {
    const schema = new Schema({
      service: _.assign({},
          this.fields.service, {
            required: true
          },
      ),
      phone_number: _.assign({},
          this.fields.phone_number, {
            required: true
          },
      ),
      username: _.assign({},
          this.fields.username, {
            required: true
          },
      ),
      user_service_role: _.assign({},
          this.fields.user_service_role, {
            required: true
          },
      ),
    });


    schema.message(this.errorMessages);

    return this.constructor.sanitizeErrors(
        schema.validate(_.assign({}, items)),
        throwErrors,
    );
  }

  static sanitizeErrors(errors, throwErrors) {

    const errs = _.map(
        errors,
        error => ({
          [error.path]: error.message
        }),
    );
    if (_.size(errs)) {
      log.error(`Validation failed, ${toString(errs)}`);

      if (throwErrors) {
        throw Exception.setError(JSON.stringify(errs), throwErrors);
      }
    }
    return errs;
  }
}

module.exports = new Validate();
