import "@/styles/globals.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UsernameProvider } from "@/contexts/usernameContext";
import Header from "@/components/Header";
import theme from "@/theme";
import { store } from "@/store";
import { Provider } from "react-redux";
import Head from "next/head";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Game Night!</title>
      </Head>
      <ChakraProvider theme={theme}>
        {/* <Head>
          <title>Game Night Picker</title>
        </Head> */}
        <Provider store={store}>
          <UsernameProvider>
            <Header />
            <Component {...pageProps} />
          </UsernameProvider>
        </Provider>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
