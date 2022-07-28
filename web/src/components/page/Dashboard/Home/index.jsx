import LeaderBoard from "@/components/LeaderBoard";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  selectUserCheckInStatus,
  selectUserCheckInInfo,
} from "../../../../redux/feature/user/userSlice";
import ReactCalendar from "./ReactCalendar";

const Home = () => {
  const checkInStatus = useSelector(selectUserCheckInStatus);
  const checkInInfo = useSelector(selectUserCheckInInfo);

  const notCheckedContent = (
    <>
      <div>Let's get to work!✨✨</div>
      <Link href="/dashboard/checkin">
        <button type="primary" className="v-btn-primary">
          Check In ✔
        </button>
      </Link>
    </>
  );
  const checkInContent = (
    <div className="flex flex-col justify-center gap-8">
      <div>Already Checked In!🔥🔥🔥</div>
      {checkInInfo && (
        <div className="flex items-center justify-center blur-xl hover:blur-0">
          <img
            crossOrigin="anonymous"
            src={`${process.env.APP_URL}${checkInInfo.checkinImage}`}
            // width="16"
            // height="9"
            // layout="responsive"
            className="aspect-video w-full rounded-lg object-contain "
          />
        </div>
      )}
    </div>
  );
  return (
    <>
      <div className="m-4 flex gap-8">
        <div className="flex w-1/3 flex-col gap-4">
          <div className="card ">
            <div className="card-body">
              {checkInStatus ? checkInContent : notCheckedContent}
            </div>
          </div>
          <div className="card w-full">
            <div className="card-body">
              <ReactCalendar />
            </div>
          </div>
        </div>
        <div className="flex w-2/3 flex-col gap-4">
          <div className="card w-full">
            <div className="card-body">
              <LeaderBoard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
