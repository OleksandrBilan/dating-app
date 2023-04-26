import {
  CheckCircle,
  Pencil,
  PencilFill,
  PlusCircle,
  Trash,
  TrashFill,
  X,
} from "react-bootstrap-icons";
import Modal from "../../common/Modal";
import ToolTip from "../../common/ToolTip";
import useToggle from "../../../hooks/useToggle";
import s from "./styles.module.css";
import { useState } from "react";
import { ValidatorService } from "../../../Services/validator";
import { FieldError } from "../../common/FieldError/FieldError";

const Question = ({
  questionData,
  onQuestionDelete,
  onQuestionSave,
  onAnswerDelete,
  onAnswerSave,
}) => {
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

  const editToggle = useToggle();
  const [answers, setAnswers] = useState(questionData.answers);

  function onAddAnswer() {
    let newAnswers = [...answers];
    let maxId = Math.max(...newAnswers.map((a) => Math.abs(a.id)));
    let newId = -1 * (maxId + 1);
    newAnswers.push({ id: newId, value: "" });
    setAnswers(newAnswers);
  }

  function updateAnswer(e) {
    let newAnswers = [...answers];
    let answer = newAnswers.find((a) => a.id == e.target.name);
    answer.value = e.target.value;
    setAnswers(newAnswers);
  }

  function onQuestionDeleteClick() {
    onQuestionDelete(questionData.id);
  }

  function onQuestionSaveClick() {
    onQuestionSave(questionData.id, formValues.question);
  }

  function onAnswerDeleteClick(answerId) {
    let newAnswers = answers.filter((a) => a.id !== answerId);
    setAnswers(newAnswers);

    if (answerId > 0) {
      onAnswerDelete(answerId);
    }
  }

  function onAnswerSaveClick(answerId) {
    let answer = answers.find((a) => a.id === answerId);
    onAnswerSave(questionData.id, answerId, answer.value);
  }

  return (
    <div className={s.questionContainer} key={`q${questionData.id}`}>
      <h4>{questionData?.name}</h4>
      <div className={s.buttonsGroup}>
        <ToolTip
          tooltiptext="Edit question"
          element={
            <PencilFill
              fill="#74bbca"
              onClick={() => editToggle.on()}
              className={s.saveIcon}
            />
          }
        />
        <ToolTip
          tooltiptext="Delete question"
          element={
            <TrashFill
              fill="#74bbca"
              className={s.deleteIcon}
              onClick={onQuestionDeleteClick}
            />
          }
        />
      </div>
      <Modal show={editToggle}>
        <div className={s.editModal}>
          <X
            fill="black"
            size={30}
            onClick={() => editToggle.off()}
            className={s.exitIcon}
          />
          <div className={s.title}>
            <h4>Edit question</h4>
          </div>
          <div className={s.editQuestion}>
            <div className={`mb-5 ${s.questionInput}`}>
              <input
                type="text"
                name="question"
                className="form-control"
                defaultValue={questionData.name}
                onChange={updateFormValues}
              />
              <FieldError message={formErrors.question} />
            </div>
            <ToolTip
              tooltiptext="Save question text"
              element={
                <CheckCircle
                  fill="black"
                  className={s.saveIcon}
                  onClick={onQuestionSaveClick}
                />
              }
            />
          </div>
          <div className={s.answersContainer}>
            {answers.map((item) => (
              <div className={s.answer} key={`a${item.id}`}>
                <div className={`mb-5 ${s.answerInput}`}>
                  <input
                    type="text"
                    name={item.id}
                    className="form-control"
                    defaultValue={item.value}
                    onChange={updateAnswer}
                  />
                </div>
                <div className={s.buttonsGroup}>
                  <ToolTip
                    tooltiptext="Save answer"
                    element={
                      <CheckCircle
                        fill="black"
                        className={s.saveIcon}
                        onClick={() => onAnswerSaveClick(item.id)}
                      />
                    }
                  />
                  <ToolTip
                    tooltiptext="Delete answer"
                    element={
                      <Trash
                        fill="black"
                        className={s.deleteIcon}
                        onClick={() => onAnswerDeleteClick(item.id)}
                      />
                    }
                  />
                </div>
              </div>
            ))}
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
        </div>
      </Modal>
    </div>
  );
};

export default Question;
