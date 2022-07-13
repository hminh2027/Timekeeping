import api from "@/api/api";
import Card from "@/components/Common/Card";
import styles from "@/styles/pages/dashboard/ticket.module.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space, Spin } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
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
    ticketType: 0,
    recipientId: 0,
  });
  const [ticketTypes, setTicketTypes] = useState([]);
  const [managers, setManagers] = useState([]);
  useEffect(() => {
    const fetchTicketTypes = async () => {
      const res = await api.get("ticket/type");
      const { data } = res;
      console.log(data);
      setTicketTypes(data);
    };
    const fetchManagers = async () => {
      const res = await api.get("user/admin");
      const { data } = res;
      setManagers(data);
      setTicketData({ ...ticketData, recipientId: data[0].id });
    };
    fetchManagers();
    fetchTicketTypes();
  }, []);
  const handleChange = (e) => {
    setTicketData({ ...ticketData, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    setIsSubmitting(true);
    try {
      await api.post("ticket", ticketData);
      props.hide();
      props.onSubmit();
    } catch (err) {
      const newErrors = [];
      const {
        response: {
          data: { message },
        },
      } = err;
      newErrors.push({
        id: "submit-error",
        message: message,
        color: "red",
      });
      setErrors(newErrors);
    } finally {
      setIsSubmitting(false);
      props.onSubmit();
    }
  };
  return (
    <Card className={styles[`ticket-card`]}>
      <Space direction="vertical">
        {errors &&
          errors.map((error) => (
            <div style={{ color: error.color }}>{error.message}</div>
          ))}
      </Space>
      <div style={{ fontSize: "1.25em", fontWeight: "bold" }}>
        Ticket Content
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
          <Space wrap>
            <div style={{ minWidth: "6em" }}>Ticket Type:</div>
            <Select
              style={{
                flexGrow: 2,
              }}
              name="ticketType"
              // value={ticketData.ticketType}
              value={ticketTypes[0]}
              placeholder="Search to Select"
              onChange={(value, option) => {
                // console.log(value, option);
                const e = { target: { name: "ticketType", value: value } };
                handleChange(e);
              }}
              onPressEnter={() => {
                submit();
              }}
            >
              {ticketTypes.map((ticketType, index) => (
                <Option value={ticketType}>{ticketType}</Option>
              ))}
            </Select>
          </Space>
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
              {managers.map((manager) => (
                <Option value={manager.id}>
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
      <Button
        type="primary"
        style={{ width: "100%" }}
        onClick={() => {
          submit();
        }}
      >
        {isSubmitting ? (
          <Space>
            <Spin indicator={<LoadingOutlined />} />
            <div>Submitting</div>
          </Space>
        ) : (
          "Submit Ticket"
        )}
      </Button>
    </Card>
  );
};

export default SubmitTicket;
