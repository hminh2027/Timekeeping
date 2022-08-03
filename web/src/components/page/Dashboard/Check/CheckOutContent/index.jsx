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
import { ToastContainer } from "react-toastify";

const CheckInContent = () => {
  const trans = UseTrans();
  const [checkOutLimit, setCheckOutLimit] = useState(false);
  const checkOutStatus = useSelector(selectUserCheckOutStatus);
  const checkInStatus = useSelector(selectUserCheckInInfo);
  const checkInInfo = useSelector(selectUserCheckInInfo);
  const [isChecking, setIsChecking] = useState(false);
  const [checkedImg, setCheckedImg] = useState("");
  const [checkOutTime, setCheckOutTime] = useState();
  const url = `${process.env.APP_URL}${checkedImg}`;

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
    <div className="card w-full">
      <div className="card-body">
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
    </div>
  );
  const checkedCard = (
    <div className="card w-full">
      <div className="card-body">
        <div className="text-center">
          {trans.check.checkout.checked_out} <b>{checkOutTime}</b>
        </div>
        <img
          crossOrigin="anonymous"
          src={url}
          className="aspect-[4/3] my-4 mx-auto rounded-xl overflow-hidden"
        />
        <button
          className="v-btn-primary"
          onClick={() => {
            setIsChecking(true);
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );

  const checkOutContent = (
    <>
      {!isChecking && (
        <div className="flex flex-wrap items-center">
          {checkOutStatus ? checkedCard : notCheckedCard}
        </div>
      )}

      {isChecking && (
        <div className="w-full card">
          <div className="card-body">
            <CheckingCard state={"checkout"} setIsChecking={setIsChecking} />
          </div>
        </div>
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
  const content = !checkInStatus ? failedCheckIn : checkOutContent;

  return (
    <>
      {content}
      <ToastContainer />
    </>
  );
};

export default CheckInContent;
