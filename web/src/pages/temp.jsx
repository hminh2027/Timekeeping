import Pagination from "@/components/Common/Pagination";
import UseChatSocket from "@/utils/hooks/UseChatSocket";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
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
  const socket = UseChatSocket();
  // client-side

  // socket.on("msgToClient", (msg) => {
  //   console.log("New msg", msg);
  //   queryClient.invalidateQueries("get-comment");
  // });
};

export default temp;
