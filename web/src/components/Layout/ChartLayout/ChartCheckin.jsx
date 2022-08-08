import { Tab } from "@headlessui/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
const ChartCheckin = ({DataCheckin,...props}) => {
    const style1 =
    "inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500";
  const style2 =
    "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";
    return (
        <div className="card w-full">
            <div className="card-body">
            <Tab.Group>
                <Tab.List>
                <p className="text-center text-[1.3rem] font-bold text-cyan-900">
                    Bảng thống kê checkin theo{" "}
                </p>
                <div className="flex justify-center text-center">
                    {DataCheckin.map((dt) => (
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
                {DataCheckin.map((dt) => (
                    <Tab.Panel>
                    <Pie rotation={482} data={dt.data} />
                    </Tab.Panel>
                ))}
                </Tab.Panels>
            </Tab.Group>
            </div>
        </div>
    )
}

export default ChartCheckin;