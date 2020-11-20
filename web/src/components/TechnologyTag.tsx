import React from "react";
import { Text, Stack, Flex } from "@chakra-ui/core";
import { getIconsMap, getColorByIconName } from "../utils/iconsMap";

export interface TechnologyTagProps {
  name: string;
  iconName: string;
  sepia?: boolean;
}

const TechnologyTag: React.FC<TechnologyTagProps> = ({
  name,
  sepia,
  iconName,
}) => {
  const Icon = getIconsMap().get(iconName);
  const iconColor = getColorByIconName(iconName)
    ? getColorByIconName(iconName)
    : "";
  return (
    <Flex justifyContent="center">
      <Stack p={3} spacing={2} direction="row" alignItems="center">
        {Icon && <Icon color={sepia ? "" : iconColor} size={32} />}
        <Text color={sepia ? "" : iconColor} ml={2}>
          {name}
        </Text>
      </Stack>
    </Flex>
  );
};

export default TechnologyTag;
