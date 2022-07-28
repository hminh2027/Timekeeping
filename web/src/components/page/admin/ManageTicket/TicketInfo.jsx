import React, { useState } from "react";
import { useGetManagers } from "src/rest/user/user.query";
import { useQueryClient } from "@tanstack/react-query";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";
import {
  useApproveTicketMutation,
  useDeleteTicketMutation,
  useRejectTicketMutation,
} from "src/rest/ticket/ticket.query";
import { useRouter } from "next/router";
import ChatBox from "@/components/Chat/ChatBox";

const TicketInfo = React.memo((props) => {
  const ticketData = props.ticketData;
  const ticketId = props.id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const { data: managers } = useGetManagers();
  const [data, setData] = useState(ticketData.content);
  console.log(data);
  const [isShowingComments, setIsShowingComments] = useState(true);
  const queryClient = useQueryClient();

  const ticketContent = (
    <div className="flex gap-4">
      <div className="card">
        <div className="card-body min-w-mobile lg:min-w-md">
          <div className="relative flex items-center">
            <div style={{ fontSize: "1.25em", fontWeight: "bold" }}>
              Ticket Content
            </div>
            <span
              className="absolute right-0 flex cursor-pointer  items-center  gap-4"
              onClick={() => setIsShowingComments(!isShowingComments)}
            >
              <div>Comments</div>
              {isShowingComments ? <GoTriangleRight /> : <GoTriangleLeft />}
            </span>
          </div>

          <div className="space">
            {errors &&
              errors.map((error) => (
                <div style={{ color: error.color }}>{error.message}</div>
              ))}
          </div>
          <div className="flex w-full flex-col justify-center gap-5">
            <div className="flex w-full flex-col flex-wrap justify-start gap-4">
              <input
                autoFocus={true}
                type="text"
                name="title"
                disabled
                value={data.title}
                placeholder="Ticket title"
                className="v-input w-full"
              />
              <div className="flex items-center gap-4">
                <div style={{ minWidth: "9em" }}>Start Date</div>
                <input
                  type="date"
                  name="startDate"
                  disabled
                  value={data.startDate}
                  className="v-input flex-1"
                />
              </div>
              <div className="flex items-center gap-4">
                <div style={{ minWidth: "9em" }}>End Date</div>
                <input
                  type="date"
                  name="endDate"
                  value={data.endDate}
                  disabled
                  className="v-input flex-1"
                />
              </div>
              <div className="flex items-center gap-4">
                <div style={{ minWidth: "9em" }}>Ticket Type:</div>
                <input
                  type="text"
                  name="type"
                  value={data.ticketType}
                  disabled
                  className="v-input flex-1"
                />
              </div>
              <div className="flex items-center gap-4">
                <div style={{ minWidth: "9em" }}>Author:</div>
                <input
                  type="text"
                  name="author"
                  value={data.author.lastName + " " + data.author.firstName}
                  disabled
                  className="v-input flex-1"
                />
              </div>
            </div>
            <textarea
              rows={5}
              name="content"
              value={data.content}
              style={{ width: "100%" }}
              className="v-textarea"
              placeholder="Ticket Content"
              disabled
            />
          </div>
          <ButtonTicket id={ticketId} status={data.status}></ButtonTicket>
        </div>
      </div>
      {isShowingComments && (
        <ChatBox id={ticketId} authorId={ticketData.content.author.id} />
      )}
    </div>
  );
  if (data) return ticketContent;
});

const ButtonTicket = ({ id, status }) => {
  const router = useRouter();
  const { mutate: doApprove } = useApproveTicketMutation();
  const queryClient = useQueryClient();
  async function handleApprove(id) {
    await doApprove(id, {
      onSuccess: () => {
        console.log("success");
        // router.push(`/admin/ticket/${id}`)
        router.reload(window.location.pathname);
        queryClient.invalidateQueries(["get-ticket-id"]);
      },
    });
  }
  const { mutate: doReject } = useRejectTicketMutation();
  async function handleReject(id) {
    await doReject(id, {
      onSuccess: () => {
        console.log("success");
        // router.push(`/admin/ticket/${id}`)
        router.reload(window.location.pathname);
        queryClient.invalidateQueries(["get-ticket-id"]);
      },
    });
  }
  if (status == "pending") {
    return (
      <div className="flex w-full items-center justify-center">
        <button
          className="mr-2 w-1/3 rounded-lg border border-solid border-teal-600 p-1 text-black shadow-xl hover:bg-teal-600 hover:text-white"
          type="primary"
          onClick={() => {
            handleApprove(id);
          }}
        >
          Approve
        </button>
        <button
          className="w-1/3 rounded-lg border border-solid border-red-500 p-1 text-black shadow-xl hover:bg-red-500 hover:text-white"
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
        <div className="flex w-full items-center justify-center">
          <button
            className="w-1/3 rounded-lg border border-solid border-red-500 p-1 text-black shadow-xl hover:bg-red-500 hover:text-white"
            type="primary"
            onClick={() => {
              handleReject(id);
            }}
          >
            Reject
          </button>
          <Cancel id={id}></Cancel>
        </div>
      );
    else {
      return (
        <div className="flex w-full items-center justify-center">
          <button
            className="mr-2 w-1/3 rounded-lg border border-solid border-teal-600 p-1 text-black shadow-xl hover:bg-teal-600 hover:text-white"
            type="primary"
            onClick={() => {
              handleApprove(id);
            }}
          >
            Approve
          </button>
          <Cancel id={id}></Cancel>
        </div>
      );
    }
  }
};
const Cancel = ({ id }) => {
  const router = useRouter();
  const { mutate: doDelete } = useDeleteTicketMutation();
  const queryClient = useQueryClient();
  async function handleDelete(data) {
    await doDelete(data, {
      onSuccess: () => {
        console.log("success");
        router.push(`/admin/ticket/${id}`);
        queryClient.invalidateQueries(["get-ticket"]);
      },
    });
  }
  return (
    <button
      className="w-1/3 rounded-lg border border-solid border-gray-500 bg-slate-200 p-1 text-black shadow-xl hover:bg-gray-400 hover:text-white"
      type="primary"
      onClick={() => {
        handleDelete(id);
      }}
    >
      cancel
    </button>
  );
};

export default TicketInfo;
