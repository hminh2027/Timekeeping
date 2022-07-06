import { Calendar } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { getCheckInStatus } from "../../../../api/service/auth.service";

const WorkCalendar = () => {
  const [data, setData] = useState({ accepted: [], denied: [] });
  const [selectedDate, setSelectedDate] = useState(moment(Date.now()));
  let month = selectedDate.month(),
    year = selectedDate.year();
  console.log(month, year);

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
        // console.log(body);
        // console.log(res.data);
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
  function onFullRender(date) {
    const day = date.format("YYYY-MM-DD");
    let style;
    if (acceptedDate.includes(day)) {
      style = { border: "1px solid #d9d9d9", backgroundColor: "rgb(0,255,0)" };
      console.log(day);
    } else if (deniedDate.includes(day)) {
      style = { border: "1px solid red", backgroundColor: "rgb(255,0,0)" };
    } else {
      style = { border: "none" };
    }
    return <div style={style}>{date.date()}</div>;
  }
  const content = (
    <Calendar
      fullscreen={false}
      // onChange={(date) => console.log(date)}
      dateFullCellRender={onFullRender}
      onPanelChange={(date) => {
        setSelectedDate(moment(date._d));
        console.log(date._d);
      }}
    />
  );
  return <div>{content}</div>;
};

export default WorkCalendar;

const LongDay = [0, 2, 4, 6, 7, 9, 11];
const ShortDay = [3, 5, 8, 10];
