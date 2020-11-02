import React from "react";
import { Stack, BoxProps, Box } from "@chakra-ui/core";
import { TechnologyItemProps } from "./TechnologyItem";
import TagItem from "./TagItem";

export interface TagListProps extends BoxProps {
  technologies: TechnologyItemProps[];
}

const TagList: React.FC<TagListProps> = ({ technologies }) => {
  const Tags = (() => (
    <Box mt={2}>
      {technologies.map((tag) => (
        <TagItem
          name={tag.name}
          iconName={tag.iconName}
          key={tag.name}
          categoryName={tag.categoryName}
        />
      ))}
    </Box>
  ))();
  return <Stack isInline={true}>{Tags}</Stack>;
};

export default TagList;
