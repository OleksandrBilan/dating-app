import axios from "axios";
import { useEffect, useState } from "react";
import s from "./style.module.css";
import { API_URL } from "../../config";
import Question from "../Question/Question";

const QuestionnaireForm = () => {
  const [questionnaire, setQuestionnaire] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/questionnaire/getQuestionnaire`)
      .then((response) => {
        setQuestionnaire(response.data);
      })
      .catch((error) => alert("Can not load the questionnaire :("));
  }, []);

  return (
    <ul className={s.container}>
      {questionnaire?.map((questionData) => (
        <Question key={questionData.id} questionData={questionData} />
      ))}
    </ul>
  );
};

export default QuestionnaireForm;
