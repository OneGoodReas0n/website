import React from "react";
import { Box, Flex, Collapse, Stack } from "@chakra-ui/core";
import Nav from "./Nav";
import Socials from "./Socials";
import CollapseButton from "./CollapseButton";
import { useDisclosure } from "@chakra-ui/react";

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box py={{ base: 2, sm: 4, md: 8 }}>
      <Flex
        display={{ base: "none", sm: "flex" }}
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Nav />
        <Socials />
      </Flex>
      <Box display={{ base: "block", sm: "none" }} w="100%">
        <CollapseButton
          isOpen={isOpen}
          onClick={() => {
            onToggle();
          }}
        />
        <Collapse isOpen={isOpen}>
          <Nav />
        </Collapse>
      </Box>
    </Box>
  );
};

export default Header;
