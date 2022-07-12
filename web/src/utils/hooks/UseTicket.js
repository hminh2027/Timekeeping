import axios from "axios";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url, token) =>
  axios({ url, headers: { Authorization: "Bearer " + token } }).then(
    (res) => res.data
  );
const UseTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [ticketTypes, setTicketTypes] = useState([]);
  const token = localStorage.getItem(process.env.AUTH_TOKEN);
  const { data, error } = useSWR(
    [`${process.env.APP_URL}ticket/me`, token],
    fetcher
  );

  return {
    tickets: data,
    isLoading: !error && !data,
    isError: error,
  };
  // }
};

export default UseTicket;
