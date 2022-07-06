import { Button, Space } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectUserCheckInInfo,
  selectUserCheckOutStatus,
} from "../../../../../redux/feature/user/userSlice";
import styles from "../../../../../styles/pages/dashboard/checkin.module.scss";
import UseTrans from "../../../../../utils/hooks/UseTrans";
import CheckingCard from "../CheckingCard";

const CheckInContent = () => {
  const trans = UseTrans();
  const checkInStatus = useSelector(selectUserCheckOutStatus);
  const checkInInfo = useSelector(selectUserCheckInInfo);
  const [isChecking, setIsChecking] = useState(false);
  const [checkedImg, setCheckedImg] = useState("");
  const [checkOutTime, setCheckOutTime] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    const getStatus = async () => {
      try {
        console.log("CheckInStatus", checkInStatus);
        console.log("CheckInInfo: ", checkInInfo);
        if (checkInStatus) {
          setCheckedImg(checkInInfo.checkoutImage);
          setCheckOutTime(
            moment(checkInInfo.updatedAt).format("YYYY-MM-DD HH:mm:ss")
          );
        }
      } catch (error) {}
    };
    getStatus();
  }, [checkInStatus]);
  const notCheckedCard = (
    <Space
      style={{ width: "100%" }}
      direction="vertical"
      className={styles.card}
    >
      <div>{trans.check.checkout.not_checked_out}</div>
      <div>{trans.check.checkout.please_check_out}</div>
      <Button
        type="primary"
        onClick={() => {
          setIsChecking(true);
        }}
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
          {trans.check.checkout.checked_out} {checkOutTime}
        </div>
        <div>{trans.check.checkout.greeting}</div>
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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
      }}
      className={styles.checkin}
    >
      <div
        style={{
          display: "flex",
          flexFlow: "column wrap",
          width: "100%",
          margin: "0 auto",
          padding: "2em",
          gap: "0.5em",
        }}
      >
        <Space>
          {checkInStatus ? checkedCard : notCheckedCard}
          {checkInStatus && <div>Here's your image 👉</div>}
          {checkInStatus && checkedImage}
        </Space>
        {error && (
          <div style={{ color: "rgb(240,10,0)" }}>Lỗi rồi : {error} 😔😔😔</div>
        )}

        {isChecking && (
          <CheckingCard
            state={"checkout"}
            setIsChecking={setIsChecking}
            setError={setError}
          />
        )}
      </div>
    </div>
  );
};

export default CheckInContent;
