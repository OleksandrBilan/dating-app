import s from "./style.module.css";
import Form from "react-bootstrap/Form";
import { FieldError } from "../FieldError/FieldError";
import { useState } from "react";
import { ValidatorService } from "../../Services/validator";
import { ButtonPrimary } from "../ButtonPrimary/ButtonPrimary";

const VALIDATOR = {
  name: (value) => {
    return ValidatorService.min(value);
  },
  birthDate: (value) => {
    return ValidatorService.birthDate(value);
  },
  description: (value) => {
    return ValidatorService.min(value);
  },
};

export function UserInfoForm({ onSubmit }) {
  const [formValues, setFormValues] = useState({
    name: "",
    birthDate: Date.now(),
    cityId: 1,
    sex: 1,
    sexPreferences: 0,
    description: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: true,
    birthDate: true,
    // cityId: true,
    // sex: true,
    // sexPreferences: true,
    description: true,
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
      <div className={`mb-5 ${s.all_inputs}`}>
        <label className="form-label">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          onChange={updateFormValues}
        />
        <FieldError message={formErrors.name} />
      </div>
      <div className={`mb-5 ${s.all_inputs}`}>
        <label className="form-label">Birth Date</label>
        <input
          type="date"
          name="birthDate"
          className="form-control"
          onChange={updateFormValues}
        />
        <FieldError message={formErrors.birthDate} />
      </div>
      <div className={`mb-5 ${s.all_inputs}`}>
        <label className="form-label">Write something about yourself</label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          onChange={updateFormValues}
        />
        <FieldError message={formErrors.description} />
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
