import TicketInfo from "@/components/page/Dashboard/Ticket/TicketInfo";
import DashboardLayout from "@/layout/DashboardLayout";
import React from "react";
import { useGetTicketInfoQuery } from "@/rest/ticket/ticket.query";

const TicketDetails = (props) => {
  const { id } = props;
  // console.log(id);
  const { isLoading, error, data: ticketData } = useGetTicketInfoQuery(id);
  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Error :( </div>;

  const createdAt = new Date(ticketData.createdAt).toLocaleString();
  const updatedAt = new Date(ticketData.updatedAt).toLocaleString();
  if (ticketData)
    return (
      <div className="w-full lg:ml-4 ">
        <div className="py-10 text-3xl font-semibold ">Thông tin ticket</div>
        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="min-w-mobile ">
            <div className="card flex flex-col rounded-md">
              <div className="card-body p-2">
                <div className="py-2 px-1">
                  <div className="text-gray-500">Requestor:</div>
                  <div>{`${ticketData.author.lastName} ${ticketData.author.firstName}`}</div>
                </div>
                <div className="py-2 px-1">
                  <div className="text-gray-500">Recipient:</div>{" "}
                  <div>{`${ticketData.recipient.lastName} ${ticketData.recipient.firstName}`}</div>
                </div>
                <div className="py-2 px-1">
                  <div className="text-gray-500">Create date:</div>{" "}
                  <div>{createdAt}</div>
                </div>
                <div className="py-2 px-1">
                  <div className="text-gray-500">Lastest update:</div>
                  <div>{updatedAt}</div>
                </div>
                <div className="py-2 px-1">
                  <div className="text-gray-500">Status:</div>{" "}
                  <div>{ticketData.status}</div>
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
TicketDetails.layout = DashboardLayout;
export default TicketDetails;
export async function getServerSideProps(context) {
  const { id } = context.query;
  // TODO check ticket existence
  return {
    props: { id }, // will be passed to the page component as props
  };
}
