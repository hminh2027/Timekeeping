import { QUERY_COMMENT } from "../constants/react-query";
export const onNewMessage = (payload) => {
  console.log("New msg", payload);
  queryClient.invalidateQueries(QUERY_COMMENT.GET_COMMENT);
};
export const onSocketConnect = (socketId) => {
  console.log("Connected to", socketId);
};
