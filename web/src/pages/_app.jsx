import DefaultLayout from "@/layout/DefaultLayout";
import "antd/dist/antd.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "../redux/store";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "../styles/globals.css";
import "../styles/globals.scss";
function MyApp(props) {
  const { Component, pageProps } = props;
  const Layout = Component.layout || DefaultLayout;
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default MyApp;
