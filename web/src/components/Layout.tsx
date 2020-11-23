import React from "react";
import { Box, BoxProps } from "@chakra-ui/core";

export interface LayoutProps extends BoxProps {}

const Layout: React.FC<LayoutProps> = ({ children, ...options }) => {
  return (
    <Box
      width={{ base: "100%", sm: "90%", md: "60%" }}
      mx="auto"
      id="Layout"
      {...options}
    >
      {children}
    </Box>
  );
};

export default Layout;
