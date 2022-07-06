import "antd/dist/antd.css";
import { appWithTranslation } from "next-i18next";
import { Provider } from "react-redux";
import DefaultLayout from "../components/Layout/DefaultLayout";
import { store } from "../redux/store";
import "../styles/globals.css";
import "../styles/globals.scss";
function MyApp(props) {
  const { Component, pageProps } = props;
  const Layout = Component.layout || DefaultLayout;
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default appWithTranslation(MyApp);
