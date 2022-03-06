const Schema = require('validate');
const _ = require('lodash');
const log = require('../utils/log.utility');
// const toString = require('../utils/to-string.utility');
const Exception = require('../utils/error.utility');


class Validate {
  constructor() {
    this.fields = {
      role: {
        type: String,
      },
      username: {
        type: String,
      },
      password: {
        type: String,
      },
      phone_number: {
        type: String,
      },
      user_information: {
        type: String,
      },
      company_information: {
        type: String,
      },
      real_or_legal: {
        type: String,
        enum: ['real', 'legal']
      },
      service: {
        type: String
      },
      email: {
        type: String
      }
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


  add(register, throwErrors = true) {
    const schema = new Schema({
      role: _.assign({},
          this.fields.role, {
            required: true
          },
      ),
      username: _.assign({},
          this.fields.username, {
            required: true
          },
      ),
      phone_number: _.assign({},
          this.fields.phone_number, {
            required: true
          },
      ),
      // email: _.assign({},
      //     this.fields.email, {
      //       required: true
      //     },
      // ),
      // real_or_legal: _.assign({},
      //     this.fields.email, {
      //       required: true
      //     },
      // ),
      // company_information: _.assign({},
      //     this.fields.company_information, {
      //       required: true
      //     },
      // ),
      // user_information: _.assign({},
      //     this.fields.user_information, {
      //       required: true
      //     },
      // ),
      password: _.assign({},
          this.fields.password, {
            required: true
          },
      ),
    });

    schema.message(this.errorMessages);

    return this.constructor.sanitizeErrors(
        schema.validate(_.assign({}, register)),
        throwErrors,
    );
  }

  header(header, throwErrors = true) {
    const schema = new Schema({
      service: _.assign({},
          this.fields.service, {
            required: true
          },
      ),
    });

    schema.message(this.headerErrorMessages);

    return this.constructor.sanitizeErrors(
        schema.validate(_.assign({}, header)),
        throwErrors,
    );
  }

  real_legal(header, throwErrors = true) {
    const schema = new Schema({
      real_or_legal: _.assign({},
          this.fields.real_or_legal, {
            required: true
          },
      ),
    });

    schema.message(this.errorMessages);

    return this.constructor.sanitizeErrors(
        schema.validate(_.assign({}, header)),
        throwErrors,
    );
  }

  real(header, throwErrors = true) {
    const schema = new Schema({
      user_information: _.assign({},
          this.fields.user_information, {
            required: true
          },
      ),
    });

    schema.message(this.errorMessages);

    return this.constructor.sanitizeErrors(
        schema.validate(_.assign({}, header)),
        throwErrors,
    );
  }

  legal(header, throwErrors = true) {
    const schema = new Schema({
      company_information: _.assign({},
          this.fields.company_information, {
            required: true
          },
      ),
    });

    schema.message(this.errorMessages);

    return this.constructor.sanitizeErrors(
        schema.validate(_.assign({}, header)),
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
