import { Box } from "@chakra-ui/core";
import React from "react";
import Home from "../components/Home";
import About from "../components/About";
import Technologies from "../components/Technologies";
import Projects from "../components/Projects";
import { withApollo } from "../utils/withApollo";

const Index: React.FC = () => {
  return (
    <Box w="100%">
      <Home />
      <About />
      <Technologies />
      <Projects />
    </Box>
  );
};

export default withApollo({ ssr: true })(Index);
