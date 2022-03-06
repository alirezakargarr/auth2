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
      service: {
        type: String,
      },
      password: {
        type: String,
        length: { min: 8, max: 48 }
      },
      phone_number: {
        type: String,
      },
      email: {
        type: String,
      },
      gender: {
        type: String,
        enum: ['male', 'female']
      },
      role: {
        type: String,
      },
      field_of_activity: {
        type: String,
      },
      telephone_number: {
        type: String,
      },
      registration_id: {
        type: String,
      },
      national_id: {
        type: String,
      },
      economic_code: {
        type: String,
      },
      company_name: {
        type: String,
      },
      birthday: {
        type: String,
      },
      job: {
        type: String,
      },
      city_state: {
        type: String,
      },
      answers: {
        type: String,
      },
      name: {
        type: String,
      },
      family_name: {
        type: String,
      },
      configurations: {
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

  password(items, throwErrors = true) {
    const schema = new Schema({
      auth_token: _.assign({},
          this.fields.auth_token, {
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

  header(items, throwErrors = true) {
    const schema = new Schema({
      auth_token: _.assign({},
          this.fields.auth_token, {
            required: true
          },
      ),
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

  security_question(items, throwErrors = true) {
    const schema = new Schema({
      answers: _.assign({},
          this.fields.answers, {
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

  phone_number(items, throwErrors = true) {
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

  configurations_header(items, throwErrors = true) {
    const schema = new Schema({
      auth_token: _.assign({},
          this.fields.auth_token, {
            required: true
          },
      )
    });


    schema.message(this.errorMessages);

    return this.constructor.sanitizeErrors(
        schema.validate(_.assign({}, items)),
        throwErrors,
    );
  }

  configurations(items, throwErrors = true) {
    const schema = new Schema({
      configurations: _.assign({},
          this.fields.configurations, {
            required: true
          },
      )
    });


    schema.message(this.errorMessages);

    return this.constructor.sanitizeErrors(
        schema.validate(_.assign({}, items)),
        throwErrors,
    );
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

  user_information(items, throwErrors = true) {
    const schema = new Schema({
      national_code: _.assign({},
          this.fields.national_code, {
            required: true
          },
      ),
      name: _.assign({},
          this.fields.name, {
            required: true
          },
      ),
      family_name: _.assign({},
          this.fields.family_name, {
            required: true
          },
      ),
      birthday: _.assign({},
          this.fields.birthday, {
            required: true
          },
      ),
      gender: _.assign({},
          this.fields.gender, {
            required: true
          },
      ),
      job: _.assign({},
          this.fields.job, {
            required: true
          },
      ),
      city_state: _.assign({},
          this.fields.city_state, {
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

  user_information_header(items, throwErrors = true) {
    const schema = new Schema({
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

  role(items, throwErrors = true) {
    const schema = new Schema({
      role: _.assign({},
          this.fields.role, {
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

  company_information(items, throwErrors = true) {
    const schema = new Schema({
      registration_id: _.assign({},
          this.fields.registration_id, {
            required: true
          },
      ),
      national_id: _.assign({},
          this.fields.national_id, {
            required: true
          },
      ),
      economic_code: _.assign({},
          this.fields.economic_code, {
            required: true
          },
      ),
      company_name: _.assign({},
          this.fields.company_name, {
            required: true
          },
      ),
      telephone_number: _.assign({},
          this.fields.telephone_number, {
            required: true
          },
      ),
      field_of_activity: _.assign({},
          this.fields.field_of_activity, {
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

  company_information_header(items, throwErrors = true) {
    const schema = new Schema({
      auth_token: _.assign({},
          this.fields.auth_token, {
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
