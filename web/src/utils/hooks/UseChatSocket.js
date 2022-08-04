import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { onNewMessage, onSocketConnect } from "./chatSocket.service";
const UseChatSocket = (props) => {
  const [token, setToken] = useState(null);

  let socket;

  useEffect(() => {
    if (localStorage.getItem("AUTH_TOKEN")) {
      setToken(localStorage.getItem("AUTH_TOKEN"));
    } else {
      setToken(null);
    }
  }, []);

  useEffect(() => {
    if (token) {
      socket = io(socketUri, {
        reconnection: false,
        extraHeaders: {
          Authorization: token,
        },
      });
    }

    if (socket) {
      socket.on("msgToClient", (payload) => onNewMessage(payload));
      socket.on("connect", () => onSocketConnect(socket.id));
    }
    return () => {
      if (socket) socket.disconnect();
    };
  }, [token]);

  const socketUri = process.env.APP_URL;

  return socket;
};

export default UseChatSocket;
