import React, { useState } from "react";
import io from "socket.io-client";
import { QUERY_COMMENT } from "../constants/react-query";
const UseChatSocket = (props) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("AUTH_TOKEN") : null;
  const socketUri =
    process.env.APP_URL || "https://f909-14-248-82-243.ap.ngrok.io/";

  const socket = io(socketUri, {
    reconnection: false,
    extraHeaders: {
      Authorization: token,
    },
  });
  socket.on("msgToClient", (payload) => {
    console.log("New msg", msg);
    queryClient.invalidateQueries(QUERY_COMMENT.GET_COMMENT);
  });
};

export default UseChatSocket;
