import React from "react";
import { Box, Heading, Text } from "@chakra-ui/core";
import Slider from "./Slider";
import TechnologyItem, { TechnologyItemProps } from "./TechnologyItem";

export interface TechnologiesProps {}

const Technologies: React.FC<TechnologiesProps> = ({}) => {
  const backTechnologiesData: TechnologyItemProps[] = [
    {
      id: 1,
      name: "NodeJS",
      iconName: "nodejs",
    },
    {
      id: 2,
      name: "Typescript",
      iconName: "typescript",
    },
    {
      id: 3,
      name: "Apollo",
      iconName: "apollo",
    },
    {
      id: 4,
      name: "GraphQL",
      iconName: "graphql",
    },
  ];
  const frontTechnologiesData: TechnologyItemProps[] = [
    {
      id: 1,
      name: "React",
      iconName: "react",
    },
    {
      id: 2,
      name: "Typescript-React",
      iconName: "typescript",
    },
    {
      id: 3,
      name: "VanillaJS",
      iconName: "vanillajs",
    },
    {
      id: 4,
      name: "HTML5",
      iconName: "html",
    },
    {
      id: 5,
      name: "CSS3",
      iconName: "css",
    },
    {
      id: 6,
      name: "SASS",
      iconName: "sass",
    },
  ];
  const databaseData: TechnologyItemProps[] = [
    { id: 1, name: "PostgreSQL", iconName: "postgresql" },
    { id: 2, name: "MySQL", iconName: "mysql" },
    { id: 3, name: "MongoDB", iconName: "mongodb" },
  ];

  const otherData: TechnologyItemProps[] = [
    { id: 1, name: "Github", iconName: "github" },
    { id: 2, name: "Trello", iconName: "trello" },
    { id: 3, name: "Figma", iconName: "figma" },
  ];
  const backTechnologies = (() => {
    return backTechnologiesData.map((tech) => (
      <TechnologyItem key={tech.id} name={tech.name} iconName={tech.iconName} />
    ));
  })();

  const frontTechnologies = (() => {
    return frontTechnologiesData.map((tech) => (
      <TechnologyItem key={tech.id} name={tech.name} iconName={tech.iconName} />
    ));
  })();
  const databaseTechnologies = (() => {
    return databaseData.map((tech) => (
      <TechnologyItem key={tech.id} name={tech.name} iconName={tech.iconName} />
    ));
  })();
  const otherTechnologies = (() => {
    return otherData.map((tech) => (
      <TechnologyItem key={tech.id} name={tech.name} iconName={tech.iconName} />
    ));
  })();
  return (
    <Box minHeight="500px" id="technologies">
      <Heading mt={6} textAlign="center">
        Technologies
      </Heading>
      <Box overflow="hidden" w="60%" mx="auto">
        <Slider
          children={backTechnologies}
          numOfElemsToShow={3}
          scrollDelay={2000}
        />
        <Slider
          children={frontTechnologies}
          numOfElemsToShow={3}
          scrollDelay={1800}
        />
        <Slider children={databaseTechnologies} numOfElemsToShow={3} />

        <Slider children={otherTechnologies} numOfElemsToShow={3} />
      </Box>
    </Box>
  );
};

export default Technologies;
