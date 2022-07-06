import { Button, Space } from "antd";
import moment from "moment";
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
        console.log("CheckInStatus", checkInStatus);
        console.log("CheckInInfo: ", checkInInfo);
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
    <Space
      style={{ width: "100%" }}
      direction="vertical"
      className={styles.card}
    >
      <div>{trans.check.checkin.not_checked_in}</div>
      <div>{trans.check.checkin.please_check_in}</div>
      <Button
        type="primary"
        onClick={() => {
          setIsChecking(true);
        }}
      >
        {trans.check.checkin.checkin_now}
      </Button>
    </Space>
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
          flexFlow: "column wrap",
          // width: "30rem",
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
            setIsChecking={setIsChecking}
            setError={setError}
            state={"checkin"}
          />
        )}
      </div>
    </div>
  );
};

export default CheckInContent;
