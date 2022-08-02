import LeaderBoard from "@/components/LeaderBoard";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  selectUserCheckInInfo,
  selectUserCheckInStatus,
} from "../../../../redux/feature/user/userSlice";
import ReactCalendar from "./ReactCalendar";
import CheckingCard from "@/components/page/Dashboard/Check/CheckingCard";
import CheckInContent from "@/components/page/Dashboard/Check/CheckInContent";

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
      <CheckInContent />
    </>
  );
  const checkInContent = (
    <>
      <div>Already Checked In!🔥🔥🔥</div>

      {checkInInfo && (
        <img
          crossOrigin="anonymous"
          src={`${process.env.APP_URL}${checkInInfo.checkinImage}`}
          // width="16"
          // height="9"
          // layout="responsive"
          className="object-contain aspect-video"
        />
      )}
    </>
  );
  return (
    <>
      <div className="flex flex-col gap-8 m-4 lg:flex-row">
        <div className="flex flex-col w-full lg:w-1/3 gap-4 ">
          {/*{checkInStatus ? checkInContent : notCheckedContent}*/}
          <CheckInContent />
          <div className="w-full card">
            <div className="card-body">
              <ReactCalendar />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-2/3 gap-4">
          <div className="w-full card">
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
