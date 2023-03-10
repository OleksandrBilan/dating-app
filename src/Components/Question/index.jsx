import { Pencil, Trash, X } from "react-bootstrap-icons";
import Modal from "../conmmon/Modal";
import ToolTip from "../conmmon/ToolTip";
import useToggle from "../../hooks/useToggle";

import styles from "./styles.module.css";

const Question = ({ questionData }) => {
  const editToggle = useToggle();
  return (
    <li className={styles.questionContaine}>
      <h3>{questionData?.name}</h3>
      <div className={styles.buttonsGroup}>
        <ToolTip
          tooltiptext="Save answer text"
          element={
            <Pencil
              fill="black"
              onClick={() => editToggle.on()}
              className={styles.saveIcon}
            />
          }
        />
        <ToolTip
          tooltiptext="Delete answer"
          element={<Trash fill="black" className={styles.deleteIcon} />}
        />
      </div>
      <Modal show={editToggle}>
        <div className={styles.editModal}>
          <X
            fill="black"
            size={30}
            onClick={() => editToggle.off()}
            className={styles.exitIcon}
          />
          <div className={styles.answersContainer}>
            {questionData.answers.map((item) => (
              <p key={questionData.id}>{item.value}</p>
            ))}
          </div>
        </div>
      </Modal>
    </li>
  );
};

export default Question;
