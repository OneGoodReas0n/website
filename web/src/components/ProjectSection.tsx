import React from "react";
import { Link, Box, Text, Stack } from "@chakra-ui/core";
import TagList from "./TagList";
import { RegularTechnologyFragment, LinkObj } from "../generate/graphql";
import { ExternalLinkIcon } from "@chakra-ui/icons";

interface ProjectSectionProps {
  technologies: RegularTechnologyFragment[];
  description: string;
  link: LinkObj;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({
  technologies,
  description,
  link,
}) => {
  return (
    <Box pb={{ base: 8, md: 12 }}>
      <TagList technologies={technologies} />
      <Text mt={4}>{description}</Text>
      <Stack mt={6} spacing={6} direction="row" justifyContent="center">
        <Link href={link.demo} isExternal>
          Demo <ExternalLinkIcon mx="2px" />
        </Link>
        <Link href={link.demo} isExternal>
          Source code <ExternalLinkIcon mx="2px" />
        </Link>
      </Stack>
    </Box>
  );
};

export default ProjectSection;
