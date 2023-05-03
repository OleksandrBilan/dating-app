import { useEffect, useState } from "react";
import s from "./style.module.css";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { API_URL } from "../../config";
import { AuthService } from "../../Services/auth";
import { MessageForm } from "./MessageForm/MessageForm";
import { MessagesList } from "./MessagesList/MessagesList";
import axios from "axios";
import moment from "moment";
import { TrashFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export function Chat({ chatId, onChatDelete }) {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [chatInfo, setChatInfo] = useState();
  const [currentUserId, setCurrentUserId] = useState();
  const navigate = useNavigate();

  function setMessagesAsRead(userId) {
    return axios.post(`${API_URL}/recommendations/setChatMessagesRead`, {
      chatId: chatId,
      userId: userId,
    });
  }

  useEffect(() => {
    const userId = AuthService.getUserInfo().id;
    setCurrentUserId(userId);

    if (chatId) {
      closeConnection();

      joinChat(userId, chatId?.toString()).then((connection) => {
        if (connection.state === "Connected") {
          setConnection(connection);
        }
      });

      setMessagesAsRead(userId).then(() =>
        axios
          .get(`${API_URL}/recommendations/getChat?chatId=${chatId}`)
          .then((response) => {
            setChatInfo(response.data);
            setMessages(response.data.messages);
          })
          .catch((error) => alert("Can't load the chat :("))
      );
    }
  }, [chatId]);

  async function joinChat(userId, chatId) {
    if (chatId) {
      try {
        const newConnection = new HubConnectionBuilder()
          .withUrl(`${API_URL}/chat`)
          .configureLogging(LogLevel.Information)
          .build();

        newConnection.on("ReceiveMessage", (newMessage) => {
          setMessages((messages) => [...messages, newMessage]);
        });

        await newConnection.start();
        await newConnection
          .invoke("JoinChat", {
            userId: userId,
            chatId: chatId,
          })
          .then((successfullJoin) => {
            if (!successfullJoin) {
              newConnection.stop();
            }
          });

        return newConnection;
      } catch (e) {
        alert("Can't open the chat :(");
        console.log(e);
      }
    }
  }

  async function sendMessage(message) {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      alert("Can't send the message :(");
      console.log(e);
    }
  }

  async function closeConnection() {
    try {
      await connection?.stop();
    } catch (e) {
      console.log(e);
    }
  }

  if (chatId && connection && chatInfo)
    return (
      <div className={s.container}>
        <div className={s.header}>
          <div className={s.chatName}>
            <span>
              Chat with{" "}
              <a
                className={s.link}
                onClick={() =>
                  navigate("/userInfo", {
                    state: {
                      userId:
                        chatInfo.user1.id === currentUserId
                          ? chatInfo.user2.id
                          : chatInfo.user1.id,
                    },
                  })
                }
              >
                {chatInfo.user1.id === currentUserId
                  ? chatInfo.user2.name
                  : chatInfo.user1.name}
              </a>
              , created{" "}
              {moment(new Date(chatInfo.createdDateTime)).format(
                "MMMM Do YYYY"
              )}
            </span>
          </div>
          <div className={s.deleteIcon} onClick={onChatDelete}>
            <TrashFill fill="red" size={20} />
          </div>
        </div>
        <div className={s.messages}>
          <MessagesList messages={messages} />
        </div>
        <div className={s.messageForm}>
          <MessageForm onMessageSend={sendMessage} />
        </div>
      </div>
    );
  else return <div className={s.container}></div>;
}
