import s from "./style.module.css";

export function FieldError({ message }) {
  return <span className={s.container}>{message}</span>;
}
