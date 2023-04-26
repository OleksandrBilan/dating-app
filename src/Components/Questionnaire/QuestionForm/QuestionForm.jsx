import { PlusCircle, TrashFill } from "react-bootstrap-icons";
import s from "./style.module.css";
import { FieldError } from "../../common/FieldError/FieldError";
import { useState } from "react";
import { ValidatorService } from "../../../Services/validator";
import { Button } from "react-bootstrap";

export function QuestionForm({ onSubmit, toggle }) {
  const [formValues, setFormValues] = useState({ question: "" });
  const [formErrors, setFormErrors] = useState({ question: true });
  const [answers, setAnswers] = useState([]);

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

  function onAddAnswer() {
    let newAnswers = [...answers];
    newAnswers.push("");
    setAnswers(newAnswers);
  }

  function updateAnswer(e) {
    let newAnswers = [...answers];
    newAnswers[e.target.name] = e.target.value;
    setAnswers(newAnswers);
  }

  function onAnswerDelete(index) {
    let newAnswers = [...answers];
    newAnswers.splice(index, 1);
    setAnswers(newAnswers);
  }

  function onSave() {
    onSubmit(formValues.question, answers);
    toggle.off();
  }

  return (
    <div className={s.container}>
      <div className={`mb-5 ${s.questionInput}`}>
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
        {answers.map((a, i) => (
          <div className={s.answer} key={i}>
            <div className={`mb-5 ${s.answerInput}`}>
              <input
                type="text"
                name={i}
                className="form-control"
                onChange={updateAnswer}
                defaultValue={a}
              />
            </div>

            <TrashFill
              fill="#74bbca"
              className={s.deleteIcon}
              onClick={() => onAnswerDelete(i)}
            />
          </div>
        ))}
      </div>
      <div className={s.addAnswerButton}>
        <PlusCircle
          fill="#74bbca"
          size={27}
          className={s.addAnswerIcon}
          onClick={onAddAnswer}
        />
      </div>
      <div className={s.saveButton}>
        <Button variant="primary" isDisabled={hasError()} onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
