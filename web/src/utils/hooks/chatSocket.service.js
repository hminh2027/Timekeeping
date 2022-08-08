import { notify } from "@/components/Common/Toast/Toastify";
import { useQueryClient } from "@tanstack/react-query";

export const onNewMessage = (payload) => {
  notify("You have received a new message", "info");
};
export const onSocketConnect = (socketId) => {
  console.log("Connected to", socketId);
};
