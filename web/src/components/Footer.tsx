import React from "react";
import { Box } from "@chakra-ui/core";
import Socials from "./Socials";

export interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Box bgColor="#1A1A1A" p={4}>
      <Socials variant="wide" />
    </Box>
  );
};

export default Footer;
