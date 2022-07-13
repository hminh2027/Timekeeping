import DashboardLayout from "../components/Layout/DashboardLayout";
import Dashboard from "../components/page/Dashboard/Home";
const index = () => {
  return <Dashboard />;
};
index.layout = DashboardLayout;

export default index;
