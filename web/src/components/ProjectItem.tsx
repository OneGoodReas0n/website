import { Flex, Stack, Heading, Box } from "@chakra-ui/core";
import React, { RefObject } from "react";
import { RegularProjectFragment } from "../generate/graphql";
import PhotoSlider from "./PhotoSlider";
import ProjectSection from "./ProjectSection";
import { Breakpoints } from "../utils/breakpoints";

interface ProjectItemProps {
  position: number;
  project: RegularProjectFragment;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, position }) => {
  const { link, name, description, pictures, technologies } = project;
  return (
    <Box p={{ base: 4, md: 8 }}>
      <Stack spacing={2} display={{ base: "block", md: "none" }}>
        <Heading size="lg">{name}</Heading>
        <PhotoSlider
          w={{ base: "100%", md: "50%" }}
          pictures={pictures || []}
          mb={10}
        />
        <ProjectSection
          description={description || ""}
          technologies={technologies || []}
          link={link}
        />
      </Stack>
      {position % 2 === 0 ? (
        <Stack
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          justifyContent="center"
          spacing={2}
          direction="row"
        >
          <Box>
            <Heading size="lg">{name}</Heading>
            <ProjectSection
              description={description || ""}
              technologies={technologies || []}
              link={link}
            />
          </Box>
          <PhotoSlider
            w="50%"
            pictures={pictures || []}
            mb={{ base: 4, md: 20 }}
          />
        </Stack>
      ) : (
        <Flex
          alignItems="center"
          justifyContent="center"
          display={{ base: "none", md: "flex" }}
        >
          <PhotoSlider
            w="50%"
            pictures={pictures || []}
            mb={{ base: 4, md: 20 }}
          />
          <Box>
            <Heading size="lg">{name}</Heading>
            <ProjectSection
              description={description || ""}
              technologies={technologies || []}
              link={link}
            />
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default ProjectItem;
