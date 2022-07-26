import TicketInfo from "@/components/page/Dashboard/Ticket/TicketInfo";
import DashboardLayout from "@/layout/DashboardLayout";
import React from "react";
import { useGetTicketInfoQuery } from "@/rest/ticket/ticket.query";

const TicketDetails = (props) => {
  const { id } = props;
  console.log(id);
  const {
    isLoading,
    error,
    isStale,
    status,
    data: ticketData,
  } = useGetTicketInfoQuery(id);
  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Error :( </div>;
  if (ticketData) return <TicketInfo ticketData={ticketData} />;
};
TicketDetails.layout = DashboardLayout;
export default TicketDetails;
export async function getServerSideProps(context) {
  const { id } = context.query;
  return {
    props: { id }, // will be passed to the page component as props
  };
}
