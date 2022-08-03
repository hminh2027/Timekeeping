import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectUserCheckInInfo,
  selectUserCheckInStatus,
} from "../../../../../redux/feature/user/userSlice";
import UseTrans from "../../../../../utils/hooks/UseTrans";
import CheckingCard from "../CheckingCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckOutContent from "@/components/page/Dashboard/Check/CheckOutContent";

const CheckInContent = () => {
  const trans = UseTrans();
  const checkInStatus = useSelector(selectUserCheckInStatus);
  const checkInInfo = useSelector(selectUserCheckInInfo);
  const [isChecking, setIsChecking] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [checkedImg, setCheckedImg] = useState("");
  const [checkInTime, setCheckInTime] = useState();
  const url = `${process.env.APP_URL}${checkedImg}`;

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
    <div className="card w-full">
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
    <div className="card w-full">
      <div className="card-body">
        <div className="text-center">
          {trans.check.checkin.checked_in} <b>{checkInTime}</b>!
        </div>
        <img
          crossOrigin="anonymous"
          src={url}
          className="aspect-[4/3] my-4 rounded-xl overflow-hidden"
        />
        <button
          className="v-btn-primary"
          onClick={() => {
            setCheckout(true);
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );

  const content = (
    <>
      {!isChecking && (
        <div className="flex flex-wrap items-center">
          {checkInStatus ? checkedCard : notCheckedCard}
        </div>
      )}

      {isChecking && (
        <div className="w-full card">
          <div className="card-body">
            <CheckingCard setIsChecking={setIsChecking} state={"checkin"} />
          </div>
        </div>
      )}

      {checkout && <CheckOutContent />}
    </>
  );
  return (
    <>
      {checkout ? <CheckOutContent /> : content}
      <ToastContainer />
    </>
  );
};

export default CheckInContent;
