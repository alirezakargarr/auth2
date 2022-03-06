const Schema = require('validate');
const _ = require('lodash');
const log = require('../utils/log.utility');
// const toString = require('../utils/to-string.utility');
const Exception = require('../utils/error.utility');


class Validate {
  constructor() {
    this.fields = {
      username: {
        type: String,
      },
      password: {
        type: String,
      },
      service: {
        type: String
      },
    };
    this.errorMessages = {
      required: () => 'ERROR_MESSAGE_REQUIRED',
      validation: () => 'ERROR_MESSAGE_INVALID',
      type: () => 'ERROR_MESSAGE_WRONG_TYPE',
      length: () => 'ERROR_MESSAGE_INVALID_LENGTH',
    };
    this.headerErrorMessages = {
      required: () => 'ERROR_MESSAGE_HEADER_REQUIRED',
      validation: () => 'ERROR_MESSAGE_INVALID',
      type: () => 'ERROR_MESSAGE_WRONG_TYPE',
      length: () => 'ERROR_MESSAGE_INVALID_LENGTH',
    };
  }

  login(items, throwErrors = true) {
    const schema = new Schema({
      username: _.assign({},
          this.fields.username, {
            required: true
          },
      ),
      password: _.assign({},
          this.fields.password, {
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
    // console.log('--------errs------>', errs);
    // console.log('--------throwErrors------>', throwErrors);
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
