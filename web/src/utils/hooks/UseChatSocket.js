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
        // TODO: notification
        console.log("NEW MESSAGE", payload);
      });
      socket.emit("msgToServer", ["8", "info"]);
      socket.on("connect", () => {
        console.log(socket);
        onSocketConnect(socket.id);
      });
    }

    // if (socket) {
    //   socket.on("msgToClient", (payload) => {
    //     // TODO: notification
    //     console.log("NEW MESSAGE", payload);
    //   });
    //   socket.emit("msgToServer", ["8", "info"]);
    //   socket.on("connect", () => {
    //     console.log(socket);
    //     onSocketConnect(socket.id);
    //   });
    // }
    return () => {
      if (socket) socket.disconnect();
    };
  }, [token]);
  // useEffect(() => {
  //   socket.on("connect", () => {
  //     setIsConnected(true);
  //   });

  //   socket.on("disconnect", () => {
  //     setIsConnected(false);
  //   });

  //   socket.on("pong", () => {
  //     setLastPong(new Date().toISOString());
  //   });

  //   return () => {
  //     socket.off("connect");
  //     socket.off("disconnect");
  //     socket.off("pong");
  //   };
  // }, []);
  const socketUri = process.env.APP_URL;
};

export default UseChatSocket;
