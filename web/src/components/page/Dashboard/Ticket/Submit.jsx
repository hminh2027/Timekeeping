import { LoadingOutlined } from "@ant-design/icons";
import { Input, Select, Spin } from "antd";
import React, { useState } from "react";
import { extractMessages } from "@/utils/Formatter/ApiError";
import { useGetManagers } from "src/rest/user/user.query";
import { SUBMIT_TICKET_TYPES } from "@/utils/constants/ticket_constants";
import moment from "moment";
const { Option } = Select;

const SubmitTicket = React.memo(() => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const { data: managers } = useGetManagers();
  const [data, setData] = useState({
    startDate: moment(new Date(Date.now())).format("YYYY-MM-DD"),
    endDate: moment(new Date(Date.now())).format("YYYY-MM-DD"),
    title: "",
    content: "",
    type: SUBMIT_TICKET_TYPES[0].label,
    recipientId: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  // console.log(data.recipient.id);
  const submit = async () => {
    setIsSubmitting(true);
    const newInfo = {
      startDate: data.startDate,
      endDate: data.endDate,
      title: data.title,
      recipientId: data.recipientId,
      content: data.content,
      type: data.type,
    };
    try {
      console.log("NEW", newInfo);
    } catch (err) {
      console.log("NEW", newInfo);

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
        <div className="flex flex-col w-full justify-center gap-5">
          <div className="flex flex-col flex-wrap w-full justify-start gap-4">
            <Input
              autoFocus={true}
              type="text"
              name="title"
              value={data.title}
              placeholder="Ticket title"
              className="w-full"
              onChange={(e) => {
                handleChange(e);
              }}
              onPressEnter={() => {
                submit();
              }}
            />
            <Input
              type="date"
              name="startDate"
              value={data.startDate}
              addonBefore={<div style={{ minWidth: "6em" }}>Start Date</div>}
              className="w-full"
              onChange={(e) => {
                handleChange(e);
              }}
              onPressEnter={() => {
                submit();
              }}
            />
            <Input
              type="date"
              name="endDate"
              value={data.endDate}
              addonBefore={<div style={{ minWidth: "6em" }}>End Date</div>}
              className="w-full"
              onChange={(e) => {
                handleChange(e);
              }}
              onPressEnter={() => {
                submit();
              }}
            />
            <div className="flex items-center gap-2">
              <div style={{ minWidth: "6em" }}>Ticket Type:</div>
              <Select
                className="flex-grow"
                name="type"
                value={data.type}
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
              <div style={{ minWidth: "6em" }}>Recipient Name:</div>
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
            className="textarea textarea-accent focus:outline-none"
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
