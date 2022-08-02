import Pagination from "@/components/Common/Pagination";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { io } from "socket.io-client";
const temp = () => {
  return (
    <div>
      <Pagination totalPages={10} curPage={1} size={5} />
      <Chat></Chat>
    </div>
  );
};

const Chat = () => {
  const queryClient = useQueryClient();
  // const token =
  // typeof window !== "undefined" ? localStorage.getItem("AUTH_TOKEN") : null;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZmlyc3ROYW1lIjoiSm9obiIsImxhc3ROYW1lIjoiV2ljayIsImVtYWlsIjoidGVzdEB2ZHRzb2wuY29tIiwicm9sZSI6ImFkbWluIiwiY3JlYXRlZEF0IjoiMjAyMi0wNy0yNVQxMDozNjoyMi4yNTlaIiwiaWF0IjoxNjU5NDEyNzQ3LCJleHAiOjE2NTk0MjM1NDd9.NqzisdNL31gcTnZQ4OWtnowptYbF5DnKoVKE8YU0LW4";
  const socket = io("https://f909-14-248-82-243.ap.ngrok.io/", {
    reconnection: false,
    extraHeaders: {
      Authorization: token,
    },
  });
  // client-side

  socket.on("msgToClient", (msg) => {
    console.log("New msg", msg);
    queryClient.invalidateQueries("get-comment");
  });
};

export default temp;
