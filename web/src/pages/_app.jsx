import DefaultLayout from "@/layout/DefaultLayout";
import "antd/dist/antd.css";
import { appWithTranslation } from "next-i18next";
import "react-calendar/dist/Calendar.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "../styles/globals.css";
import "../styles/globals.scss";

const queryClient = new QueryClient();

function MyApp(props) {
  const { Component, pageProps } = props;
  const Layout = Component.layout || DefaultLayout;
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </QueryClientProvider>
  );
}

export default appWithTranslation(MyApp);
