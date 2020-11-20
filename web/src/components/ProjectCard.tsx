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
  return (
    <Box
      w="200px"
      position="relative"
      shadow="md"
      as="button"
      {...options}
      mr={5}
      mb={5}
    >
      <Image
        w="200px"
        h="120px"
        src={pictureSrc ? pictureSrc : ""}
        bgColor={!pictureSrc ? "whitesmoke" : ""}
        bg={pictureSrc ? "rgba(0,0,0,0.5)" : ""}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        zIndex="2"
        transform="translate(-50%,-50%)"
      >
        {name !== "default" ? (
          <Text color="whitesmoke" fontSize={20} fontWeight={500}>
            {name}
          </Text>
        ) : (
          <Flex direction="column" alignItems="center">
            <AddIcon fontSize="32" />
            <Text mt={2}>Create new</Text>{" "}
          </Flex>
        )}
      </Box>
      {pictureSrc && (
        <Box
          position="absolute"
          h="100%"
          w="100%"
          top={0}
          bg="rgba(0,0,0,0.45)"
        ></Box>
      )}
    </Box>
  );
};

export default ProjectCard;
