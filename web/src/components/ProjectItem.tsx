import { BoxProps, Flex } from "@chakra-ui/core";
import React from "react";
import PhotoSlider from "./PhotoSlider";
import ProjectSection from "./ProjectSection";
import { TechnologyItemProps } from "./TechnologyItem";

export interface ProjectItemProps extends BoxProps {
  projectId: number;
  name: string;
  technologies: TechnologyItemProps[];
  description: string;
  links: string[];
  img: string;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  name,
  technologies,
  description,
  links,
  img,
  projectId,
}) => {
  return (
    <>
      {projectId % 2 === 0 ? (
        <Flex mb="100px" alignItems="center" justifyContent="center">
          <ProjectSection
            name={name}
            description={description}
            technologies={technologies}
            links={links}
            img={img}
            projectId={projectId}
          />
          <PhotoSlider w="50%" />
        </Flex>
      ) : (
        <Flex mb="100px" alignItems="center" justifyContent="center">
          <PhotoSlider w="50%" />
          <ProjectSection
            name={name}
            description={description}
            technologies={technologies}
            links={links}
            img={img}
            projectId={projectId}
          />
        </Flex>
      )}
    </>
  );
};

export default ProjectItem;
