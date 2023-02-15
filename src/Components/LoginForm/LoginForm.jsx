import s from "./style.module.css";
import { FieldError } from "../FieldError/FieldError";
import { useState } from "react";
import { ValidatorService } from "../../Services/validator";
import { ButtonPrimary } from "../ButtonPrimary/ButtonPrimary";

const VALIDATOR = {
  email: (value) => {
    return ValidatorService.email(value);
  },
  password: (value) => {
    return ValidatorService.password(value);
  },
};

export function LoginForm({ onSubmit }) {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({
    email: true,
    password: true,
  });

  function updateFormValues(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormValues({ ...formValues, [name]: value });
    validate(name, value);
  }

  function validate(fieldName, fieldValue) {
    setFormErrors({
      ...formErrors,
      [fieldName]: VALIDATOR[fieldName](fieldValue),
    });
  }

  function hasError() {
    for (const fieldName in formErrors) {
      if (formErrors[fieldName]) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className={s.container}>
      <div className={`mb-5 ${s.email_input}`}>
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          onChange={updateFormValues}
        />
        <FieldError message={formErrors.email} />
      </div>
      <div className={`mb-5 ${s.password_input}`}>
        <label className="form-label">Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          onChange={updateFormValues}
        />
        <FieldError message={formErrors.password} />
      </div>
      <div className={s.submit_btn}>
        <ButtonPrimary
          isDisabled={hasError()}
          onClick={() => onSubmit(formValues)}
        >
          Submit
        </ButtonPrimary>
      </div>
    </div>
  );
}
