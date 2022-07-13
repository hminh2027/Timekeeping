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
    <div className="card bg-secondary">
      <div className="card-body">
        <div>{trans.check.checkin.not_checked_in}</div>
        <div>{trans.check.checkin.please_check_in}</div>
        <button
          className="v-btn-primary"
          onClick={() => {
            setIsChecking(true);
          }}
        >
          {trans.check.checkin.checkin_now}
        </button>
      </div>
    </div>
  );
  const checkedCard = (
    <>
      <div className="card bg-secondary">
        <div className="card-body">
          <div>
            {trans.check.checkin.checked_in} {checkInTime}
          </div>
          <div>{trans.check.greeting}</div>
        </div>
      </div>
    </>
  );
  const url = `http://localhost:3000/${checkedImg}`;
  console.log(url);
  const checkedImage = (
    <div className="card bg-secondary">
      <div className="card-body">
        <img src={url} width="300" height="300" layout="fill" />
      </div>
    </div>
  );
  const redirectCheckOut = (
    <div className="flex items-center">
      <div>Already checked in! Wanna Checkout?</div>
      <button
        className="v-btn-primary"
        onClick={() => {
          Router.push("/dashboard/checkout");
        }}
      >
        Go to Checkout
      </button>
    </div>
  );
  const content = (
    <>
      <div className="flex items-center">
        {checkInStatus ? checkedCard : notCheckedCard}
        {checkInStatus && <div>Here's your image 👉</div>}
        {checkInStatus && checkedImage}
      </div>
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
    <div className="flex justify-center h-full">
      <div className="flex flex-col w-full mx-auto p-8 gap-2">{content}</div>
    </div>
  );
};

export default CheckInContent;
