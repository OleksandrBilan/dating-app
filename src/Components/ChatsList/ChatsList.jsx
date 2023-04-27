import { useEffect, useState } from "react";
import s from "./style.module.css";
import { AuthService } from "../../Services/auth";

export function ChatsList({ chats, onChatClick, currentChatId }) {
  const [currentUserId, setCurrentUserId] = useState();

  useEffect(() => {
    const userId = AuthService.getUserInfo().id;
    setCurrentUserId(userId);
  }, []);

  if (chats && chats.length > 0)
    return (
      <div className={s.container}>
        <ul className={s.list}>
          {chats.map((c) => (
            <li
              key={`chat_${c.id}`}
              className={c.id === currentChatId ? s.selectedChat : s.chat}
              onClick={() => onChatClick(c.id)}
            >
              {c.user1.id === currentUserId ? c.user2.name : c.user1.name}
            </li>
          ))}
        </ul>
      </div>
    );
  else
    return (
      <div className={s.container}>
        <h4>No chats yet :)</h4>
      </div>
    );
}
