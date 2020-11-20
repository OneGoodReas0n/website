import React from "react";
import { Heading, Link, Box, Text } from "@chakra-ui/core";
import TagList from "./TagList";
import { RegularTechnologyFragment, ProjectLink } from "../generate/graphql";

interface ProjectSectionProps {
  name: string;
  technologies: RegularTechnologyFragment[];
  description: string;
  link: ProjectLink;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({
  name,
  technologies,
  description,
  link,
}) => {
  return (
    <Box ml={8}>
      <Heading size="lg">{name}</Heading>
      <TagList technologies={technologies} />
      <Text mt={4}>{description}</Text>
      <Box mt={6}>
        <Link href={link.demo} mr={4}>
          Go to demo
        </Link>
        <Link href={link.source_code}>Source code</Link>
      </Box>
    </Box>
  );
};

export default ProjectSection;
