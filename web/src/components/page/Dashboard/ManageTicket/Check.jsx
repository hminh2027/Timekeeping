import { LoadingOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space, Spin } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import api from "@/api/api";
import styles from "@/styles/pages/dashboard/ticket.module.scss";
import Router from "next/router";
const { TextArea } = Input;
const { Option } = Select;
const CheckTicket = (props) => {
  const [isApprove, setApprove] = useState(false);
  const [isReject, setReject] = useState(false);
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
  const [comment, setComment] = useState({
    comment: "",
    titleId: props.id,
  });
  useEffect(() => {
    const fetchTikect = async () => {
      const res = await api.get(`ticket/${props.id}`);
      const { data } = res;
      setTicketData(data);
    };
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
      setErrors([]);
    } finally {
      setApprove(false);
    }
  };

  const reject = async () => {
    setReject(true);
    try {
      await api.patch(`ticket/${props.id}/reject`);
      Router.reload(window.location.pathname);
    } catch (err) {
      setErrors([]);
    } finally {
      setReject(false);
    }
  };

  const addComment = async () => {};

  const submit = async () => {
    setIsSubmitting(true);
    // console.log(ticketData);
    try {
      await api.post("ticket", ticketData);
      props.hide();
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
    }
  };
  return (
    <div className="card">
      <div className="card-body">
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
              // onChange={(e) => {
              //   handleChange(e);
              // }}
              // onPressEnter={() => {
              //   submit();
              // }}
            />
            <Input
              disabled
              type="text"
              name="startDate"
              value={ticketData.startDate}
              addonBefore={<div style={{ minWidth: "6em" }}>Start Date</div>}
              className={styles[`info-input`]}
              // onChange={(e) => {
              //   handleChange(e);
              // }}
              // onPressEnter={() => {
              //   submit();
              // }}
            />
            <Input
              disabled
              type="text"
              name="endDate"
              value={ticketData.endDate}
              addonBefore={<div style={{ minWidth: "6em" }}>End Date</div>}
              className={styles[`info-input`]}
              // onChange={(e) => {
              //   handleChange(e);
              // }}
              // onPressEnter={() => {
              //   submit();
              // }}
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
                // onChange={(value, option) => {
                //   // console.log(value, option);
                //   const e = { target: { name: "ticketType", value: value } };
                //   handleChange(e);
                // }}
                // onPressEnter={() => {
                //   submit();
                // }}
              >
                {/* {ticketTypes.map((ticketType, index) => (
                <Option value={ticketType}>{ticketType}</Option>
              ))} */}
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
                // onChange={(value, option) => {
                //   // console.log(value, option);
                //   const e = { target: { name: "recipientId", value: value } };
                //   handleChange(e);
                // }}
                // onPressEnter={() => {
                //   submit();
                // }}
              >
                {/* {managers.map((manager) => (
                <Option value={manager.id}>
                  {manager.firstName + " " + manager.lastName}
                </Option>
              ))} */}
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
            // onChange={(e) => {
            //   handleChange(e);
            // }}
          />
          {/* <div className="flex">
          <TextArea
            rows= {2}
            name= "comment"
            value= {ticketData.comment}
            style={{width: "95%"}}
            className={styles[`ticket-content`]}
            placeholder="Comment"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <Button
            type="primary"
            style={{ width: "5%", height: "54px"}}
            onClick={() => {
              submit();
            }}
          >
            {isSubmitting ? (
              <Space>
                <Spin indicator={<LoadingOutlined />} />
                <div>AddComment</div>
              </Space>
            ) : (
              "Add"
            )}
          </Button>
        </div> */}
        </div>
        <div style={{ width: "100%" }}>
          <Button
            type="primary"
            style={{ width: "30%", margin: "0px 20px 0px 40px" }}
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
            style={{ width: "30%", margin: "0px 20px 0px" }}
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
    </div>
  );
};

export default CheckTicket;
