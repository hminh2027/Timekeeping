import auth from "@/api/auth";
import CheckIn from "@/components/page/Dashboard/Check/CheckInContent";
import CheckOut from "@/components/page/Dashboard/Check/CheckOutContent";
import Home from "@/components/page/Dashboard/Home";
import TicketContent from "@/components/page/Dashboard/Ticket";
import DashboardLayout from "@/layout/DashboardLayout";
import { changeCurrentItem } from "@/redux/feature/layout/menuSlice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
const Dashboard = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { action } = router.query;
  dispatch(changeCurrentItem({ menuItem: action }));
  switch (action) {
    case "checkin":
      return <CheckIn />;
    case "checkout":
      return <CheckOut />;
    case "ticket":
      return <TicketContent />;
    case "home":
      return <Home />;
    default:
      return <Home />;
  }
};
Dashboard.layout = DashboardLayout;

export default Dashboard;
