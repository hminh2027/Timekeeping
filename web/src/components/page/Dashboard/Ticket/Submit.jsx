import api from "@/api/api";
import styles from "@/styles/pages/dashboard/ticket.module.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { Input, Select, Spin } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTicket } from "@/redux/feature/ticket/ticketSlice";
import { TICKET_TYPES } from "@/utils/constants";
import { extractMessages } from "@/utils/Formatter/ApiError";
const { TextArea } = Input;
const { Option } = Select;
const SubmitTicket = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const [ticketData, setTicketData] = useState({
    startDate: moment(new Date(Date.now())).format("YYYY-MM-DD"),
    endDate: moment(new Date(Date.now())).format("YYYY-MM-DD"),
    title: "",
    content: "",
    ticketType: TICKET_TYPES[0].labeL,
    recipientId: 0,
  });
  const [ticketTypes, setTicketTypes] = useState(TICKET_TYPES);
  const [managers, setManagers] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchManagers = async () => {
      const res = await api.get("user/admin");
      const { data } = res;
      setManagers(data);
      // setTicketData({ ...ticketData, recipientId: data[0]?.id });
    };
    fetchManagers();
  }, []);
  const handleChange = (e) => {
    setTicketData({ ...ticketData, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    setIsSubmitting(true);

    try {
      // await api.post("ticket", ticketData);
      const { startDate, endDate, title, recipientId, content, ticketType } =
        ticketData;
      dispatch(
        addTicket({
          startDate,
          endDate,
          title,
          recipientId,
          content,
          ticketType: ticketType.value,
        })
      );
      props.hide();

      // console.log("Ticket:", ticketData);
      // Router.reload(window.location.pathname);
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
  console.log("TICKETDATA", ticketData);
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
                options={TICKET_TYPES}
                // value={ticketTypes[0]}
                placeholder="Search to Select"
                onChange={(value, option) => {
                  // console.log(value, option);
                  const e = {
                    target: {
                      name: "ticketType",
                      value: TICKET_TYPES.filter(
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
          <TextArea
            rows={5}
            name="content"
            value={ticketData.content}
            style={{ width: "100%" }}
            className={styles[`ticket-content`]}
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
            "Submit Ticket"
          )}
        </button>
      </div>
    </div>
  );
};

export default SubmitTicket;
