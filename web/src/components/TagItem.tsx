import React from "react";
import { Tag, TagLabel } from "@chakra-ui/core";
import { getIconsMap, getColorByIconName } from "../utils/iconsMap";

export interface TagItemProps {
  name: string;
  iconName: string;
}

const TagItem: React.FC<TagItemProps> = ({ name, iconName }) => {
  const possibleIcon = getIconsMap().get(iconName);
  const Icon = possibleIcon ? possibleIcon : null;
  const tagColor = getColorByIconName(iconName);
  return (
    <Tag p={2} mt={2} mr={2} userSelect="none">
      {Icon && <Icon size={20} color={tagColor} />}
      <TagLabel ml={2} color={tagColor}>
        {name}
      </TagLabel>
    </Tag>
  );
};

export default TagItem;
