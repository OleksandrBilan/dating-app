import axios from "axios";
import { useEffect, useState } from "react";
import s from "./style.module.css";
import { API_URL } from "../../config";
import { PatchCheck, XCircle } from "react-bootstrap-icons";

export function QuestionnaireForm() {
  const [questionnaire, setQuestionnaire] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/questionnaire/getQuestionnaire`)
      .then((response) => {
        setQuestionnaire(response.data);
      })
      .catch((error) => alert("Can not load the questionnaire :("));
  }, []);

  function updateQuestionName(e) {}

  function updateAnswer(e) {}

  function ShowQuestion(question) {
    return (
      <div className={s.section}>
        <div className={s.question} key={question.id}>
          <input
            type="text"
            name={question.id}
            className={`form-control ${s.question_name}`}
            onChange={updateQuestionName}
            defaultValue={question.name}
          />
          <div className={s.buttons}>
            <div className={s.tooltip}>
              <span class={s.tooltiptext}>Save question with answers</span>
              <PatchCheck fill="green" className={s.save_icon} />
            </div>
            <div className={s.tooltip}>
              <span class={s.tooltiptext}>Delete question with answers</span>
              <XCircle fill="red" className={s.delete_icon} />
            </div>
          </div>
        </div>
        <div className={s.answers}>
          {question.answers.map((a) => (
            <div className={s.answer}>
              <input
                type="text"
                name={a}
                className={`form-control ${s.answer_name}`}
                onChange={updateAnswer}
                defaultValue={a}
              />
              <div className={s.buttons}>
                <XCircle fill="red" className={s.delete_icon} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={s.container}>
      {questionnaire.map((q) => ShowQuestion(q))}
    </div>
  );
}
