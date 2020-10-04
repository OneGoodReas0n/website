import { Box } from "@chakra-ui/core";
import React from "react";
import Home from "../components/Home";
import About from "../components/About";

const Index: React.FC = () => {
  return (
    <Box w="100%">
      <Home />
      <About />
    </Box>
  );
};

export default Index;
