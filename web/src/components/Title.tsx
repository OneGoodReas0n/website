import React from "react";
import { Heading } from "@chakra-ui/core";

export interface TitleProps {}

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <Heading mt={20} textAlign="center">
      {children}
    </Heading>
  );
};

export default Title;
