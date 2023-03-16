import cn from "classnames";
import { useEffect, useRef } from "react";

import useClickOutside from "../../../hooks/useClickOutside";

import styles from "./styles.module.css";

const Modal = ({ show, className, containerClassName, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (show.value) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    }

    return () => {
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("height");
    };
  }, [show.value]);

  useClickOutside(modalRef, () => {
    show.off();
  });

  return show.value ? (
    <div className={cn(styles.modalWrapper, className)}>
      <div
        ref={modalRef}
        className={cn(styles.modalContent, containerClassName)}
      >
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
