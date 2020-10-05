import { Text } from "@chakra-ui/core";
import React from "react";

export interface TextSnippetProps {
  text: string;
}

const TextSnippet: React.FC<TextSnippetProps> = ({ text }) => {
  return (
    <Text letterSpacing={1} mt={8}>
      {text}
    </Text>
  );
};

export default TextSnippet;
