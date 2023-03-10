import styles from "./styles.module.css";

const ToolTip = ({ element, tooltiptext }) => {
  return (
    <div className={styles.tooltip}>
      <span className={styles.tooltiptext}>{tooltiptext}</span>
      {element}
    </div>
  );
};

export default ToolTip;
