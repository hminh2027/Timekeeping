import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { getCheckInStatus } from "@/api/service/auth.service";
import {
  fetchMyTickets,
  selectTickets,
} from "@/redux/feature/ticket/ticketSlice";
import { useSelector, useDispatch } from "react-redux";
import { convertCheckInListToArray } from "@/utils/helper/workcalendar";
import { getDateArray } from "@/utils/helper/workcalendar";
import Modal from "@/components/Common/Modal";
import UseModal from "@/utils/hooks/UseModal";
import { checkInInfoFormatter } from "@/utils/Formatter/CheckInInfo";
import Image from "next/image";
function isSameDay(a, b) {
  return moment(a).isSame(moment(b), "date");
}
const checkInInfoInit = {
  id: "NULL",
  checkinImage: "NULL",
  checkinLatitude: "NULL",
  checkinLongitude: "NULL",
  checkoutImage: "NULL",
  checkoutLatitude: "NULL",
  checkoutLongitude: "NULL",
  checkInTime: new Date(Date.now()),
  checkOutTime: new Date(Date.now()),
  userId: "NULL",
};
const ReactCalendar = () => {
  const dispatch = useDispatch();
  const { isShowing, toggle } = UseModal();
  const [curDate, setCurDate] = useState(new Date());
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [data, setData] = useState({
    accepted: [],
    denied: [],
    approved: [],
  });
  const [checkInInfo, setCheckInInfo] = useState(checkInInfoInit);
  const tickets = useSelector(selectTickets);

  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (data.accepted.find((dDate) => isSameDay(dDate, date))) {
        return "calendar-bg-green";
      }
      if (data.denied.find((dDate) => isSameDay(dDate, date))) {
        return "calendar-bg-red";
      }
      if (data.approved) {
        if (data.approved.find((dDate) => isSameDay(dDate, date))) {
          return "calendar-bg-gray hover:text-black";
        }
      }
    }
  }
  useEffect(() => {
    const approvedDays = [];
    tickets?.forEach((ticket) => {
      const res = getDateArray(ticket);
      return approvedDays.push(...res);
    });
    console.log("DATA", approvedDays);
    setData({ ...data, approved: approvedDays });
    const getStatus = async () => {
      const res = await getCheckInStatus();
      if (res) {
        const { accepted, denied } = convertCheckInListToArray(res.data);
        setData({ ...data, accepted, denied });
      }
    };
    getStatus();
  }, [tickets]);

  useEffect(() => {
    const fetchTicketData = async () => {
      dispatch(fetchMyTickets());
    };
    fetchTicketData();
  }, [curDate]);
  useEffect(() => {
    const fetchCheckInInfo = async () => {
      try {
        const res = await getCheckInStatus({
          fromDate: moment(curDate).format("YYYY-MM-DD"),
          toDate: moment(curDate).add(1, "d").format("YYYY-MM-DD"),
        });

        setCheckInInfo(checkInInfoFormatter(res.data[0]));
      } catch (err) {
        console.error(err);
        setCheckInInfo(undefined);
      } finally {
        setLoadingInfo(false);
      }
    };
    fetchCheckInInfo();
  }, [curDate]);

  const noInfoCard = <div className="p-20">No Info</div>;
  const infoCard = (
    <>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <div>CheckIn time:</div>
          <div>{checkInInfo && checkInInfo.checkInTime}</div>
        </div>
        <div className="max-w-xs">
          <img
            src={`${process.env.APP_URL}${
              checkInInfo && checkInInfo.checkInImage
            }`}
            className="w-full h-full aspect-video"
            crossOrigin="anonymous"
          />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-4">
          <div>CheckOut time:</div>
          <div>{checkInInfo && checkInInfo.checkOutTime}</div>
        </div>
        <div className="max-w-xs">
          <img
            src={`${process.env.APP_URL}${
              checkInInfo && checkInInfo.checkOutImage
            }`}
            className="w-full h-full aspect-video"
            crossOrigin="anonymous"
          />
        </div>
      </div>
    </>
  );

  const modalContent = (
    <div className={`card `}>
      <div
        style={{
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          gap: "1em",
        }}
        className="card-body"
      >
        <div className="flex flex-col items-center justify-center p-20">
          {loadingInfo ? (
            <div className="text-3xl animate-spin">⏳</div>
          ) : checkInInfo ? (
            infoCard
          ) : (
            noInfoCard
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Calendar
        onClickDay={(day, event) => {
          setCheckInInfo(null);
          setLoadingInfo(true);
          setCurDate(day);

          toggle();
        }}
        value={curDate}
        tileClassName={tileClassName}
        className="name"
      />
      <Modal isShowing={isShowing} hide={toggle}>
        {modalContent}
      </Modal>
    </>
  );
};
export default ReactCalendar;
