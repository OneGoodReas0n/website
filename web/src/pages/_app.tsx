import { ChakraProvider } from "@chakra-ui/core";
import { AppProps } from "next/app";

import "../public/css/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
