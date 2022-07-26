import { useQueryClient } from "@tanstack/react-query";
import {
  useApproveTicketMutation,
  useGetTicketQueryId,
  useDeleteTicketMutation,
  useRejectTicketMutation,
} from "src/rest/ticket/ticket.query";

const CheckTicket = (props) => {
  const { data: ticketData } = useGetTicketQueryId(props.id);
  console.log("dataTICKET", ticketData);
  return (
    <>
      <div className="card">
        <div className="card-body ">
          <div className=" text-xl font-bold text-center justify-center">
            Ticket Content
          </div>
          <div className="flex flex-col w-full justify-center gap-5">
            <div className="flex flex-col flex-wrap w-full justify-start gap-4">
              <input
                className="w-full border border-solid border-gray-300 p-2 text-gray-500"
                disabled
                type="text"
                name="title"
                value={ticketData?.title}
                placeholder="Ticket title"
              />
              <div className="flex ">
                <div className="w-4/12 border border-solid border-gray-300 p-2 text-sm text-center justify-center">
                  Start Date
                </div>
                <input
                  className="w-full border border-solid border-gray-300 p-2 text-gray-500"
                  disabled
                  type="text"
                  name="startDate"
                  value={new Date(ticketData?.startDate).toLocaleDateString()}
                />
                <div className="flex ">
                  <div className="w-4/12 border border-solid border-gray-300 p-2 text-sm text-center justify-center">
                    Start Date
                  </div>
                  <input
                    className="flex-1 border border-solid border-gray-300 p-2 text-gray-500"
                    disabled
                    type="text"
                    name="startDate"
                    value={new Date(ticketData?.startDate).toLocaleDateString()}
                  />
                </div>
                <input
                  className="flex-1 border border-solid border-gray-300 p-2 text-gray-500"
                  disabled
                  type="text"
                  name="endDate"
                  value={new Date(ticketData?.endDate).toLocaleDateString()}
                />
              </div>
              <div className="flex ">
                <div className="w-4/12 border border-solid border-gray-300 p-2 text-sm text-center justify-center">
                  Ticket Type
                </div>
                <input
                  className="flex-1 border border-solid border-gray-300 p-2 text-gray-500"
                  disabled
                  type="text"
                  name="ticketType"
                  value={ticketData?.ticketType}
                />
              </div>
              <div className="flex">
                <div className="w-4/12 border border-solid border-gray-300 p-2 text-sm text-center justify-center">
                  Author
                </div>
                <input
                  className=" flex-1 border border-solid border-gray-300 p-2 text-gray-500"
                  disabled
                  name="authorId"
                  value={
                    ticketData?.author.lastName +
                    " " +
                    ticketData?.author.firstName
                  }
                  placeholder="Search to Select"
                ></input>
              </div>
              <textarea
                className=" flex-grow w-full border border-solid border-gray-300 p-2 h-auto text-gray-500"
                disabled
                type="text"
                name="content"
                value={ticketData?.content}
                placeholder="Ticket title"
              />
            </div>
          </div>
          <ButtonTicket
            disabled={props.disabled}
            toggle={props.hide}
            id={props.id}
            status={ticketData?.ticketStatus}
          ></ButtonTicket>
        </div>
      </div>
    </>
  );
};

const ButtonTicket = ({ disabled, id, status, toggle }) => {
  const { mutate: doApprove } = useApproveTicketMutation();
  const queryClient = useQueryClient();
  async function handleApprove(data) {
    await doApprove(data, {
      onSuccess: () => {
        console.log("success");
        toggle(false);
        queryClient.invalidateQueries(["get-ticket"]);
      },
    });
  }
  const { mutate: doReject } = useRejectTicketMutation();
  async function handleReject(data) {
    await doReject(data, {
      onSuccess: () => {
        console.log("success");
        toggle(false);
        queryClient.invalidateQueries(["get-ticket"]);
      },
    });
  }
  if (!disabled) {
    return (
      <div className="w-full flex items-center justify-center">
        <button
          className="w-1/3 border border-solid border-teal-600 shadow-xl hover:bg-teal-600 hover:text-white p-1 rounded-lg text-black mr-2"
          type="primary"
          onClick={() => {
            handleApprove(id);
          }}
        >
          Approve
        </button>
        <button
          className="w-1/3 border border-solid border-red-500 shadow-xl hover:bg-red-500 hover:text-white p-1 rounded-lg text-black"
          type="primary"
          onClick={() => {
            handleReject(id);
          }}
        >
          Reject
        </button>
      </div>
    );
  } else {
    if (status == "approved")
      return (
        <div className="w-full flex items-center justify-center">
          <button
            className="w-1/3 border border-solid border-red-500 shadow-xl hover:bg-red-500 hover:text-white p-1 rounded-lg text-black mr-2"
            type="primary"
            onClick={() => {
              rejectHandler(id);
            }}
          >
            Reject
          </button>
          <Cancel id={id} toggle={toggle}></Cancel>
        </div>
      );
    else {
      return (
        <div className="w-full flex items-center justify-center">
          <button
            className="w-1/3 border border-solid border-teal-600 shadow-xl hover:bg-teal-600 hover:text-white p-1 rounded-lg text-black mr-2"
            type="primary"
            onClick={() => {
              approveHandler(id);
            }}
          >
            Approve
          </button>
          <Cancel id={id} toggle={toggle}></Cancel>
        </div>
      );
    }
  }
};
const Cancel = ({ id, toggle }) => {
  const { mutate: doDelete } = useDeleteTicketMutation();
  const queryClient = useQueryClient();
  async function handleDelete(data) {
    await doDelete(data, {
      onSuccess: () => {
        console.log("success");
        toggle(false);
        queryClient.invalidateQueries(["get-ticket"]);
      },
    });
  }
  return (
    <button
      className="w-1/3 border border-solid border-gray-500 shadow-xl bg-slate-200 hover:bg-gray-400 text-black p-1 rounded-lg hover:text-white"
      type="primary"
      onClick={() => {
        handleDelete(id);
      }}
    >
      cancel
    </button>
  );
};

export default CheckTicket;
