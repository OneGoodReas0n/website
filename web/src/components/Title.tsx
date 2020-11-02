import React from "react";
import { Heading } from "@chakra-ui/core";

export interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <Heading mt={16} textAlign="center">
      {title}
    </Heading>
  );
};

export default Title;
