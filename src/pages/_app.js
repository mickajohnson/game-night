import "@/styles/globals.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UsernameProvider } from "@/contexts/usernameContext";
import Header from "@/components/Header";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        {/* <Head>
          <title>Game Night Picker</title>
        </Head> */}
        <UsernameProvider>
          <Header />
          <Component {...pageProps} />
        </UsernameProvider>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
