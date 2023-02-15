import moment from "moment";

export class ValidatorService {
  static min(inputValue) {
    const minLength = 4;
    if (inputValue?.length < minLength) {
      return `Can't be less than ${minLength} characters`;
    }
  }

  static email(inputValue) {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!inputValue?.match(validRegex)) {
      return "Ivalid email address";
    }
  }

  static password(inputValue) {
    let errors = "";

    const lowerCaseLetters = /[a-z]/g;
    if (!inputValue?.match(lowerCaseLetters)) {
      errors += "Must contain lowercase letter";
    }

    const upperCaseLetters = /[A-Z]/g;
    if (!inputValue?.match(upperCaseLetters)) {
      if (errors?.length > 0) {
        errors += "; ";
      }
      errors += "Must contain uppercase letter";
    }

    if (inputValue?.length < 6) {
      if (errors?.length > 0) {
        errors += "; ";
      }
      errors += "Must have 6 or more characters";
    }

    const numbers = /[0-9]/g;
    if (!inputValue?.match(numbers)) {
      if (errors?.length > 0) {
        errors += "; ";
      }
      errors += "Must contain a digit";
    }

    return errors;
  }

  static birthDate(inputValue) {
    const minAge = 16;
    let inputMoment = new moment(inputValue);
    if (moment().diff(inputMoment, "years") < minAge) {
      return `You have to be at least ${16} years old to use this app`;
    }
  }
}
