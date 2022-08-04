import LeaderBoard from "@/components/LeaderBoard";

import ReactCalendar from "./ReactCalendar";
import CheckInContent from "@/components/page/Dashboard/Check/CheckInContent";

const Home = () => {
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
