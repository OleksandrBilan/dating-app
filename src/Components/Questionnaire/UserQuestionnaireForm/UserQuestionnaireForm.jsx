import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../../config";
import { Button, Form } from "react-bootstrap";
import s from "./style.module.css";
import { ButtonPrimary } from "../../common/ButtonPrimary/ButtonPrimary";

export function UserQuestionnaireForm({ onSubmit }) {
  const [questionnaire, setQuestionnaire] = useState([]);
  const [clickedAnswers, setClickedAnswers] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/questionnaire/getQuestionnaire`)
      .then((response) => {
        setQuestionnaire(response.data);
      })
      .catch((error) => alert("Can not load the questionnaire :("));
  }, []);

  function onAnswerClick(questionId, answerId) {
    let answers = [...clickedAnswers];
    answers.push({ questionId: questionId, answerId: answerId });
    setClickedAnswers(answers);
  }

  return (
    <div className={s.container}>
      {questionnaire.map((question) => (
        <div className={s.question} key={question.id}>
          <h4>{question.name}</h4>
          <div className={s.answers}>
            {question.answers.map((answer) => (
              <Form.Check
                label={answer.value}
                name={question.id}
                type="radio"
                value={answer.value}
                key={answer.id}
                onClick={() => onAnswerClick(question.id, answer.id)}
              />
            ))}
          </div>
        </div>
      ))}
      <div className={s.buttons}>
        <ButtonPrimary onClick={() => onSubmit(clickedAnswers)}>
          Submit
        </ButtonPrimary>
        <Button variant="secondary" onClick={() => onSubmit(null)}>
          Skip
        </Button>
      </div>
    </div>
  );
}
