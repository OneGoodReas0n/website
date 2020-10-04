import React from "react";
import { Box, BoxProps } from "@chakra-ui/core";

export interface LayoutProps extends BoxProps {}

const Layout: React.FC<LayoutProps> = ({ children, ...options }) => {
  return (
    <Box w="1200px" mx="auto" {...options}>
      {children}
    </Box>
  );
};

export default Layout;
