import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "constants/theme";
import "global.css";
import type { AppProps } from "next/app";
import { useRef } from "react";

function App({ Component, pageProps }: AppProps) {
  const clientRef = useRef<QueryClient>(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: 0,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={clientRef.current}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
