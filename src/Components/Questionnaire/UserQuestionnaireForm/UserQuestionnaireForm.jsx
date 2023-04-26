import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../../config";
import { Button } from "react-bootstrap";
import s from "./style.module.css";

export function UserQuestionnaireForm({ onSubmit, savedAnswers }) {
  const [questionnaire, setQuestionnaire] = useState([]);
  const [clickedAnswers, setClickedAnswers] = useState([]);
  const [completedPercents, setCompletedPercents] = useState(0);

  useEffect(() => {
    axios
      .get(`${API_URL}/questionnaire/getQuestionnaire`)
      .then((response) => {
        const questions = response.data;
        setQuestionnaire(questions);
      })
      .catch((error) => alert("Can not load the questionnaire :("));

    if (savedAnswers) {
      setClickedAnswers(savedAnswers);
    }
  }, [savedAnswers]);

  useEffect(() => {
    if (questionnaire.length === 0 || clickedAnswers.length === 0) {
      setCompletedPercents(0);
    } else {
      setCompletedPercents(
        (clickedAnswers.length / questionnaire.length) * 100
      );
    }
  }, [clickedAnswers.length, questionnaire.length]);

  function onAnswerClick(questionId, answerId) {
    let answers = [...clickedAnswers];
    let question = answers.find((x) => x.questionId === questionId);
    if (question) {
      question.answerId = answerId;
    } else {
      answers.push({ questionId: questionId, answerId: answerId });
    }
    setClickedAnswers(answers);
  }

  function isAnswerChecked(answerId) {
    let result = false;
    const existingAnswer = clickedAnswers.find((x) => x.answerId === answerId);
    if (existingAnswer) {
      result = true;
    }
    return result;
  }

  return (
    <div className={s.container}>
      <div className={s.title}>
        <h4>Your questionnaire is {completedPercents.toFixed(0)}% complete</h4>
      </div>
      <div className={s.questions}>
        {questionnaire.map((question) => (
          <div className={s.question} key={question.id}>
            <h4>{question.name}</h4>
            <div className={s.answers}>
              {question.answers.map((answer) => (
                <label key={answer.id}>
                  <input
                    type="radio"
                    onChange={() => onAnswerClick(question.id, answer.id)}
                    checked={isAnswerChecked(answer.id)}
                  />
                  {answer.value}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={s.buttonsContainer}>
        <div className={s.buttons}>
          <Button variant="primary" onClick={() => onSubmit(clickedAnswers)}>
            Submit
          </Button>
          <Button variant="secondary" onClick={() => setClickedAnswers([])}>
            Clear
          </Button>
          {savedAnswers == null && (
            <Button variant="secondary" onClick={() => onSubmit(null)}>
              Skip
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
