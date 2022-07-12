import { Button, Space } from "antd";
import moment from "moment";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectUserCheckInInfo,
  selectUserCheckInStatus,
} from "../../../../../redux/feature/user/userSlice";
import styles from "../../../../../styles/pages/dashboard/checkin.module.scss";
import UseTrans from "../../../../../utils/hooks/UseTrans";
import CheckingCard from "../CheckingCard";
const CheckInContent = () => {
  const trans = UseTrans();
  const checkInStatus = useSelector(selectUserCheckInStatus);
  const checkInInfo = useSelector(selectUserCheckInInfo);
  const [isChecking, setIsChecking] = useState(false);
  const [checkedImg, setCheckedImg] = useState("");
  const [checkInTime, setCheckInTime] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    const getStatus = async () => {
      try {
        if (checkInStatus) {
          setCheckedImg(checkInInfo.checkinImage);
          setCheckInTime(
            moment(checkInInfo.createdAt).format("YYYY-MM-DD HH:mm:ss")
          );
        }
      } catch (error) {}
    };
    getStatus();
  }, [checkInStatus]);
  const notCheckedCard = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        width: "100%",
      }}
      direction="vertical"
      className={styles.card}
    >
      <div>{trans.check.checkin.not_checked_in}</div>
      <div>{trans.check.checkin.please_check_in}</div>
      <Button
        type="primary"
        className="v-btn"
        onClick={() => {
          setIsChecking(true);
        }}
      >
        {trans.check.checkin.checkin_now}
      </Button>
    </div>
  );
  console.log("CheckInTIme: ", checkInTime);
  const checkedCard = (
    <>
      <Space
        style={{ width: "100%" }}
        direction="vertical"
        className={styles.card}
      >
        <div>
          {trans.check.checkin.checked_in} {checkInTime}
        </div>
        <div>{trans.check.greeting}</div>
      </Space>
    </>
  );
  const url = `http://localhost:3000/${checkedImg}`;
  console.log(url);
  const checkedImage = (
    <div className={styles.card} style={{ padding: "0.5em" }}>
      <img src={url} width="300" height="300" layout="fill" />
    </div>
  );
  const redirectCheckOut = (
    <Space>
      <div>Already checked in! Wanna Checkout?</div>
      <Button
        type="primary"
        onClick={() => {
          Router.push("/dashboard/checkout");
        }}
      >
        Go to Checkout
      </Button>
    </Space>
  );
  const content = (
    <>
      <Space>
        {checkInStatus ? checkedCard : notCheckedCard}
        {checkInStatus && <div>Here's your image 👉</div>}
        {checkInStatus && checkedImage}
      </Space>
      {error && (
        <div style={{ color: "rgb(230,30,10)" }}>
          Lỗi rồi : {error.message} 😔😔😔
        </div>
      )}
      {checkInStatus && redirectCheckOut}
      {isChecking && (
        <CheckingCard
          setIsChecking={setIsChecking}
          setError={setError}
          state={"checkin"}
        />
      )}
    </>
  );
  return (
    <div
      style={{
        display: "flex",
        // alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
      className={styles.checkin}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",

          width: "100%",
          margin: "0 auto",
          padding: "2em",
          gap: "0.5em",
        }}
      >
        {content}
      </div>
    </div>
  );
};

export default CheckInContent;
