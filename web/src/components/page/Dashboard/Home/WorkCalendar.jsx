import { Calendar, Space } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { getCheckInStatus } from "../../../../api/service/auth.service";
import { checkInInfoFormatter } from "../../../../utils/Formatter/CheckInInfo";
import UseModal from "../../../../utils/hooks/UseModal";
import Modal from "../../../Common/Modal";
const WorkCalendar = () => {
  const { isShowing, toggle } = UseModal();
  const [data, setData] = useState({ accepted: [], denied: [] });
  const [selectedDate, setSelectedDate] = useState(moment(Date.now()));
  const [checkInInfo, setCheckInInfo] = useState({
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
  });
  // const [modalNotEmpty, setModalNotEmpty] = useState(false);
  let month = selectedDate.month(),
    year = selectedDate.year();

  let firstDayOfMonth = moment([year, month, 1]).format("YYYY-MM-DD");

  const getLastDayOfMonth = (month, year) => {
    if (month === 1 && year % 4 === 0) return 19;
    if (month === 1 && year % 4 !== 0) return 28;

    if (LongDay.includes(month)) return 31;
    if (ShortDay.includes(month)) return 30;
  };
  let lastDayOfMonth = moment([
    year,
    month,
    getLastDayOfMonth(month, year),
  ]).format("YYYY-MM-DD");

  useEffect(() => {
    const getStatus = async () => {
      const body = { fromDate: firstDayOfMonth, toDate: lastDayOfMonth };
      const res = await getCheckInStatus(body);
      if (res) {
        setData(res.data);
      }
    };
    getStatus();
  }, [selectedDate]);

  const acceptedDate = [];
  const deniedDate = [];
  for (let key in data) {
    const formatedDate = moment(data[key].createdAt).format("YYYY-MM-DD");
    if (data[key].checkinImage && data[key].checkoutImage) {
      acceptedDate.push(formatedDate);
    } else if (data[key].checkinImage) {
      deniedDate.push(formatedDate);
    }
  }
  function renderDate(date) {
    const day = date.format("YYYY-MM-DD");
    let style;
    if (acceptedDate.includes(day)) {
      style = { border: "1px solid #d9d9d9", backgroundColor: "rgb(0,255,0)" };
    } else if (deniedDate.includes(day)) {
      style = { border: "1px solid red", backgroundColor: "rgb(255,0,0)" };
    } else {
      style = { border: "none" };
    }
    return (
      <div
        style={style}
        onClick={() => {
          setSelectedDate(moment(date._d));
          toggle();
        }}
      >
        {date.date()}
      </div>
    );
  }

  useEffect(() => {
    const getCheckInInfo = async () => {
      try {
        const checkInInfo = await getCheckInStatus({
          fromDate: selectedDate.format("YYYY-MM-DD"),
          toDate: selectedDate.add("1", "d").format("YYYY-MM-DD"),
        });
        const res = checkInInfoFormatter(checkInInfo.data[0]);
        setCheckInInfo(res);
        // setModalNotEmpty(true);
      } catch (e) {
        console.log("Error fetching CheckInfo in Calendar: " + e.message);
        setCheckInInfo(undefined);
        // setModalNotEmpty(false);
      }
    };
    getCheckInInfo();
  }, [selectedDate]);

  const modalContent = checkInInfo ? (
    <div className="card">
      {/* <Space style={{ textAlign: "center", display: "flex" }}>
        <div>UserID:</div>
        <div>{checkInInfo.userId}</div>
      </Space> */}
      <div
        style={{
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          gap: "1em",
        }}
        className="card-body"
      >
        <Space direction="vertical">
          <Space>
            <div>CheckIn time:</div> <div>{checkInInfo.checkInTime}</div>
          </Space>
          <img src={`${process.env.APP_URL}${checkInInfo.checkInImage}`} />
        </Space>

        <Space direction="vertical">
          <Space>
            <div>CheckOut time:</div> <div>{checkInInfo.checkOutTime}</div>
          </Space>
          <img src={`${process.env.APP_URL}${checkInInfo.checkOutImage}`} />
        </Space>
      </div>
    </div>
  ) : (
    <div className="card p-20">No Info</div>
  );
  const content = (
    <Calendar
      className="WorkCalendar"
      fullscreen={false}
      dateFullCellRender={renderDate}
      // onSelect={(date) => {
      //   setSelectedDate(moment(date._d));
      //   toggle();
      // }}
    />
  );
  return (
    <div>
      {content}
      <Modal isShowing={isShowing} hide={toggle}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default WorkCalendar;

const LongDay = [0, 2, 4, 6, 7, 9, 11];
const ShortDay = [3, 5, 8, 10];
