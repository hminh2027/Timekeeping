import auth from "@/api/auth";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import CheckIn from "../../components/page/Dashboard/Check/CheckInContent";
import CheckOut from "../../components/page/Dashboard/Check/CheckOutContent";
import Home from "../../components/page/Dashboard/Home";
import TicketContent from "../../components/page/Dashboard/Ticket";
const Dashboard = (props) => {
  const router = useRouter();
  const { action } = router.query;

  console.log(props);
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
export async function getServerSideProps(context) {
  const authed = await auth.checkAuth();

  // Get user Info
  const res = await fetch(`${process.env.APP_URL}auth/me`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }
  if (!authed) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}
