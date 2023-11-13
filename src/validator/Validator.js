import { ERROR_MESSAGE } from '../constants/messages';

class Validator {
  static #validateNumber(date) {
    return /^[0-9]+$/.test(date);
  }

  static #validateDateRange(date) {
    return date > 0 && date < 32;
  }

  static dateValidator(date) {
    if (!Validator.#validateNumber(date)) {
      throw new Error(ERROR_MESSAGE.invalidDate);
    }

    if (!Validator.#validateDateRange(date)) {
      throw new Error(ERROR_MESSAGE.invalidDate);
    }
  }
}

export default Validator;
