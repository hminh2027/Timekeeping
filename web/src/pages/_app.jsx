import "antd/dist/antd.css";
import DefaultLayout from "../components/Layout/DefaultLayout";
import "../styles/globals.css";
function MyApp(props) {
  const { Component, pageProps } = props;
  const Layout = Component.layout || DefaultLayout;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
