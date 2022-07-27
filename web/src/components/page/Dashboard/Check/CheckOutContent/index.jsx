import moment from "moment";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectUserCheckInInfo,
  selectUserCheckOutStatus,
} from "@/redux/feature/user/userSlice";
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
  const [errors, setErrors] = useState();
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
  const notCheckedCard = (
    <div className="card flex flex-col items-center gap-4 p-4">
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
        className="v-btn-primary rounded px-4 py-1"
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
      <div className="card flex flex-col gap-4 p-4">
        <div>
          <div>
            {trans.check.checkout.checked_out} {checkOutTime}
          </div>
          <div>{trans.check.checkout.greeting}</div>
        </div>
      </div>
    </>
  );
  const url = `${process.env.APP_URL}${checkedImg}`;

  const checkedImage = (
    <div className="card p-4" style={{ padding: "0.5em" }}>
      <img
        crossOrigin="anonymous"
        src={url}
        width="300"
        height="300"
        layout="fill"
      />
    </div>
  );
  const checkOutContent = (
    <>
      {!isChecking && (
        <div className="flex flex-col items-center gap-4 lg:flex-row">
          {notCheckedCard}
          {checkOutStatus && <div>Here's your image 👉</div>}
          {checkOutStatus && checkedImage}
        </div>
      )}

      {!isChecking && errors && (
        <div style={{ color: "rgb(230,30,10)" }}>
          Lỗi rồi :{" "}
          {errors.map((error) => (
            <span>{error}</span>
          ))}
          😔😔😔
        </div>
      )}

      {isChecking && (
        <CheckingCard
          state={"checkout"}
          setIsChecking={setIsChecking}
          setErrors={setErrors}
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
    <div className="flex h-full w-full justify-center">
      <div className="mx-auto flex w-full flex-col flex-wrap gap-2 p-4">
        {content}
      </div>
    </div>
  );
};

export default CheckInContent;
