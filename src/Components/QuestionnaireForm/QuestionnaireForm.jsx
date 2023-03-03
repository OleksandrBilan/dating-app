import axios from "axios";
import { useEffect, useState } from "react";
import s from "./style.module.css";
import { API_URL } from "../../config";

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
      <div className={s.question} key={question.id}>
        <input
          type="text"
          name={question.id}
          className="form-control"
          onChange={updateQuestionName}
          defaultValue={question.name}
          readOnly={true}
        />
        <div className={s.answers}>
          {question.answers.map((a) => (
            <input
              type="text"
              name={a}
              className="form-control"
              onChange={updateAnswer}
              defaultValue={a}
              readOnly={true}
            />
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
