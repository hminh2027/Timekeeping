import LeaderBoard from "@/components/LeaderBoard";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  selectUserCheckInInfo,
  selectUserCheckInStatus,
  selectUserCheckOutStatus,
} from "../../../../redux/feature/user/userSlice";
import ReactCalendar from "./ReactCalendar";
import CheckInContent from "@/components/page/Dashboard/Check/CheckInContent";
import CheckOutContent from "@/components/page/Dashboard/Check/CheckOutContent";

const Home = () => {
  const checkInStatus = useSelector(selectUserCheckInStatus);
  const checkOutStatus = useSelector(selectUserCheckOutStatus);
  return (
    <>
      <div className="m-4 flex flex-col gap-8 lg:flex-row">
        <div className="flex w-full flex-col gap-4 lg:w-1/4 ">
          {/*{checkInStatus ? <CheckOutContent /> : <CheckInContent />}*/}
          <CheckInContent />
          <div className="card w-full">
            <div className="card-body">
              <ReactCalendar />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 lg:w-3/4">
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
