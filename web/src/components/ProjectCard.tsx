import { Box, Flex, Image, Text, BoxProps } from "@chakra-ui/core";
import { AddIcon } from "@chakra-ui/icons";
import React from "react";

export interface ProjectCardProps extends BoxProps {
  name?: string;
  pictureSrc?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  pictureSrc,
  ...options
}) => {
  console.log(pictureSrc);
  return (
    <Box w="200px" position="relative" shadow="md" as="button" {...options}>
      <Image
        w="200px"
        h="120px"
        src={pictureSrc ? pictureSrc : ""}
        bgColor={!pictureSrc ? "whitesmoke" : ""}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%,-50%)"
      >
        {name ? (
          <Text>{name}</Text>
        ) : (
          <Flex direction="column" alignItems="center">
            <AddIcon fontSize="32" />
            <Text mt={2}>Create new</Text>{" "}
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default ProjectCard;
