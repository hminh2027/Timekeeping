import { LoadingOutlined } from "@ant-design/icons";
import { Select, Spin } from "antd";
import React, { useState } from "react";
import { extractMessages } from "@/utils/Formatter/ApiError";
import { useGetManagers } from "src/rest/user/user.query";
import { useUpdateTicketInfoQuery } from "@/rest/ticket/ticket.query";
import { SUBMIT_TICKET_TYPES } from "@/utils/constants/ticket_constants";
import { useQueryClient } from "@tanstack/react-query";
import { USER_TICKET } from "@/utils/constants/react-query";
import {
  GoTriangleLeft,
  GoTriangleRight,
  GoTriangleUp,
  GoTriangleDown,
} from "react-icons/go";
import moment from "moment";
import ChatBox from "@/components/Chat/ChatBox";

const { Option } = Select;

const TicketInfo = React.memo((props) => {
  const ticketData = props.ticketData;
  const ticketId = props.id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const { data: managers } = useGetManagers();
  const [data, setData] = useState(ticketData);
  const [isShowingComments, setIsShowingComments] = useState(true);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const queryClient = useQueryClient();
  const { mutate: updateTicketInfo } = useUpdateTicketInfoQuery();

  const today = () => {
    return moment(new Date(Date.now())).format("YYYY-MM-DD");
  };

  const submit = async () => {
    setIsSubmitting(true);
    const newInfo = {
      startDate: data.startDate,
      endDate: data.endDate,
      title: data.title,
      recipientId: data.recipient.id,
      content: data.content,
      ticketType: data.ticketType.value,
    };
    try {
      updateTicketInfo(
        { id: ticketId, ticketInfo: newInfo },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(USER_TICKET.TICKET_INFO);
          },
          onError: (err) => {
            throw new Error(err);
          },
        }
      );
    } catch (err) {
      const messages = extractMessages(err);
      const newErrors = [];
      newErrors.push({
        id: "submit-error",
        message: messages.reduce((message, text) => message + "\n" + text, ""),
        color: "red",
      });
      setErrors(newErrors);
    } finally {
      setIsSubmitting(false);
    }
  };

  const ticketContent = (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="card">
        <div className="card-body min-w-mobile lg:min-w-md">
          <div className="relative flex items-center">
            <div style={{ fontSize: "1.25em", fontWeight: "bold" }}>
              Ticket Content
            </div>
            <span
              className="absolute right-0 hidden cursor-pointer items-center  gap-4  lg:flex "
              onClick={() => setIsShowingComments(!isShowingComments)}
            >
              <div>Comments</div>
              {isShowingComments ? <GoTriangleRight /> : <GoTriangleLeft />}
            </span>
          </div>

          <div className="flex flex-col gap-2">
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
                value={data.title}
                placeholder="Ticket title"
                className="v-input w-full"
                onChange={(e) => {
                  handleChange(e);
                }}
                onPressEnter={() => {
                  submit();
                }}
              />
              <div className="flex items-center gap-4">
                <div style={{ minWidth: "9em" }}>Start Date</div>
                <input
                  type="date"
                  name="startDate"
                  value={data.startDate}
                  min={today()}
                  className="v-input flex-1"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  onPressEnter={() => {
                    submit();
                  }}
                />
              </div>
              <div className="flex items-center gap-4">
                <div style={{ minWidth: "9em" }}>End Date</div>
                <input
                  type="date"
                  name="endDate"
                  value={data.endDate}
                  min={today()}
                  className="v-input flex-1"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  onPressEnter={() => {
                    submit();
                  }}
                />
              </div>

              <div className="flex items-center gap-4">
                <div style={{ minWidth: "9em" }}>Ticket Type:</div>
                <Select
                  className="flex-grow"
                  name="type"
                  value={data.ticketType}
                  options={SUBMIT_TICKET_TYPES}
                  placeholder="Search to Select"
                  onChange={(value, option) => {
                    const e = {
                      target: {
                        name: "ticketType",
                        value: SUBMIT_TICKET_TYPES.filter(
                          (type) => type.value === value
                        )[0],
                      },
                    };
                    handleChange(e);
                  }}
                  onPressEnter={() => {
                    submit();
                  }}
                />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1em" }}>
                <div style={{ minWidth: "9em" }}>Recipient Name:</div>
                <Select
                  style={{
                    flexGrow: 2,
                  }}
                  name="recipientId"
                  value={data.recipient.id}
                  placeholder="Search to Select"
                  onChange={(value, option) => {
                    const e = { target: { name: "recipientId", value: value } };
                    handleChange(e);
                  }}
                  onPressEnter={() => {
                    submit();
                  }}
                >
                  {managers.map((manager, index) => (
                    <Option key={index} value={manager.id}>
                      {manager.firstName + " " + manager.lastName}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            <textarea
              rows={5}
              name="content"
              value={data.content}
              style={{ width: "100%" }}
              className="v-textarea"
              placeholder="Ticket Content"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <button
            className={`${
              data.status === "pending" ? "v-btn-primary" : "v-btn-disable"
            } w-full`}
            onClick={() => {
              submit();
            }}
            disabled={data.status === "pending" ? false : true}
          >
            {isSubmitting ? (
              <div className="space">
                <Spin indicator={<LoadingOutlined />} />
                <div>Submitting</div>
              </div>
            ) : (
              "Update"
            )}
          </button>
          {/* <span
            className="absolute bottom-0 flex w-full cursor-pointer items-center justify-center  gap-4    lg:hidden "
            onClick={() => setIsShowingComments(!isShowingComments)}
          >
            <div>Show Comments</div>
            {isShowingComments ? <GoTriangleUp /> : <GoTriangleDown />}
          </span> */}
        </div>
      </div>
      {isShowingComments && (
        <ChatBox
          id={ticketId}
          authorId={ticketData.author.id}
          className={"w-full"}
        />
      )}
    </div>
  );

  if (data) return ticketContent;
});

export default TicketInfo;
