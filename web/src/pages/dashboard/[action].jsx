// import { useRouter } from "next/router";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import CheckIn from "../../components/page/Dashboard/CheckInContent";

const Dashboard = () => {
  // const router = useRouter();
  // const { action } = router.query;

  // switch (action) {
  //   case "checkin":
  //     return <CheckIn />;
  //   default:
  //     return <CheckIn />;
  // }
  return <CheckIn />;
};
Dashboard.layout = DashboardLayout;

export default Dashboard;
