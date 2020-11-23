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
    <Box py={{ base: "1rem", sm: "1rem", md: "3rem" }}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        display={{ base: "none", sm: "none", md: "block" }}
      >
        <Nav />
        <Socials />
      </Flex>
      <CollapseButton
        isOpen={isOpen}
        onClick={() => {
          onToggle();
        }}
      />
      <Collapse isOpen={isOpen}>
        <Stack spacing={8} align="stretch" direction="column">
          <Nav />
        </Stack>
      </Collapse>
    </Box>
  );
};

export default Header;
