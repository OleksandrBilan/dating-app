import { useEffect, useState } from "react";
import s from "./style.module.css";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { API_URL } from "../../config";
import { AuthService } from "../../Services/auth";
import { MessageForm } from "./MessageForm/MessageForm";
import { MessagesList } from "./MessagesList/MessagesList";
import axios from "axios";
import moment from "moment";

export function Chat({ chatId }) {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [chatInfo, setChatInfo] = useState();
  const [currentUserId, setCurrentUserId] = useState();

  useEffect(() => {
    setCurrentUserId(AuthService.getUserInfo().id);

    if (connection) {
      closeConnection();
    }

    if (chatId) {
      const user = AuthService.getUserInfo();
      joinChat(user.id, chatId?.toString()).then((connection) =>
        setConnection(connection)
      );

      axios
        .get(`${API_URL}/recommendations/getChat?chatId=${chatId}`)
        .then((response) => {
          setChatInfo(response.data);
          setMessages(response.data.messages);
        })
        .catch((error) => alert("Can't load the chat :("));
    }
  }, [chatId]);

  async function joinChat(userId, chatId) {
    if (chatId) {
      try {
        const connection = new HubConnectionBuilder()
          .withUrl(`${API_URL}/chat`)
          .configureLogging(LogLevel.Information)
          .build();

        connection.on("ReceiveMessage", (newMessage) => {
          setMessages((messages) => [...messages, newMessage]);
        });

        connection.onclose((e) => {
          setConnection();
          setMessages([]);
        });

        await connection.start();
        await connection.invoke("JoinChat", {
          userId: userId,
          chatId: chatId,
        });

        return connection;
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
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  }

  if (chatId && connection && chatInfo)
    return (
      <div className={s.container}>
        <div className={s.header}>
          <span>
            Chat with{" "}
            {chatInfo.user1.id === currentUserId
              ? chatInfo.user2.name
              : chatInfo.user1.name}
            , created{" "}
            {moment(new Date(chatInfo.createdDateTime)).format("MMMM Do YYYY")}
          </span>
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
