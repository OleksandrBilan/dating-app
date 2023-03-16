import { PlusCircle } from "react-bootstrap-icons";
import { ButtonPrimary } from "../../common/ButtonPrimary/ButtonPrimary";
import ToolTip from "../../common/ToolTip";
import s from "./style.module.css";
import { FieldError } from "../../common/FieldError/FieldError";
import { useState } from "react";
import { ValidatorService } from "../../../Services/validator";

const VALIDATOR = {
  text: (value) => {
    return ValidatorService.min(value);
  },
  answer: (value) => {
    return ValidatorService.password(value);
  },
};

export function QuestionForm({ onSubmit }) {
  const [formValues, setFormValues] = useState({ question: "" });
  const [formErrors, setFormErrors] = useState({ question: true });

  function updateFormValues(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormValues({ ...formValues, [name]: value });
    validate(name, value);
  }

  function validate(fieldName, fieldValue) {
    setFormErrors({
      ...formErrors,
      [fieldName]: ValidatorService.min(fieldValue),
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

  const [answers, setAnswers] = useState([]);

  function onAddAnswer() {
    let newAnswers = [...answers];
    newAnswers.push("");
    console.log(newAnswers);
    setAnswers(newAnswers);
  }

  function updateAnswer(e) {
    let newAnswers = [...answers];
    newAnswers[e.target.name] = e.target.value;
    setAnswers(newAnswers);
  }

  return (
    <div className={s.container}>
      <div className={`mb-5 ${s.all_inputs}`}>
        <label className="form-label">Question</label>
        <input
          type="text"
          name="question"
          className="form-control"
          onChange={updateFormValues}
        />
        <FieldError message={formErrors.question} />
      </div>
      <div className={s.answers}>
        {answers.map((a, i) => {
          <div className={`mb-5 ${s.all_inputs}`}>
            <input
              type="text"
              name={i}
              className="form-control"
              onChange={updateAnswer}
              defaultValue={a}
            />
          </div>;
        })}
      </div>
      <div className={s.addAnswerButton}>
        <ToolTip
          tooltiptext="Add answer"
          element={
            <PlusCircle
              fill="black"
              size={27}
              className={s.addAnswerIcon}
              onClick={onAddAnswer}
            />
          }
        />
      </div>
      <div className={s.saveButton}>
        <ButtonPrimary
          isDisabled={hasError()}
          onClick={() => onSubmit(formValues)}
        >
          Save
        </ButtonPrimary>
      </div>
    </div>
  );
}
