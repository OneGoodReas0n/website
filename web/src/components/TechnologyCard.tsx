import { Box, BoxProps, Flex, Text } from "@chakra-ui/core";
import { AddIcon } from "@chakra-ui/icons";
import React from "react";
import TechnologyItem, { TechnologyItemProps } from "./TechnologyItem";

interface TechnologyCardProps extends TechnologyItemProps, BoxProps {}

const TechnologyCard: React.FC<TechnologyCardProps> = ({
  categoryColor,
  categoryName,
  iconName,
  name,
  id,
  ...options
}) => {
  return (
    <Box
      position="relative"
      shadow="md"
      as="button"
      {...options}
      p={4}
      minW="120px"
      minH="64px"
    >
      {name === "default" ? (
        <Box
          w="100%"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%,-50%)"
        >
          <Flex direction="column" alignItems="center">
            <AddIcon fontSize="24" />
            <Text mt={2}>Create new</Text>{" "}
          </Flex>
        </Box>
      ) : (
        <Box>
          <TechnologyItem
            name={name}
            iconName={iconName}
            categoryName={categoryName}
            categoryColor={categoryColor}
          />
        </Box>
      )}
    </Box>
  );
};

export default TechnologyCard;
