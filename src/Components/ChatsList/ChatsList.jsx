import { useEffect, useState } from "react";
import s from "./style.module.css";
import { AuthService } from "../../Services/auth";

export function ChatsList({ onChatClick }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const currentUser = AuthService.getUserInfo();
    setChats([
      { id: 1, user: { name: "Test chast 1" } },
      { id: 2, user: { name: "Test chast 2" } },
      { id: 3, user: { name: "Test chast 3" } },
      { id: 4, user: { name: "Test chast 4" } },
      { id: 5, user: { name: "Test chast 5" } },
      { id: 6, user: { name: "Test chast 6" } },
      { id: 7, user: { name: "Test chast 1" } },
      { id: 8, user: { name: "Test chast 2" } },
      { id: 9, user: { name: "Test chast 3" } },
      { id: 10, user: { name: "Test chast 4" } },
      { id: 11, user: { name: "Test chast 5" } },
      { id: 12, user: { name: "Test chast 6" } },
      { id: 13, user: { name: "Test chast 4" } },
      { id: 14, user: { name: "Test chast 5" } },
      { id: 15, user: { name: "Test chast 6" } },
      { id: 16, user: { name: "Test chast 4" } },
      { id: 17, user: { name: "Test chast 5" } },
      { id: 18, user: { name: "Test chast 6" } },
      { id: 19, user: { name: "Test chast 4" } },
      { id: 20, user: { name: "Test chast 5" } },
      { id: 21, user: { name: "Test chast 6" } },
    ]);
  }, []);

  if (chats && chats.length > 0)
    return (
      <div className={s.container}>
        <ul className={s.list}>
          {chats.map((c) => (
            <li
              key={`chat_${c.id}`}
              className={s.chat}
              onClick={() => onChatClick(c.id)}
            >
              {c.user.name}
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
