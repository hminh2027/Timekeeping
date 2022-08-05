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
import CheckInContent from "@/components/page/Dashboard/Check/CheckInContent";
const Home = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: ["Đi đúng giờ", "Đi muộn", "Nghỉ"],
    datasets: [
      {
        label: "# of Votes",
        data: [11, 12, 10],
        backgroundColor: ["#e5f7ed", "#ffedeb", "#f5f5f5"],
        borderColor: ["#00b14f", "#ff564c", "#9f9f9f"],
        borderWidth: 1,
      },
    ],
  };
  const GetData = [
    {
      name: "Ngày",
      data: {
        labels: ["Đi đúng giờ", "Đi muộn", "Nghỉ"],
        datasets: [
          {
            label: "# of Votes",
            data: [11, 12, 10],
            backgroundColor: ["#e5f7ed", "#ffedeb", "#f5f5f5"],
            borderColor: ["#00b14f", "#ff564c", "#9f9f9f"],
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
            label: "# of Votes",
            data: [15, 9, 10],
            backgroundColor: ["#e5f7ed", "#ffedeb", "#f5f5f5"],
            borderColor: ["#00b14f", "#ff564c", "#9f9f9f"],
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
            label: "# of Votes",
            data: [20, 12, 11],
            backgroundColor: ["#e5f7ed", "#ffedeb", "#f5f5f5"],
            borderColor: ["#00b14f", "#ff564c", "#9f9f9f"],
            borderWidth: 1,
          },
        ],
      },
    },
  ];
  const style1 =
    "inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500";
  const style2 =
    "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";
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
            <div className="card w-full">
              <div className="card-body">
                <Tab.Group>
                  <Tab.List>
                    <p className="text-center text-[1.3rem] font-bold text-cyan-900">
                      Bảng thống kê checkin theo{" "}
                    </p>
                    <div className="flex justify-center text-center">
                      {GetData.map((dt) => (
                        <Tab
                          className={({ selected }) =>
                            selected ? style1 : style2
                          }
                        >
                          {dt.name}
                        </Tab>
                      ))}
                    </div>
                  </Tab.List>
                  <Tab.Panels>
                    {GetData.map((dt) => (
                      <Tab.Panel>
                        <Pie rotation={482} data={dt.data} />
                      </Tab.Panel>
                    ))}

                    {/* <Tab.Panel>Content 2</Tab.Panel>
                  <Tab.Panel>Content 3</Tab.Panel> */}
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
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
