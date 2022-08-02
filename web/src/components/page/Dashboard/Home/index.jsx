import LeaderBoard from "@/components/LeaderBoard";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  selectUserCheckInInfo,
  selectUserCheckInStatus,
} from "../../../../redux/feature/user/userSlice";
import ReactCalendar from "./ReactCalendar";
import CheckingCard from "@/components/page/Dashboard/Check/CheckingCard";

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
    <>
      <div>Already Checked In!🔥🔥🔥</div>
      <CheckingCard />
      {checkInInfo && (
        <img
          crossOrigin="anonymous"
          src={`${process.env.APP_URL}${checkInInfo.checkinImage}`}
          // width="16"
          // height="9"
          // layout="responsive"
          className="aspect-video object-contain blur-lg transition-all duration-300 hover:blur-none"
        />
      )}
    </>
  );
  return (
    <>
      <div className="m-4 flex flex-col gap-8 lg:flex-row">
        <div className="flex w-full flex-col gap-4 lg:w-1/3 ">
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
        <div className="flex w-full flex-col gap-4 lg:w-2/3">
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
