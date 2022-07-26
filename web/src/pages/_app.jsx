import DefaultLayout from "@/layout/DefaultLayout";
import "antd/dist/antd.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "../redux/store";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "../styles/globals.css";
import "../styles/globals.scss";
import { Toaster } from "react-hot-toast";
function MyApp(props) {
  const { Component, pageProps } = props;
  const Layout = Component.layout || DefaultLayout;
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </Provider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default MyApp;
