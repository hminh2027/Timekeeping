import Home from "@/components/page/Dashboard/Home";
import AdminLayout from "@/layout/AdminLayout/AdminLayout";
import { getAuthCredentials } from "@/utils/auth-utils";
const AdminPage = () => {
  return <Home />;
};
AdminPage.layout = AdminLayout;

export default AdminPage;
export async function getServerSideProps(ctx) {
  const { token, user } = getAuthCredentials(ctx);
  console.log("CTX:", ctx);
  if (!token) {
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
