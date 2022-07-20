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
    <div className="flex flex-col gap-4 items-center card p-4">
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
          <div>{trans.check.greeting} ¯\_(ツ)_/¯</div>
        </>
      )}

      <button
        className="v-btn-primary px-4 py-1 rounded"
        onClick={() => {
          setIsChecking(true);
        }}
        disabled={checkOutLimit && checkOutLimit}
      >
        {trans.check.checkout.checkout_now}
      </button>
    </div>
  );
  const checkedCard = (
    <>
      <div className="card p-4  flex flex-col gap-4">
        <div>
          <div>
            {trans.check.checkout.checked_out} {checkOutTime}
          </div>
          <div>{trans.check.checkout.greeting}</div>
        </div>
      </div>
    </>
  );
  const url = `http://localhost:3000/${checkedImg}`;

  const checkedImage = (
    <div className="card p-4" style={{ padding: "0.5em" }}>
      <img src={url} width="300" height="300" layout="fill" />
    </div>
  );
  const checkOutContent = (
    <>
      <div className="flex flex-col items-center gap-4 lg:flex-row">
        {notCheckedCard}
        {checkOutStatus && <div>Here's your image 👉</div>}
        {checkOutStatus && checkedImage}
      </div>
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
    <div className="card p-4 ">
      Haven't checked in yet! Wanna checkin?
      <button
        className="v-btn-primary rounded px-2"
        onClick={() => {
          Router.push("dashboard/checkin");
        }}
      >
        Go to Checkin
      </button>
    </div>
  );
  const content = checkInStatus === false ? failedCheckIn : checkOutContent;

  return (
    <div className="flex justify-center h-full">
      <div className="flex flex-col flex-wrap w-full mx-auto p-4 gap-2">
        {content}
      </div>
    </div>
  );
};

export default CheckInContent;
