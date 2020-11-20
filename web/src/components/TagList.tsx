import { Box, BoxProps, Stack } from "@chakra-ui/core";
import React from "react";
import { RegularTechnologyFragment } from "../generate/graphql";
import TagItem from "./TagItem";

export interface TagListProps extends BoxProps {
  technologies: RegularTechnologyFragment[];
}

const TagList: React.FC<TagListProps> = ({ technologies }) => {
  const Tags = (() => (
    <Box mt={2}>
      {technologies.map((tag) => (
        <TagItem name={tag.name} iconName={tag.iconName || ""} key={tag.name} />
      ))}
    </Box>
  ))();
  return <Stack isInline={true}>{Tags}</Stack>;
};

export default TagList;
