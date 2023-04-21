import { useEffect, useState } from "react";
import s from "./style.module.css";
import { AuthService } from "../../../Services/auth";
import moment from "moment/moment";

export function MessagesList({ messages }) {
  const [currentUserId, setCurrentUserId] = useState();

  useEffect(() => {
    setCurrentUserId(AuthService.getUserInfo().id);
  }, []);

  if (messages)
    return (
      <div className={s.container}>
        {messages.map((m, index) => (
          <div
            key={index}
            className={s.message}
            style={
              currentUserId === m.user
                ? { alignItems: "end" }
                : { alignItems: "start" }
            }
          >
            <div className={s.messageText}>{m.message}</div>
            <div className={s.dateTime}>{moment().toLocaleString()}</div>
          </div>
        ))}
      </div>
    );
  else return <div className={s.container}>No messages</div>;
}
