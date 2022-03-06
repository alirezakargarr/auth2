const Schema = require('validate');
const _ = require('lodash');
const log = require('../utils/log.utility');
// const toString = require('../utils/to-string.utility');
const Exception = require('../utils/error.utility');


class Validate {
  constructor() {
    this.fields = {
      auth_token: {
        type: String,
      },
      email: {
        type: String,
      },
      phone_number: {
        type: String,
      },
      password: {
        type: String,
      },
      code: {
        type: String,
      },
      username: {
        type: String,
      },
      last_password: {
        type: String,
      },
      service: {
        type: String,
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

  email(items, throwErrors = true) {
    const schema = new Schema({
      email: _.assign({},
          this.fields.email, {
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

  phone(items, throwErrors = true) {
    const schema = new Schema({
      phone_number: _.assign({},
          this.fields.phone_number, {
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

  recover(items, throwErrors = true) {
    const schema = new Schema({
      code: _.assign({},
          this.fields.code, {
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

  admin_login(items, throwErrors = true) {
    const schema = new Schema({
      code: _.assign({},
          this.fields.code, {
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

  last_password(items, throwErrors = true) {
    const schema = new Schema({
      username: _.assign({},
          this.fields.username, {
            required: true
          },
      ),
      last_password: _.assign({},
          this.fields.last_password, {
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

  last_password_header(items, throwErrors = true) {
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

  answers_header(items, throwErrors = true) {
    const schema = new Schema({
      service: _.assign({},
          this.fields.service, {
            required: true
          },
      ),
      auth_token: _.assign({},
          this.fields.auth_token, {
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

  security_answers_header(items, throwErrors = true) {
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
