import { LoadingOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space, Spin } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import api from "../../../../api/api";
import styles from "../../../../styles/pages/dashboard/ticket.module.scss";
import Router from "next/router";
const { TextArea } = Input;
const { Option } = Select;
const CheckTicket = (props) => {
  const [isApprove, setApprove] = useState(false); 
  const [isReject, setReject] = useState(false); 
  const [errors, setErrors] = useState([]);
  const [ticketData, setTicketData] = useState({
    startDate: moment(new Date(Date.now())).format("YYYY-MM-DD"),
    endDate: moment(new Date(Date.now())).format("YYYY-MM-DD"),
    title: "",
    content: "",
    ticketType: 0,
    recipientId: 0,
  });
  useEffect(() => {
    const fetchTikect = async () => {
      const res = await api.get(`ticket/${props.id}`);
      const {data} = res;
      console.log("data", data)
      setTicketData(data);
    }
    fetchTikect();
    // fetchManagers();
    // fetchTicketTypes();
  }, []);
  // const handleChange = (e) => {
  //   setTicketData({ ...ticketData, [e.target.name]: e.target.value });
  //   // setErrors([]);
  // };
  // console.log(ticketData);
  const approve = async () => {
    setApprove(true);
    try {
      await api.patch(`ticket/${props.id}/approve`);
      Router.reload(window.location.pathname);
    } catch (err) {
      setErrors([])
    } finally {
      setApprove(false);
    }
  }

  const reject = async () => {
    setReject(true);
    try {
      await api.patch(`ticket/${props.id}/reject`)
      Router.reload(window.location.pathname);
    } catch (err) {
      setErrors([])
    } finally {
      setReject(false)
    }
  }
  return (
    <div className={styles[`ticket-card`]}>
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
            disabled
            type="text"
            name="title"
            value={ticketData.title}
            placeholder="Ticket title"
            className={styles[`info-input`]}
          />
          <Input
            disabled
            type="text"
            name="startDate"
            value={ticketData.startDate}
            addonBefore={<div style={{ minWidth: "6em" }}>Start Date</div>}
            className={styles[`info-input`]}
          />
          <Input
            disabled
            type="text"
            name="endDate"
            value={ticketData.endDate}
            addonBefore={<div style={{ minWidth: "6em" }}>End Date</div>}
            className={styles[`info-input`]}
          />
          <Space wrap>
            <div style={{ minWidth: "6em" }}>Ticket Type:</div>
            <Input
              disabled
              style={{
                flexGrow: 2,
              }}
              name="ticketType"
              // value={ticketData.ticketType}
              // value={ticketTypes[0]}
              placeholder="Search to Select"

            >
              {ticketData.ticketType}
            </Input>
          </Space>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1em" }}>
            <div style={{ minWidth: "6em" }}>Recipient Name:</div>
            <Input
              disabled
              style={{
                flexGrow: 2,
              }}
              name="recipientId"
              value={ticketData.recipientId}
              placeholder="Search to Select"
            >
              {/* {ticketData.} */}
            </Input>
          </div>
        </div>
        <TextArea
          rows={5}
          disabled
          name="content"
          value={ticketData.content}
          style={{ width: "100%" }}
          className={styles[`ticket-content`]}
          placeholder="Ticket Content"
        />
      </div>
      <div style={{width: "100%", }}>
        <Button
          type="primary"
          style={{ width: "30%", margin: "0px 20px 0px 40px"}}
          onClick={() => {
            approve();
          }}
        >
          {isApprove ? (
            <Space>
              <Spin indicator={<LoadingOutlined />} />
              <div>Approve</div>
            </Space>
          ) : (
            "Approve"
          )}
        </Button>
        <Button

        type="primary"
        style={{ width: "30%", margin: "0px 20px 0px"}}
        onClick={() => {
          reject();
        }}
      >
        {isReject ? (
          <Space>
            <Spin indicator={<LoadingOutlined />} />
            <div>Reject</div>
          </Space>
        ) : (
          "Reject"
        )}
      </Button>
      
      </div>
      
    </div>
  );
};

export default CheckTicket;
