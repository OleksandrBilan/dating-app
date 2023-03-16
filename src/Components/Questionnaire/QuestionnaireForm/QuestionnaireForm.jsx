import axios from "axios";
import { useEffect, useState } from "react";
import s from "./style.module.css";
import { API_URL } from "../../../config";
import Question from "../Question/Question";
import { PlusCircle, X } from "react-bootstrap-icons";
import ToolTip from "../../common/ToolTip";
import useToggle from "../../../hooks/useToggle";
import Modal from "../../common/Modal";
import { QuestionForm } from "../QuestionForm/QuestionForm";

const QuestionnaireForm = () => {
  const [questionnaire, setQuestionnaire] = useState([]);
  const editToggle = useToggle();

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
      <div className={s.addQuestionButton}>
        <ToolTip
          tooltiptext="Add question"
          element={
            <PlusCircle
              fill="black"
              size={27}
              className={s.addQuestionIcon}
              onClick={() => editToggle.on()}
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
            <h4>Add question</h4>
          </div>
          <QuestionForm />
        </div>
      </Modal>
    </ul>
  );
};

export default QuestionnaireForm;
