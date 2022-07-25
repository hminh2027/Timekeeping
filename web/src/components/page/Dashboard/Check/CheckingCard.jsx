import { Skeleton, Typography } from "antd";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Webcam from "react-webcam";
import api from "@/api/api";
import { fetchCheckInStatus } from "@/redux/feature/user/userSlice";
import styles from "@/styles/pages/dashboard/checkin.module.scss";
import UseTrans from "@/utils/hooks/UseTrans";
import { extractMessages } from "@/utils/Formatter/ApiError";

const { Text } = Typography;
const CheckingCard = (props) => {
  const dispatch = useDispatch();
  const trans = UseTrans();
  const webCamRef = useRef(null);

  const [noCam, setNoCam] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [captured, setCaptured] = useState(false);
  const [capturing, setCapturing] = useState(true);

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
        if (!image) {
          throw new Error("No image sent");
        }
        props.state === "checkin"
          ? await api.post("checkin", payload)
          : await api.patch("checkin", payload);
        dispatch(fetchCheckInStatus());
      } catch (err) {
        const message = extractMessages(err);
        props.setErrors(message);
      }
    });
  };

  const content = (
    <div className="flex flex-col flex-wrap w-full">
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
        <div className="flex flex-row flex-wrap items-center w-full min-h-md min-w-sm">
          {capturing && (
            <div>
              <Webcam
                ref={webCamRef}
                screenshotFormat="image/jpg"
                onUserMediaError={() => setNoCam(true)}
                screenshotQuality={1}
                width={480}
                height={640}
                className={`w-full`}
              />
            </div>
          )}

          {captured && !capturing && (
            <div>
              <img src={imageSrc} className={styles[`preview-image`]} />
            </div>
          )}
          <div className="flex flex-col flex-wrap items-center gap-12">
            <button
              className="v-btn btn-outline btn-primary"
              onClick={() => {
                capturing && capture();
                setCaptured(true);
                setCapturing(!capturing);
              }}
            >
              {capturing && !captured && "Capture"}
              {capturing && captured && "Capture"}
              {!capturing && captured && "Re Capture"}
            </button>
            <button
              className="v-btn-primary"
              onClick={() => {
                props.setIsChecking(false);
                submit();
                setImageSrc("");
              }}
            >
              {trans.check.finish}
            </button>
          </div>
          {/* <div>
            <img src={imageSrc} className={styles[`preview-image`]} />
          </div> */}
        </div>
      )}
    </div>
  );
  return <div>{content}</div>;
};

export default CheckingCard;
