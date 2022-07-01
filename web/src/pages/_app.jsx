import "antd/dist/antd.css";
import { appWithTranslation } from "next-i18next";
import DefaultLayout from "../components/Layout/DefaultLayout";
import "../styles/globals.css";
import "../styles/globals.scss";
function MyApp(props) {
  const { Component, pageProps } = props;
  const Layout = Component.layout || DefaultLayout;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default appWithTranslation(MyApp);
