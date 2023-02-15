export class ValidatorService {
  static min(inputValue, min) {
    if (inputValue?.length < min) {
      return `Can't be less than ${min} characters`;
    }
  }

  static email(inputValue) {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!inputValue.match(validRegex)) {
      return "Ivalid email address";
    }
  }

  static password(inputValue) {
    let errors = "";

    const lowerCaseLetters = /[a-z]/g;
    if (!inputValue.match(lowerCaseLetters)) {
      errors += "Must contain lowercase letter";
    }

    const upperCaseLetters = /[A-Z]/g;
    if (!inputValue.match(upperCaseLetters)) {
      errors += "; Must contain uppercase letter";
    }

    if (inputValue.length < 6) {
      errors += "; Must have 6 or more characters";
    }

    return errors;
  }
}
