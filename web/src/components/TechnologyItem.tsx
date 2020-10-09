import { Stack, Text } from "@chakra-ui/core";
import React from "react";
import { getColorByIconName, getIconsMap } from "../utils/iconsMap";

export interface TechnologyItemProps {
  techId?: number;
  name: string;
  iconName: string;
  iconColor?: string;
  categoryName: string;
  categoryColor?: string;
  sepia: boolean;
}

const TechnologyItem: React.FC<TechnologyItemProps> = ({
  name,
  iconName,
  sepia,
}) => {
  const Icon = getIconsMap().get(iconName);
  const iconColor = getColorByIconName(iconName)
    ? getColorByIconName(iconName)
    : "";
  return (
    <Stack
      alignItems="center"
      direction="row"
      spacing={2}
      justifyContent="center"
    >
      {Icon && <Icon color={sepia ? "" : iconColor} size={32} />}
      <Text color={sepia ? "" : iconColor} mr={4}>
        {name}
      </Text>
    </Stack>
  );
};

export default TechnologyItem;
