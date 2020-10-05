import React from "react";
import { Box, BoxProps } from "@chakra-ui/core";

export interface LayoutProps extends BoxProps {
  size: "small" | "middle" | "big";
}

const Layout: React.FC<LayoutProps> = ({ children, size, ...options }) => {
  return (
    <Box
      w={size === "small" ? "400px" : size === "middle" ? "800px" : "1200px"}
      mx="auto"
      {...options}
    >
      {children}
    </Box>
  );
};

export default Layout;
