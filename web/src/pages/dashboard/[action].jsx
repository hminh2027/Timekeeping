// import { useRouter } from "next/router";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import CheckIn from "../../components/page/Dashboard/CheckInContent";
import Home from "../../components/page/Dashboard/Home";
const Dashboard = () => {
  const router = useRouter();
  const { action } = router.query;

  switch (action) {
    case "checkin":
      return <CheckIn />;
    case "home":
      return <Home />;
    default:
      return <CheckIn />;
  }
};
Dashboard.layout = DashboardLayout;

export default Dashboard;
