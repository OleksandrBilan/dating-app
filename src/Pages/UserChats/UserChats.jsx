import s from "./style.module.css";
import { CustomNavbar } from "../../Components/common/CustomNavbar/CustomNavbar";
import { ChatsList } from "../../Components/ChatsList/ChatsList";
import { Chat } from "../../Components/Chat/Chat";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import { AuthService } from "../../Services/auth";

export function UserChats() {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState();
  const location = useLocation();

  useEffect(() => {
    if (location?.state?.chatId) {
      setCurrentChatId(location.state.chatId);
    }

    axios
      .get(
        `${API_URL}/recommendations/getUserChats?userId=${
          AuthService.getUserInfo().id
        }`
      )
      .then((response) => setChats(response.data))
      .catch((error) => alert("Error loading your chats :("));
  }, []);

  function onChatClick(chatId) {
    let newChats = [...chats];
    let currentChat = newChats.filter((c) => c.id === chatId)[0];
    currentChat.unreadMessagesCount = 0;
    setChats(newChats);
    setCurrentChatId(chatId);
  }

  function onChatDelete() {
    if (window.confirm("Are you sure you want to delete this chat?")) {
      axios
        .delete(`${API_URL}/recommendations/deleteChat?chatId=${currentChatId}`)
        .then((response) => {
          const newChats = chats.filter((c) => c.id !== currentChatId);
          setChats(newChats);
          setCurrentChatId();
        })
        .catch((error) => {
          alert("Can't delete this chat :(");
        });
    }
  }

  return (
    <div className={s.container}>
      <CustomNavbar />
      {chats && chats.length > 0 ? (
        <div className={s.chatsList}>
          <>
            <h4>Your chats:</h4>
            <ChatsList
              chats={chats}
              onChatClick={onChatClick}
              currentChatId={currentChatId}
            />
          </>
        </div>
      ) : (
        <h4>No chats yet :)</h4>
      )}
      {currentChatId && (
        <div className={s.chat}>
          <Chat chatId={currentChatId} onChatDelete={onChatDelete} />
        </div>
      )}
    </div>
  );
}
