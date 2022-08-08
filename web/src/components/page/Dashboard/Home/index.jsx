import LeaderBoard from "@/components/LeaderBoard";
import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import ReactCalendar from "./ReactCalendar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import RBACWrapper from "@/components/RBACWrapper";
import {
  CHECK_IN_PERMISSION,
  REPORT_PERMISSION,
} from "@/utils/constants/permission";
import CheckInContent from "../Check/CheckInContent";
import ChartCheckin from "@/layout/ChartLayout/ChartCheckin";
const Home = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const GetData = [
    {
      name: "Ngày",
      data: {
        labels: ["Đi đúng giờ", "Đi muộn", "Nghỉ"],
        datasets: [
          {
            label: '# of Votes',
            data: [11,12,6],
            backgroundColor: [
              "#e5f7ed",
              "#ffedeb",
              "#f5f5f5",
            ],
            borderColor: [
              "#00b14f",
              "#ff564c",
              "#9f9f9f",
            ],
            borderWidth: 1,
          },
        ],
      },
    },
    {
      name: "Tháng",
      data: {
        labels: ["Đi đúng giờ", "Đi muộn", "Nghỉ"],
        datasets: [
          {
            label: '# of Votes',
            data: [25,15,10],
            backgroundColor: [
              "#e5f7ed",
              "#ffedeb",
              "#f5f5f5",
            ],
            borderColor: [
              "#00b14f",
              "#ff564c",
              "#9f9f9f",
            ],
            borderWidth: 1,
          },
        ],
      },
    },
    {
      name: "Năm",
      data: {
        labels: ["Đi đúng giờ", "Đi muộn", "Nghỉ"],
        datasets: [
          {
            label: '# of Votes',
            data: [107,56,11],
            backgroundColor: [
              "#e5f7ed",
              "#ffedeb",
              "#f5f5f5",
            ],
            borderColor: [
              "#00b14f",
              "#ff564c",
              "#9f9f9f",
            ],
            borderWidth: 1,
          },
        ],
      },
    },
  ];

  return (
    <>
      <div className="m-4 flex flex-col gap-8 lg:flex-row">
        <div className="flex w-full flex-col gap-4 lg:w-1/4 ">
          {/*{checkInStatus ? <CheckOutContent /> : <CheckInContent />}*/}
          <RBACWrapper
            requiredPermissions={[
              CHECK_IN_PERMISSION.READ,
              CHECK_IN_PERMISSION.WRITE,
            ]}
          >
            <CheckInContent />
          </RBACWrapper>
          <RBACWrapper requiredPermissions={[REPORT_PERMISSION.READ]}>
            <ChartCheckin DataCheckin={GetData}></ChartCheckin>
          </RBACWrapper>
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
