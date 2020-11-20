import { Flex } from "@chakra-ui/core";
import React, { useState } from "react";
import {
  RegularTechnologyFragment,
  RegularPictureFragment,
  LinkObj,
} from "../generate/graphql";
import PhotoSlider from "./PhotoSlider";
import ProjectSection from "./ProjectSection";
import BigPhotoModal from "./BigPhotoModal";

interface ProjectItemProps {
  position: number;
  name: string;
  technologies: RegularTechnologyFragment[];
  description: string;
  pictures: RegularPictureFragment[];
  link: LinkObj;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  name,
  technologies,
  description,
  pictures,
  position,
  link,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [url, setUrl] = useState("");
  return (
    <>
      <BigPhotoModal setOpen={setModalOpen} isOpen={isModalOpen} url={url} />
      {position % 2 === 0 ? (
        <Flex mb="100px" alignItems="center" justifyContent="center">
          <ProjectSection
            name={name}
            description={description}
            technologies={technologies}
            link={link}
          />
          <PhotoSlider
            w="50%"
            pictures={pictures}
            setBigModalOpen={setModalOpen}
            setUrl={setUrl}
          />
        </Flex>
      ) : (
        <Flex mb="100px" alignItems="center" justifyContent="center">
          <PhotoSlider
            w="50%"
            pictures={pictures}
            setBigModalOpen={setModalOpen}
            setUrl={setUrl}
          />
          <ProjectSection
            name={name}
            description={description}
            technologies={technologies}
            link={link}
          />
        </Flex>
      )}
    </>
  );
};

export default ProjectItem;
