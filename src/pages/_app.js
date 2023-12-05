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
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `}
      </Script>
      <Analytics />
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
