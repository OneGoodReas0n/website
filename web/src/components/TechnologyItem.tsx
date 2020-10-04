import { Flex, Text } from "@chakra-ui/core";
import React from "react";
import { getIconsMap } from "../utils/iconsMap";

export interface TechnologyItemProps {
  id?: number;
  name: string;
  iconName: string;
  svgColor?: string;
}

const TechnologyItem: React.FC<TechnologyItemProps> = ({ name, iconName }) => {
  const possibleIcon = getIconsMap().get(iconName);
  const Icon = possibleIcon ? possibleIcon : null;
  return (
    <Flex alignItems="center" justifyContent="center">
      <Text mr={4}>{name}</Text>
      {Icon && <Icon size={32} color="#334455" />}
    </Flex>
  );
};

export default TechnologyItem;
