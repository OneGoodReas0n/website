import { ChakraProvider } from "@chakra-ui/core";
import { AppProps } from "next/app";
import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import "../public/css/global.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Breakpoints } from "../utils/breakpoints";

const breakpoints = createBreakpoints({
  base: `${Breakpoints.base}px`,
  sm: `${Breakpoints.sm}px`,
  md: `${Breakpoints.md}px`,
  lg: `${Breakpoints.lg}px`,
  xl: `${Breakpoints.xl}px`,
});

const theme = extendTheme({ breakpoints });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
