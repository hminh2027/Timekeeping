import { LoadingOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space, Spin } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import api from "@/api/api";
import styles from "@/styles/pages/dashboard/ticket.module.scss";
import Router from "next/router";
const CheckTicket = (props) => {
  const [isApprove, setApprove] = useState(false);
  const [isReject, setReject] = useState(false);
  const [ticketData, setTicketData] = useState({
    startDate: moment(new Date(Date.now())).format("YYYY-MM-DD"),
    endDate: moment(new Date(Date.now())).format("YYYY-MM-DD"),
    title: "",
    content: "",
    ticketType: 0,
    recipient: {},
  });
  useEffect(() => {
    const fetchTikect = async () => {
      const res = await api.get(`ticket/${props.id}`);
      const { data } = res;
      setTicketData(data);
      console.log("data",data.startDate);
    };
    fetchTikect();
  }, []);
  
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
  return (
    <div className="card">
      <div className="card-body">
        <div  className = " text-xl font-bold text-center justify-center" style={{ fontSize: "1.25em", fontWeight: "bold" }}>
          Ticket Content
        </div>
        <div className={styles[`input-wrapper`]}>
          <div className={styles[`input-list`]}>
            <input
              className="w-full border border-solid border-gray-300 p-2"
              disabled
              type="text"
              name="title"
              value={ticketData.title}
              placeholder="Ticket title"
            />
            <div className="flex ">
              <div className="w-4/12 border border-solid border-gray-300 p-2 text-sm text-center justify-center">
                Start Date
              </div>
              <input
                className = "flex-1 border border-solid border-gray-300 p-2 text-gray-500"
                disabled
                type="text"
                name="startDate"
                value={new Date(ticketData.startDate).toLocaleString()}
              />
            </div>
            <div className="flex ">
              <div className="w-4/12 border border-solid border-gray-300 p-2 text-sm text-center justify-center">
                End Date
              </div>
              <input
                className = "flex-1 border border-solid border-gray-300 p-2 text-gray-500"
                disabled
                type="text"
                name="endDate"
                value={new Date(ticketData.endDate).toLocaleString()}
              />
            </div>
            <div className="flex ">
              <div className="w-4/12 border border-solid border-gray-300 p-2 text-sm text-center justify-center">
                Ticket Type
              </div>
              <input
                className = "flex-1 border border-solid border-gray-300 p-2 text-gray-500"
                disabled
                type="text"
                name="ticketType"
                value={ticketData.ticketType}
              />
            </div>
            <div className="flex" >
                <div className="w-4/12 border border-solid border-gray-300 p-2 text-sm text-center justify-center">Recipient Name</div>
                <input
                  className=" flex-1 border border-solid border-gray-300 p-2 text-gray-500"
                  disabled
                  name="recipientId"
                  value={ticketData.recipient.firstName+" "+ticketData.recipient.lastName}
                  placeholder="Search to Select"
                >
                </input>
            </div>
            <textarea
              className=" flex-grow w-full border border-solid border-gray-300 p-2 h-auto"
              disabled
              type="text"
              name="content"
              value={ticketData.content}
              placeholder="Ticket title"
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <button
            className="w-1/3 border border-solid border-teal-600 shadow-xl bg-teal-600 text-gray-100 p-1 hover:text-zinc-500 mr-4"
            type="primary"
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
          </button>
          <button
            className="w-1/3 border border-solid border-teal-600 shadow-xl bg-teal-600 text-gray-100 p-1 hover:text-zinc-500"
            type="primary"
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckTicket;
