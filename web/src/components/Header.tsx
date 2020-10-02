import React from "react";
import { Box, Flex } from "@chakra-ui/core";
import Nav from "./Nav";
import Socials from "./Socials";

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <Box py={6}>
      <Flex justifyContent="space-between" alignItems="center">
        <Nav />
        <Socials />
      </Flex>
    </Box>
  );
};

export default Header;
