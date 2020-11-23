import { Flex } from "@chakra-ui/core";
import React from "react";
import { RegularProjectFragment } from "../generate/graphql";
import PhotoSlider from "./PhotoSlider";
import ProjectSection from "./ProjectSection";

interface ProjectItemProps {
  position: number;
  project: RegularProjectFragment;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, position }) => {
  const { link, name, description, pictures, technologies } = project;
  return (
    <>
      {position % 2 === 0 ? (
        <Flex mb="100px" alignItems="center" justifyContent="center">
          <ProjectSection
            name={name}
            description={description || ""}
            technologies={technologies || []}
            link={link}
          />
          <PhotoSlider w="50%" pictures={pictures || []} />
        </Flex>
      ) : (
        <Flex mb="100px" alignItems="center" justifyContent="center">
          <PhotoSlider w="50%" pictures={pictures || []} />
          <ProjectSection
            name={name}
            description={description || ""}
            technologies={technologies || []}
            link={link}
          />
        </Flex>
      )}
    </>
  );
};

export default ProjectItem;
