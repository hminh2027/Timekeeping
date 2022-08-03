import { LoadingOutlined } from "@ant-design/icons";
import { Input, Select, Spin } from "antd";
import React, { useState } from "react";
import { extractMessages } from "@/utils/Formatter/ApiError";
import { useGetManagers } from "src/rest/user/user.query";
import { SUBMIT_TICKET_TYPES } from "@/utils/constants/ticket_constants";
import moment from "moment";
import { useAddTicketMutation } from "@/rest/ticket/ticket.query";
import { useQueryClient } from "@tanstack/react-query";
const { Option } = Select;

const SubmitTicket = React.memo((props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const { data: managers } = useGetManagers();
  const [data, setData] = useState({
    startDate: moment(new Date(Date.now())).format("YYYY-MM-DD"),
    endDate: moment(new Date(Date.now())).format("YYYY-MM-DD"),
    title: "",
    content: "",
    ticketType: SUBMIT_TICKET_TYPES[0],
    recipientId: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const today = () => {
    return moment(new Date(Date.now())).format("YYYY-MM-DD");
  };
  const queryClient = useQueryClient();
  const { mutate: addTicket } = useAddTicketMutation();

  const submit = async () => {
    setIsSubmitting(true);
    try {
      const submitData = {
        startDate: data.startDate,
        endDate: data.endDate,
        title: data.title,
        content: data.content,
        ticketType: data.ticketType.value,
        recipientId: data.recipientId,
      };
      addTicket(submitData, {
        onSuccess: () => {
          queryClient.invalidateQueries(["get-my-tickets-with-sort"]);
          props.hide();
        },
        onError: (err) => {
          // throw new Error(err);
          const messages = extractMessages(err);
          const newErrors = [];
          newErrors.push({
            id: "submit-error",
            message: messages.reduce(
              (message, text) => message + "\n" + text,
              ""
            ),
            color: "red",
          });
          setErrors(newErrors);
        },
      });
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
    <div className="card">
      <div className="card-body min-w-mobile lg:min-w-md ">
        <div style={{ fontSize: "1.25em", fontWeight: "bold" }}>
          Ticket Content
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
                value={data.recipientId}
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
            "Submit"
          )}
        </button>
      </div>
    </div>
  );

  if (data) return ticketContent;
});

export default SubmitTicket;
