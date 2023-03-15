import {
  CheckCircle,
  Pencil,
  PlusCircle,
  Trash,
  X,
} from "react-bootstrap-icons";
import Modal from "../conmmon/Modal";
import ToolTip from "../conmmon/ToolTip";
import useToggle from "../../hooks/useToggle";
import s from "./styles.module.css";

const Question = ({ questionData }) => {
  const editToggle = useToggle();
  return (
    <div className={s.questionContainer} key={`q${questionData.id}`}>
      <h3>{questionData?.name}</h3>
      <div className={s.buttonsGroup}>
        <ToolTip
          tooltiptext="Edit question"
          element={
            <Pencil
              fill="black"
              onClick={() => editToggle.on()}
              className={s.saveIcon}
            />
          }
        />
        <ToolTip
          tooltiptext="Delete question"
          element={<Trash fill="black" className={s.deleteIcon} />}
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
          <div className={s.editQuestion}>
            <div className={`mb-5 ${s.questionInput}`}>
              <input
                type="text"
                name="question"
                className="form-control"
                defaultValue={questionData.name}
              />
            </div>
            <ToolTip
              tooltiptext="Save question text"
              element={<CheckCircle fill="black" className={s.saveIcon} />}
            />
          </div>
          <div className={s.answersContainer}>
            {questionData.answers.map((item) => (
              <div className={s.answer} key={`a${item.id}`}>
                <div className={`mb-5 ${s.answerInput}`}>
                  <input
                    type="text"
                    name={item.id}
                    className="form-control"
                    defaultValue={item.value}
                  />
                </div>
                <div className={s.buttonsGroup}>
                  <ToolTip
                    tooltiptext="Save answer"
                    element={
                      <CheckCircle fill="black" className={s.saveIcon} />
                    }
                  />
                  <ToolTip
                    tooltiptext="Delete answer"
                    element={<Trash fill="black" className={s.deleteIcon} />}
                  />
                </div>
              </div>
            ))}
            <div className={s.addAnswerButton}>
              <ToolTip
                tooltiptext="Add answer"
                element={
                  <PlusCircle
                    fill="black"
                    size={27}
                    className={s.addAnswerIcon}
                  />
                }
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Question;
