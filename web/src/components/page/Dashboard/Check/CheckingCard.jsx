import { Skeleton, Typography } from "antd";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Webcam from "react-webcam";
import { fetchCheckInStatus } from "@/redux/feature/user/userSlice";
import styles from "@/styles/pages/dashboard/checkin.module.scss";
import UseTrans from "@/utils/hooks/UseTrans";
import { extractMessages } from "@/utils/Formatter/ApiError";
import { usePostCheckInMutation } from "@/rest/checkin/checkin.query";
import { usePostCheckOutMutation } from "@/rest/checkout/checkout.query";
import { useQueryClient } from "@tanstack/react-query";
import { notify } from "@/components/Common/Toast/Toastify";
import { ToastContainer } from "react-toastify";

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
  const queryClient = useQueryClient();
  const { mutate: checkIn } = usePostCheckInMutation();
  const { mutate: checkOut } = usePostCheckOutMutation();
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
        if (!image) throw new Error("No image sent");

        props.state === "checkin"
          ? checkIn(payload, {
              onSuccess: () => {
                //Fetch CheckInStatus
                dispatch(fetchCheckInStatus());
              },
              onError: (err) => {
                const message = extractMessages(err);
                notify(message[0], "error");
              },
            })
          : checkOut(payload, {
              onSuccess: () => {
                dispatch(fetchCheckInStatus());
              },
              onError: (err) => {
                const message = extractMessages(err);
                notify(message[0], "error");
              },
            });
      } catch (err) {
        const message = extractMessages(err);
        notify(message[0], "error");
      }
    });
  };
  const webCam = (
    <div className="max-w-mobile lg:max-w-screen-md rounded-xl overflow-hidden">
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
  );
  const imagePreview = (
    <div>
      <img
        src={imageSrc}
        className={`${styles["preview-image"]} rounded-xl overflow-hidden`}
      />
    </div>
  );
  const content = (
    <div className="flex w-full flex-col flex-wrap">
      {noCam && (
        <Text style={{ color: "rgb(255,0,0)" }}>
          {trans.check.error_no_camera}
        </Text>
      )}
      {noCam ? (
        <Skeleton.Avatar active={true} shape="square" className="large" />
      ) : (
        <div className="flex w-full flex-col items-center gap-4">
          {capturing && webCam}

          {captured && !capturing && imagePreview}
          <div className="flex flex-wrap  items-center justify-between w-full">
            <button
              className="v-btn-transparent m-2"
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
              className="v-btn-primary m-2"
              onClick={() => {
                props.setIsChecking(false);
                submit();
                setImageSrc("");
              }}
            >
              {trans.check.finish}
            </button>
          </div>
        </div>
      )}
    </div>
  );
  return <div>{content}</div>;
};

export default CheckingCard;
