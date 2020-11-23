import React from "react";
import { Box, BoxProps } from "@chakra-ui/core";

export interface LayoutProps extends BoxProps {}

const Layout: React.FC<LayoutProps> = ({ children, ...options }) => {
  return (
    <Box
      width={{ base: "100%", sm: "95%", lg: "75%" }}
      mx="auto"
      id="Layout"
      overflow="hidden"
      {...options}
    >
      {children}
    </Box>
  );
};

export default Layout;
