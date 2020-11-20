import { Flex, Text, Box, SquareProps } from "@chakra-ui/core";
import { AddIcon } from "@chakra-ui/icons";
import React from "react";
import { getColorByIconName, getIconsMap } from "../utils/iconsMap";

export interface TechnologyItemProps extends Pick<SquareProps, "onClick"> {
  name: string;
  iconName: string;
  sepia?: boolean;
  category?: number;
  handleClick(): void;
}

const TechnologyItem: React.FC<TechnologyItemProps> = ({
  name,
  iconName,
  sepia = false,
  handleClick,
}) => {
  const Icon = getIconsMap().get(iconName);
  const iconColor = getColorByIconName(iconName)
    ? getColorByIconName(iconName)
    : "";
  return (
    <Box
      shadow="lg"
      as="button"
      float="left"
      p={name === "default" ? 3 : 4}
      mb={4}
      mr={4}
      onClick={() => handleClick()}
    >
      <Flex
        flexDirection={name === "default" ? "column" : "row"}
        alignContent="start"
        alignItems="center"
        justifyContent="flex-start"
        px={name === "default" ? 2 : 0}
      >
        {Icon && <Icon color={sepia ? "" : iconColor} size={32} />}
        {iconName === "addIcon" && <AddIcon mb={2} fontSize={12} />}
        <Text color={sepia ? "" : iconColor} ml={name === "default" ? 0 : 2}>
          {name === "default" ? "Create new" : name}
        </Text>
      </Flex>
    </Box>
  );
};

export default TechnologyItem;
