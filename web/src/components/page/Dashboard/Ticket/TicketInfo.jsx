import { LoadingOutlined } from "@ant-design/icons";
import { Input, Select, Spin } from "antd";
import React, { useState } from "react";
import { extractMessages } from "@/utils/Formatter/ApiError";
import { useGetManagers } from "src/rest/user/user.query";
import { useUpdateTicketInfoQuery } from "@/rest/ticket/ticket.query";
import { SUBMIT_TICKET_TYPES } from "@/utils/constants/ticket_constants";
import { useQueryClient } from "@tanstack/react-query";

const { Option } = Select;

const TicketInfo = React.memo((props) => {
  const ticketData = props.ticketData;
  const ticketId = props.id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const { data: managers } = useGetManagers();
  const [data, setData] = useState(ticketData.content);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const queryClient = useQueryClient();
  // console.log(data.recipient.id);
  const { mutate: updateTicketInfo } = useUpdateTicketInfoQuery();

  const submit = async () => {
    setIsSubmitting(true);
    const newInfo = {
      startDate: data.startDate,
      endDate: data.endDate,
      title: data.title,
      recipientId: data.recipientId,
      content: data.content,
      ticketType: data.ticketType,
    };
    try {
      updateTicketInfo(
        { id: ticketId, ticketInfo: newInfo },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["get-my-tickets-with-sort"]);
          },
          onError: (err) => {
            throw new Error(err);
          },
        }
      );
    } catch (err) {
      console.log(err);
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
    <div className="card m-3">
      <div className="card-body min-w-mobile lg:min-w-md">
        <div style={{ fontSize: "1.25em", fontWeight: "bold" }}>
          Ticket Content
        </div>
        <div className="space">
          {errors &&
            errors.map((error) => (
              <div style={{ color: error.color }}>{error.message}</div>
            ))}
        </div>
        <div className="flex flex-col w-full justify-center gap-5">
          <div className="flex flex-col flex-wrap w-full justify-start gap-4">
            <input
              autoFocus={true}
              type="text"
              name="title"
              value={data.title}
              placeholder="Ticket title"
              className="w-full v-input"
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
                className="flex-1 v-input"
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
                className="flex-1 v-input"
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
                value={data.recipientId}
                placeholder="Search to Select"
                onChange={(value, option) => {
                  console.log(value, option);

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
          className="v-btn-primary w-full"
          onClick={() => {
            submit();
          }}
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
      </div>
    </div>
  );

  if (data) return ticketContent;
});

export default TicketInfo;
