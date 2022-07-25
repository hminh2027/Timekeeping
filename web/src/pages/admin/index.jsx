import Home from "@/components/page/Dashboard/Home";
import AdminLayout from "@/layout/AdminLayout/AdminLayout";
import { getAuthCredentials } from "@/utils/auth-utils";
const AdminPage = () => {
  return <Home />;
};
AdminPage.layout = AdminLayout;

export default AdminPage;

