import api from "@/api/api";
import styles from "@/styles/pages/dashboard/ticket.module.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { Input, Select, Spin } from "antd";
import moment from "moment";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchMyTickets,
  updateTicket,
} from "@/redux/feature/ticket/ticketSlice";
import { TICKET_TYPES } from "@/utils/constants";
import { extractMessages } from "@/utils/Formatter/ApiError";
import { getTicket, updateMyTicket } from "@/api/service/ticket.service";

const { Option } = Select;

const SUBMIT_TICKET_TYPES = TICKET_TYPES.filter((type) => type.value !== "");
const TicketInfo = React.memo((props) => {
  const ticketID = props.ticketID;
  console.log("TICKETID:", ticketID);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const [ticketData, setTicketData] = useState({
    startDate: moment(new Date(Date.now())).format("YYYY-MM-DD"),
    endDate: moment(new Date(Date.now())).format("YYYY-MM-DD"),
    title: "",
    content: "",
    ticketType: SUBMIT_TICKET_TYPES[0].label,
    recipientId: managers,
  });
  const ticketTypes = SUBMIT_TICKET_TYPES;
  useEffect(() => {
    const fetchTicketData = async () => {
      const result = await getTicket(ticketID);
      console.log(result);
      const {
        title,
        type,
        startDate,
        endDate,
        recipient: { id },
        content,
      } = result.content;
      const ticketType = TICKET_TYPES.filter(
        (TICKET_TYPE) => TICKET_TYPE.value === type
      )[0];
      setTicketData({
        title,
        ticketType,
        startDate,
        endDate,
        recipientId: id,
        content,
      });
      // setTicketData(result.content);
    };
    fetchTicketData();
  }, []);

  const [managers, setManagers] = useState([]);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    const fetchManagers = async () => {
      const res = await api.get("user/admin");
      const { data } = res;
      setManagers(data);
      setTicketData({ ...ticketData, recipientId: data[0]?.id });
    };
    fetchManagers();
  }, []);
  const handleChange = (e) => {
    setTicketData({ ...ticketData, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    setIsSubmitting(true);

    try {
      const {
        startDate,
        endDate,
        title,
        recipientId,
        content,
        ticketType: { value },
      } = ticketData;
      const t = await updateMyTicket(ticketID, {
        startDate,
        endDate,
        title,
        recipientId,
        content,
        value,
      });
      console.log("T", t);
      dispatch(
        updateTicket(ticketID, {
          startDate,
          endDate,
          title,
          recipientId,
          content,
          value,
        })
      );
      props.hide();
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
  return (
    <div className="card">
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
        <div className={styles[`input-wrapper`]}>
          <div className={styles[`input-list`]}>
            <Input
              autoFocus={true}
              type="text"
              name="title"
              value={ticketData.title}
              placeholder="Ticket title"
              className={styles[`info-input`]}
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
              value={ticketData.startDate}
              addonBefore={<div style={{ minWidth: "6em" }}>Start Date</div>}
              className={styles[`info-input`]}
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
              value={ticketData.endDate}
              addonBefore={<div style={{ minWidth: "6em" }}>End Date</div>}
              className={styles[`info-input`]}
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
                name="ticketType"
                value={ticketData.ticketType}
                options={SUBMIT_TICKET_TYPES}
                // value={ticketTypes[0]}
                placeholder="Search to Select"
                onChange={(value, option) => {
                  // console.log(value, option);
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
              >
                {ticketTypes.map((ticketType, index) => (
                  <Option key={index} value={ticketType}>
                    {ticketType}
                  </Option>
                ))}
              </Select>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1em" }}>
              <div style={{ minWidth: "6em" }}>Recipient Name:</div>
              <Select
                style={{
                  flexGrow: 2,
                }}
                name="recipientId"
                value={ticketData.recipientId}
                placeholder="Search to Select"
                onChange={(value, option) => {
                  // console.log(value, option);
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
            value={ticketData.content}
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
            "Update"
          )}
        </button>
      </div>
    </div>
  );
});

export default TicketInfo;
