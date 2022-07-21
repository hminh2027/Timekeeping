import { getAuthCredentials } from "@/utils/auth-utils";
import DashboardLayout from "../components/Layout/DashboardLayout";
import Dashboard from "../components/page/Dashboard/Home";
const index = () => {
  return <Dashboard />;
};
index.layout = DashboardLayout;

export default index;
export async function getServerSideProps(ctx) {
  const { token, user } = getAuthCredentials(ctx);
  if(!token) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }
  console.log(token, user);
  if (!user) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }
  if (user.role === "admin") {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}
