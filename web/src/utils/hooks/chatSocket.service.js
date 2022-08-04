import { notify } from "@/components/Common/Toast/Toastify";
import { QUERY_COMMENT } from "../constants/react-query";
export const onNewMessage = (payload) => {
  console.log("New msg", payload);

  notify("You have received a new message", "info");
  queryClient.invalidateQueries(QUERY_COMMENT.GET_COMMENT);
};
export const onSocketConnect = (socketId) => {
  console.log("Connected to", socketId);
};
