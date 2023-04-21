import s from "./style.module.css";
import { CustomNavbar } from "../../Components/common/CustomNavbar/CustomNavbar";
import { ChatsList } from "../../Components/ChatsList/ChatsList";
import { Chat } from "../../Components/Chat/Chat";
import { useState } from "react";

export function UserChats() {
  const [currentChatId, setCurrentChatId] = useState();

  function onChatClick(chatId) {
    setCurrentChatId(chatId);
  }

  return (
    <div className={s.container}>
      <CustomNavbar />
      <div className={s.chatsList}>
        <h4>Your chats:</h4>
        <ChatsList onChatClick={onChatClick} />
      </div>
      <div className={s.chat}>
        <Chat chatId={currentChatId} />
      </div>
    </div>
  );
}
