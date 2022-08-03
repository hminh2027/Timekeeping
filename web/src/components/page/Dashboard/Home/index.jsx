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
      <div className="flex flex-col gap-8 m-4 lg:flex-row">
        <div className="flex flex-col w-full lg:w-1/4 gap-4 ">
          {/*{checkInStatus ? <CheckOutContent /> : <CheckInContent />}*/}
          <CheckInContent />
          <div className="w-full card">
            <div className="card-body">
              <ReactCalendar />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-3/4 gap-4">
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
