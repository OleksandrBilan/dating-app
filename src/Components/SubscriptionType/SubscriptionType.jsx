import { Button, Form } from "react-bootstrap";
import s from "./style.module.css";
import { useState } from "react";

export function SubscriptionType({ info, onRequest }) {
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [inputVisible, setInputVisible] = useState(false);

  return (
    <div className={s.card}>
      <div className={s.title}>
        <h4>{info?.name}</h4>
      </div>
      <div className={s.description}>
        <span>{info?.description}</span>
      </div>
      <div className={s.price}>
        <span>{info?.price}$</span>
      </div>
      <div className={s.buttons}>
        <Button variant="primary" onClick={() => setInputVisible(true)}>
          Request
        </Button>
      </div>
      {inputVisible && (
        <div className={s.additionalInfo}>
          <label className="form-label">
            Write some additional info (like your preferred contacts):
          </label>
          <Form.Control
            as="textarea"
            rows={4}
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          />
          <div className={s.buttons}>
            <Button
              variant="success"
              onClick={() => onRequest(info?.id, additionalInfo)}
            >
              Submit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
