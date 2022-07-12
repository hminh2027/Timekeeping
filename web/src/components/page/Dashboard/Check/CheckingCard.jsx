import { Button, Skeleton, Typography } from "antd";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Webcam from "react-webcam";
import api from "../../../../api/api";
import { fetchCheckInStatus } from "../../../../redux/feature/user/userSlice";
import styles from "../../../../styles/pages/dashboard/checkin.module.scss";
import UseTrans from "../../../../utils/hooks/UseTrans";
const { Text } = Typography;
const CheckingCard = (props) => {
  const dispatch = useDispatch();
  const trans = UseTrans();
  const webCamRef = useRef(null);

  const [noCam, setNoCam] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const capture = React.useCallback(() => {
    const imageSrc = webCamRef.current.getScreenshot();

    setImageSrc(imageSrc);
  }, [webCamRef, setImageSrc]);

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
      try {
        props.state === "checkin"
          ? await api.post("checkin", payload)
          : await api.patch("checkin", payload);
        // console.log(res);
        dispatch(fetchCheckInStatus());
      } catch (err) {
        console.error(err);
        props.setError(err.response.data);
      }
    });
  };

  const content = (
    <div style={{ display: "flex", width: "100%", flexFlow: "column wrap" }}>
      {noCam && (
        <Text style={{ color: "rgb(255,0,0)" }}>
          {trans.check.error_no_camera}
        </Text>
      )}
      {noCam ? (
        <Skeleton
          active={true}
          avatar={{ active: true, shape: "square", size: 500 }}
        ></Skeleton>
      ) : (
        <div className={styles[`checkin-section-wrapper`]}>
          <div>
            <Webcam
              ref={webCamRef}
              screenshotFormat="image/jpg"
              onUserMediaError={() => setNoCam(true)}
              screenshotQuality={1}
              className={styles.webcam}
            />
          </div>

          <div className={styles[`capture-buttons`]}>
            <Button type="" onClick={() => capture()}>
              {trans.check.capture}
            </Button>
            <Button
              type="primary"
              onClick={() => {
                props.setIsChecking(false);
                submit();
                setImageSrc("");
              }}
            >
              {trans.check.finish}
            </Button>
          </div>
          <div>
            <img src={imageSrc} className={styles[`preview-image`]} />
          </div>
        </div>
      )}
    </div>
  );
  return <div>{content}</div>;
};

export default CheckingCard;