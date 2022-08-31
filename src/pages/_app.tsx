import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "constants/theme";
import "global.css";
import { usePostHog } from "next-use-posthog";
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

  usePostHog("phc_sG0vn7ruJHh5OZ5kvqSOjkt1z3UW1LRYi3kkvZXjKYU", {
    api_host: "https://app.posthog.com",
    loaded: (posthog) => {
      if (process.env.NODE_ENV !== "production") posthog.opt_out_capturing();
    },
  });

  return (
    <QueryClientProvider client={clientRef.current}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
