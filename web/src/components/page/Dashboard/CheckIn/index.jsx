import { Button, Skeleton, Space, Typography } from "antd";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import styles from "../../../../styles/pages/dashboard/checkin.module.scss";
import UseTrans from "../../../../utils/hooks/UseTrans";
const { Title, Text } = Typography;

const CheckInMain = () => {
  const trans = UseTrans();
  const webCamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState("");
  const [notChecked, setNotChecked] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [noCam, setNoCam] = useState(false);

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
  );

  const capture = React.useCallback(() => {
    const imageSrc = webCamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  }, [webCamRef, setImageSrc]);
  const videoConstraints = {
    width: 600,
    height: 400,
    facingMode: "user",
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
                setNotChecked(false);
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
        {notChecked ? notCheckedCard : checkedCard}
        {isChecking && checkingCard}
      </div>
    </div>
  );
};

export default CheckInMain;
