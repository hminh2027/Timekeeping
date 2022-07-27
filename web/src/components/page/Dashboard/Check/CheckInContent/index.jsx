import moment from "moment";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectUserCheckInInfo,
  selectUserCheckInStatus,
} from "../../../../../redux/feature/user/userSlice";
import UseTrans from "../../../../../utils/hooks/UseTrans";
import CheckingCard from "../CheckingCard";
const CheckInContent = () => {
  const trans = UseTrans();
  const checkInStatus = useSelector(selectUserCheckInStatus);
  const checkInInfo = useSelector(selectUserCheckInInfo);
  const [isChecking, setIsChecking] = useState(false);
  const [checkedImg, setCheckedImg] = useState("");
  const [checkInTime, setCheckInTime] = useState();
  const [errors, setErrors] = useState();
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
      <div className="card w-full bg-secondary lg:w-max">
        <div className="card-body">
          <div>
            {trans.check.checkin.checked_in} {checkInTime}
          </div>
          <div>{trans.check.greeting}</div>
        </div>
      </div>
    </>
  );
  const url = `${process.env.APP_URL}${checkedImg}`;
  const checkedImage = (
    <div className="card w-full bg-secondary lg:w-max">
      <div className="card-body">
        <img
          crossOrigin="anonymous"
          src={url}
          // width="16"
          // height="9"
          // layout="responsive"
          className="aspect-video object-contain"
        />
      </div>
    </div>
  );
  const redirectCheckOut = (
    <div className="card w-max">
      <div className="card-body">
        <div className="flex items-center gap-4">
          <div>Already checked in! Go to Checkout?</div>
          <button
            className="v-btn-primary rounded px-4 py-1"
            onClick={() => {
              Router.push("/dashboard/checkout");
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
  const content = (
    <>
      {!isChecking && (
        <div className="flex flex-wrap items-center">
          {checkInStatus ? checkedCard : notCheckedCard}
          {checkInStatus && (
            <div className="hidden lg:flex">Here's your image 👉</div>
          )}
          {checkInStatus && checkedImage}
        </div>
      )}
      {!isChecking && errors && (
        <div style={{ color: "rgb(230,30,10)" }}>
          Lỗi rồi :
          {errors.map((error) => (
            <span>{error}</span>
          ))}
          😔😔😔
        </div>
      )}
      {checkInStatus && redirectCheckOut}
      {isChecking && (
        <CheckingCard
          setIsChecking={setIsChecking}
          setErrors={setErrors}
          state={"checkin"}
        />
      )}
    </>
  );
  return (
    <div className="flex h-full w-full justify-center">
      <div className="mx-auto flex w-full flex-col gap-2 p-8">{content}</div>
    </div>
  );
};

export default CheckInContent;
