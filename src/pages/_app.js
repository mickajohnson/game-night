import "@/styles/globals.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ChakraProvider, Box } from "@chakra-ui/react";
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
        <title>Plays Best!</title>
      </Head>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <UsernameProvider>
            <Header />
            <Box>
              <Component {...pageProps} />
            </Box>
          </UsernameProvider>
        </Provider>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
