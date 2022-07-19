import { Button, Space } from "antd";
import moment from "moment";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectUserCheckInInfo,
  selectUserCheckOutStatus,
} from "@/redux/feature/user/userSlice";
import styles from "@/styles/pages/dashboard/checkin.module.scss";
import UseTrans from "@/utils/hooks/UseTrans";
import CheckingCard from "../CheckingCard";

const CheckInContent = () => {
  const trans = UseTrans();
  const [checkOutLimit, setCheckOutLimit] = useState(false);
  const checkOutStatus = useSelector(selectUserCheckOutStatus);
  const checkInStatus = useSelector(selectUserCheckInInfo);
  const checkInInfo = useSelector(selectUserCheckInInfo);
  const [isChecking, setIsChecking] = useState(false);
  const [checkedImg, setCheckedImg] = useState("");
  const [checkOutTime, setCheckOutTime] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    const getStatus = async () => {
      try {
        if (checkOutStatus) {
          setCheckedImg(checkInInfo.checkoutImage);
          setCheckOutTime(
            moment(checkInInfo.updatedAt).format("YYYY-MM-DD HH:mm:ss")
          );
        }
      } catch (error) {}
    };
    getStatus();
  }, [checkOutStatus, checkInInfo]);

  if (error) {
    console.error("Error: ", error);
  }
  const notCheckedCard = (
    <Space
      style={{ width: "100%" }}
      direction="vertical"
      className={styles.card}
    >
      {!checkOutStatus ? (
        <>
          <div>{trans.check.checkout.not_checked_out}</div>
          <div>{trans.check.checkout.please_check_out}</div>
        </>
      ) : (
        <>
          <div>
            {trans.check.checkout.checked_out} {checkOutTime}
          </div>
          <div>{trans.check.greeting}</div>
        </>
      )}

      <Button
        type="primary"
        onClick={() => {
          setIsChecking(true);
        }}
        disabled={checkOutLimit && checkOutLimit}
      >
        {trans.check.checkout.checkout_now}
      </Button>
    </Space>
  );
  const checkedCard = (
    <>
      <Space
        style={{ width: "100%" }}
        direction="vertical"
        className={styles.card}
      >
        <div>
          <div>
            {trans.check.checkout.checked_out} {checkOutTime}
          </div>
          <div>{trans.check.checkout.greeting}</div>
        </div>
      </Space>
    </>
  );
  const url = `http://localhost:3000/${checkedImg}`;

  const checkedImage = (
    <div className={styles.card} style={{ padding: "0.5em" }}>
      <img src={url} width="300" height="300" layout="fill" />
    </div>
  );
  const checkOutContent = (
    <>
      <Space>
        {notCheckedCard}
        {checkOutStatus && <div>Here's your image 👉</div>}
        {checkOutStatus && checkedImage}
      </Space>
      {error && (
        <div style={{ color: "rgb(230,30,10)" }}>
          Lỗi rồi : {error.message} 😔😔😔
        </div>
      )}

      {isChecking && (
        <CheckingCard
          state={"checkout"}
          setIsChecking={setIsChecking}
          setError={setError}
        />
      )}
    </>
  );
  const failedCheckIn = (
    <div>
      Haven't checked in yet! Wanna checkin?
      <Button
        type="primary"
        onClick={() => {
          Router.push("dashboard/checkin");
        }}
      >
        Go to Checkin
      </Button>
    </div>
  );
  const content = checkInStatus === false ? failedCheckIn : checkOutContent;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
      }}
      className="flex justify-center h-full"
      // className={styles.checkin}
    >
      <div className="flex flex-col flex-wrap w-full mx-auto p-8 gap-2">
        {content}
      </div>
    </div>
  );
};

export default CheckInContent;
