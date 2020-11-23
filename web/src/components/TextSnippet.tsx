import { Text } from "@chakra-ui/core";
import React from "react";

export interface TextSnippetProps {
  text: string;
}

const TextSnippet: React.FC<TextSnippetProps> = ({ text }) => {
  return (
    <Text
      letterSpacing={1}
      mt={{ base: 2, sm: 4 }}
      fontSize={{ base: 14, sm: 16, md: 16 }}
    >
      {text}
    </Text>
  );
};

export default TextSnippet;
