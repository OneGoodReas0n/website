import React from "react";
import { Heading } from "@chakra-ui/core";

export interface TitleProps {}

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <Heading mt={{ base: 8, md: 10, lg: 12 }} textAlign="center">
      {children}
    </Heading>
  );
};

export default Title;
