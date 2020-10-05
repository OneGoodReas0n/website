import React from "react";
import { ProjectItemProps } from "./ProjectItem";
import { Heading, Link, Box, Text } from "@chakra-ui/core";
import TagList from "./TagList";

const ProjectSection: React.FC<ProjectItemProps> = ({
  name,
  technologies,
  description,
  links,
}) => {
  return (
    <Box ml={8}>
      <Heading size="lg">{name}</Heading>
      <TagList technologies={technologies} />
      <Text mt={4}>{description}</Text>
      <Box mt={6}>
        <Link href={links[0]} mr={4}>
          Go to demo
        </Link>
        <Link href={links[1]}>Source code</Link>
      </Box>
    </Box>
  );
};

export default ProjectSection;
