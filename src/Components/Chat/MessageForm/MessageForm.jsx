import { Button } from "react-bootstrap";
import { useState } from "react";
import s from "./style.module.css";

export function MessageForm({ onMessageSend }) {
  const [message, setMessage] = useState("");

  function onSubmit() {
    onMessageSend(message);
    setMessage("");
  }

  return (
    <div className={s.container}>
      <div className={s.textArea}>
        <input
          tupe="text"
          placeholder="message..."
          className="form-control"
          name="message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
      </div>
      <div className={s.buttonDiv}>
        <Button
          variant="primary"
          type="submit"
          disabled={!message}
          onClick={onSubmit}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
