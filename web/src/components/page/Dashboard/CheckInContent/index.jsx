import { Button, Skeleton, Space, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Webcam from "react-webcam";
import api from "../../../../api/api";
import {
  selectUserCheckInInfo,
  selectUserCheckInStatus,
} from "../../../../redux/feature/user/userSlice";
import styles from "../../../../styles/pages/dashboard/checkin.module.scss";
import UseTrans from "../../../../utils/hooks/UseTrans";
const { Text } = Typography;

const CheckInContent = () => {
  const trans = UseTrans();
  const dispatch = useDispatch();
  const checkInStatus = useSelector(selectUserCheckInStatus);
  const checkInInfo = useSelector(selectUserCheckInInfo);
  // console.log("CheckINStatus: " + checkInStatus);
  const webCamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [noCam, setNoCam] = useState(false);
  const [checkedImg, setCheckedImg] = useState("");
  // console.log(checkedImg);
  useEffect(() => {
    const getStatus = async () => {
      try {
        console.log("CheckIn", checkInStatus);
        console.log(checkInInfo);
        if (checkInStatus) {
          setCheckedImg(checkInInfo[0].checkinImage);
        }
      } catch (error) {}
    };
    getStatus();
  }, [checkInStatus]);

  const time = new Date(Date.now()).toLocaleString();
  const notCheckedCard = (
    <Space
      style={{ width: "100%" }}
      direction="vertical"
      className={styles.card}
    >
      <div>{trans.checkin.not_checked_in}</div>
      <div>{trans.checkin.please_check_in}</div>
      <Button
        type="primary"
        onClick={() => {
          setIsChecking(true);
        }}
      >
        {trans.checkin.checkin_now}
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
          {trans.checkin.checked_in} {time}
        </div>
        <div>{trans.checkin.greeting}</div>
      </Space>
    </>
  );
  const url = `http://localhost:3000/${checkedImg}`;
  console.log(url);
  const checkedImage = (
    <div className={styles.card} style={{ padding: "0.5em" }}>
      <img
        src={
          // "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
          "http://localhost:3000/1657075427981.png"
        }
        width="300"
        height="300"
        layout="fill"
      />
    </div>
  );

  // console.log(typeof );
  const capture = React.useCallback(() => {
    const imageSrc = webCamRef.current.getScreenshot();

    setImageSrc(imageSrc);
  }, [webCamRef, setImageSrc]);
  const videoConstraints = {
    width: 600,
    height: 400,
    facingMode: "user",
  };
  const submit = () => {
    navigator.geolocation.getCurrentPosition(async (res) => {
      const latitude = res.coords.latitude.toString();
      const longitude = res.coords.longitude.toString();
      const image = imageSrc;
      const payload = {
        latitude,
        longitude,
        image,
      };
      console.log(payload);
      try {
        const res = await api.post("checkin", payload);
        // console.log(res);
      } catch (err) {
        // console.log(err);
      }
    });
  };
  const checkingCard = (
    <div style={{ display: "flex", width: "100%", flexFlow: "column wrap" }}>
      {noCam && (
        <Text style={{ color: "rgb(255,0,0)" }}>
          {trans.checkin.error_no_camera}
        </Text>
      )}
      {noCam ? (
        <Skeleton
          active={true}
          avatar={{ active: true, shape: "square", size: 500 }}
        ></Skeleton>
      ) : (
        <div className={styles[`checkin-section-wrapper`]}>
          <Webcam
            ref={webCamRef}
            width={600}
            height={400}
            videoConstraints={videoConstraints}
            screenshotFormat="image/jpg"
            onUserMediaError={() => setNoCam(true)}
            screenshotQuality={1}
            className={styles.webcam}
          />
          <div className={styles[`capture-buttons`]}>
            <Button type="" onClick={() => capture()}>
              {trans.checkin.capture}
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setIsChecking(false);
                // setChecked(true);
                // dispatch(changeCheckInStatus({ checked_status: true }));
                submit();
              }}
            >
              {trans.checkin.finish}
            </Button>
          </div>
          <div>
            <img src={imageSrc} className={styles[`preview-image`]} />
          </div>
        </div>
      )}
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
          {checkInStatus && <div>Here your image 👉</div>}
          {checkInStatus && checkedImage}
        </Space>

        {isChecking && checkingCard}
      </div>
    </div>
  );
};

export default CheckInContent;
