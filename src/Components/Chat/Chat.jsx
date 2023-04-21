import { useEffect, useState } from "react";
import s from "./style.module.css";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { API_URL } from "../../config";
import { AuthService } from "../../Services/auth";
import { MessageForm } from "./MessageForm/MessageForm";
import { MessagesList } from "./MessagesList/MessagesList";

export function Chat({ chatId }) {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (connection) {
      closeConnection();
    }
    const user = AuthService.getUserInfo();
    joinChat(user.id, chatId?.toString()).then((connection) =>
      setConnection(connection)
    );
  }, [chatId]);

  async function joinChat(userId, chatId) {
    if (chatId) {
      try {
        const connection = new HubConnectionBuilder()
          .withUrl(`${API_URL}/chat`)
          .configureLogging(LogLevel.Information)
          .build();

        connection.on("ReceiveMessage", (user, message) => {
          setMessages((messages) => [...messages, { user, message }]);
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

  if (connection)
    return (
      <div className={s.container}>
        <div className={s.messages}>
          <MessagesList messages={messages} />
        </div>
        <div className={s.messageForm}>
          <MessageForm onMessageSend={sendMessage} />
        </div>
      </div>
    );
  else return <div className={s.container}>Select a chat :)</div>;
}
