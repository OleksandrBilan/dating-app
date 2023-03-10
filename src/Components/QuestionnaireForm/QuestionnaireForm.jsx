import axios from "axios";
import { useEffect, useState } from "react";
import s from "./style.module.css";
import { API_URL } from "../../config";
import Question from "../Question";

const QuestionnaireForm = () => {
  const [questionnaire, setQuestionnaire] = useState([
    {
      id: 1,
      name: "changed question",
      answers: [
        {
          id: 5,
          value: "changed answer 1",
        },
        {
          id: 6,
          value: "changed answer 2",
        },
        {
          id: 16,
          value: "string",
        },
        {
          id: 17,
          value: "changed answer 3",
        },
      ],
    },
    {
      id: 2,
      name: "test question",
      answers: [
        {
          id: 2,
          value: "test answer 1",
        },
        {
          id: 3,
          value: "test answer 2",
        },
        {
          id: 4,
          value: "test answer 3",
        },
      ],
    },
    {
      id: 4,
      name: "new new question",
      answers: [
        {
          id: 9,
          value: "new answer 2",
        },
        {
          id: 10,
          value: "new new answer 1",
        },
      ],
    },
    {
      id: 5,
      name: "page test q",
      answers: [
        {
          id: 11,
          value: "page test a 1",
        },
        {
          id: 12,
          value: "page test a 2",
        },
        {
          id: 13,
          value: "page test a 3",
        },
        {
          id: 14,
          value: "page test a 4",
        },
        {
          id: 15,
          value: "page test a 5",
        },
      ],
    },
  ]);

  // useEffect(() => {
  //   axios
  //     .get(`${API_URL}/questionnaire/getQuestionnaire`)
  //     .then((response) => {
  //       setQuestionnaire(response.data);
  //     })
  //     .catch((error) => alert("Can not load the questionnaire :("));
  // }, []);

  console.log(questionnaire);

  return (
    <ul className={s.container}>
      {questionnaire?.map((questionData) => (
        <Question key={questionData.id} questionData={questionData} />
      ))}
    </ul>
  );
};

export default QuestionnaireForm;
