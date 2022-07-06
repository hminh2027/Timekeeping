// import { useRouter } from "next/router";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import CheckIn from "../../components/page/Dashboard/Check/CheckInContent";
import CheckOut from "../../components/page/Dashboard/Check/CheckOutContent";
import Home from "../../components/page/Dashboard/Home";
const Dashboard = () => {
  const router = useRouter();
  const { action } = router.query;
  console.log(action);

  switch (action) {
    case "checkin":
      return <CheckIn />;
    case "checkout":
      return <CheckOut />;
    case "home":
      return <Home />;

    default:
      return <Home />;
  }
};
Dashboard.layout = DashboardLayout;

export default Dashboard;
