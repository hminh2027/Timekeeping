import { onNewMessage, onSocketConnect } from "./chatSocket.service";

import React, { useState, useEffect } from "react";
import io from "socket.io-client";

// const socket =
//   typeof window !== "undefined"
//     ? io(socketUri, {
//         reconnection: false,
//         extraHeaders: {
//           Authorization: token,
//         },
//       })
//     : "HELLO";
const UseChatSocket = (props) => {
  // const [isConnected, setIsConnected] = useState(socket.connected);
  const [token, setToken] = useState(null);

  // let socket;

  useEffect(() => {
    if (localStorage.getItem("AUTH_TOKEN")) {
      setToken(localStorage.getItem("AUTH_TOKEN"));
    } else {
      setToken(null);
    }
  }, []);

  useEffect(() => {
    let socket = null;
    if (token) {
      socket = io(socketUri, {
        reconnection: false,
        extraHeaders: {
          Authorization: token,
        },
      });

      socket.on("msgToClient", (payload) => {
        onNewMessage(payload);
      });
      socket.on("connect", () => onSocketConnect(socket.id));
    }
    return () => {
      socket?.disconnect();
    };
  }, []);

  const socketUri = process.env.APP_URL;
};

export default UseChatSocket;
