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
      <div className={s.section} key={`${question.id}_section`}>
        <div className={s.question}>
          <input
            type="text"
            name={question.id}
            className={`form-control ${s.question_name}`}
            onChange={updateQuestionName}
            defaultValue={question.name}
          />
          <div className={s.buttons}>
            <div className={s.tooltip}>
              <span className={s.tooltiptext}>Save question text</span>
              <PatchCheck fill="green" className={s.save_icon} />
            </div>
            <div className={s.tooltip}>
              <span className={s.tooltiptext}>Delete question and answers</span>
              <XCircle fill="red" className={s.delete_icon} />
            </div>
          </div>
        </div>
        <div className={s.answers}>
          {question.answers.map((a) => (
            <div className={s.answer} key={`${question.id}_answer_${a.id}`}>
              <input
                type="text"
                name={a.id}
                className={`form-control ${s.answer_name}`}
                onChange={updateAnswer}
                defaultValue={a.value}
              />
              <div className={s.buttons}>
                <div className={s.tooltip}>
                  <span className={s.tooltiptext}>Save answer text</span>
                  <PatchCheck fill="green" className={s.save_icon} />
                </div>
                <div className={s.tooltip}>
                  <span className={s.tooltiptext}>Delete answer</span>
                  <XCircle fill="red" className={s.delete_icon} />
                </div>
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
