import { Box } from "@chakra-ui/core";
import React from "react";
import About from "../components/About";
import Home from "../components/Home";
import Projects from "../components/Projects";
import Technologies from "../components/Technologies";
import { withApollo } from "../utils/withApollo";
import Footer from "../components/Footer";

const Index: React.FC = () => {
  return (
    <Box>
      <Home />
      <About />
      <Technologies />
      <Projects />
      <Footer />
    </Box>
  );
};

export default withApollo({ ssr: true })(Index);
