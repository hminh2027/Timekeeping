import TicketInfo from "@/components/page/admin/ManageTicket/TicketInfo";
import React, { useState } from "react";
import { useGetTicketInfoQuery } from "@/rest/ticket/ticket.query";
import AdminLayout from "@/layout/AdminLayout/AdminLayout";
const Ticket = (props) => {
  const { id } = props;
  // console.log(id);
  const { isLoading, error, data: ticketData } = useGetTicketInfoQuery(id);
  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Error :( </div>;
  console.log("TICKET DATA ID ROUTER", ticketData);

  const createDate = new Date(ticketData.content.createDate).toLocaleString();
  const updateDate = new Date(ticketData.content.updateDate).toLocaleString();
  if (ticketData)
    return (
      <div className="ml-4 w-full ">
        <div className="py-10 text-3xl font-semibold ">Thông tin ticket</div>
        <div className="flex gap-12">
          <div className="min-w-mobile ">
            <div className="card flex flex-col rounded-md">
              <div className="card-body p-2">
                <div className="py-2 px-1">
                  <div className="text-gray-500">Requestor:</div>
                  <div>{`${ticketData.content.author.lastName} ${ticketData.content.author.firstName}`}</div>
                </div>
                <div className="py-2 px-1">
                  <div className="text-gray-500">Recipient:</div>{" "}
                  <div>{`${ticketData.content.recipient.lastName} ${ticketData.content.recipient.firstName}`}</div>
                </div>
                <div className="py-2 px-1">
                  <div className="text-gray-500">Create date:</div>{" "}
                  <div>{createDate}</div>
                </div>
                <div className="py-2 px-1">
                  <div className="text-gray-500">Lastest update:</div>
                  <div>{updateDate}</div>
                </div>
                <div className="py-2 px-1">
                  <div className="text-gray-500">Status:</div>{" "}
                  <div>{ticketData.content.status}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <TicketInfo ticketData={ticketData} id={id} />
          </div>
        </div>
      </div>
    );
};
Ticket.layout = AdminLayout;
export default Ticket;
export async function getServerSideProps(context) {
  const { id } = context.query;
  return {
    props: { id }, // will be passed to the page component as props
  };
}
