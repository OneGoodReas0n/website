import React from "react";
import { Box, Heading, Text } from "@chakra-ui/core";

export interface SectionSnippetProps {
  title: string;
  desc: string;
}

const SectionSnippet: React.FC<SectionSnippetProps> = ({ title, desc }) => {
  return (
    <Box p={6} shadow="md" borderWidth="1px" flex="1" rounded="md">
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text>
    </Box>
  );
};

export default SectionSnippet;
