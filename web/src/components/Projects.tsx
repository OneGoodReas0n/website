import { Box } from "@chakra-ui/core";
import React from "react";
import Layout from "./Layout";
import ProjectItem, { ProjectItemProps } from "./ProjectItem";
import Title from "./Title";

export interface ProjectsProps {}

const Projects: React.FC<ProjectsProps> = ({}) => {
  const projectsData: ProjectItemProps[] = [
    {
      projectId: 1,
      name: "Piforum",
      description: "This is Reddit clone",
      technologies: [
        { name: "Typescript", iconName: "typescript", category: "backend" },
        { name: "Graphql", iconName: "graphql", category: "backend" },
        { name: "Apollo", iconName: "apollo", category: "backend" },
        { name: "Postgresql", iconName: "postgresql", category: "backend" },
        { name: "HTML5", iconName: "html", category: "frontend" },
        { name: "CSS3", iconName: "css", category: "frontend" },
        {
          name: "Typescript-React",
          iconName: "typescript",
          category: "frontend",
        },
      ],
      links: ["http://piforum.xyz", "http://piforum.xyz"],
      img: "https://via.placeholder.com/200",
    },
    {
      projectId: 2,
      name: "Weather App",
      description: "This is Weather app",
      technologies: [
        { name: "Typescript", iconName: "typescript", category: "backend" },
        { name: "Graphql", iconName: "graphql", category: "backend" },
        { name: "Apollo", iconName: "apollo", category: "backend" },
        { name: "Postgresql", iconName: "postgresql", category: "backend" },
        { name: "HTML5", iconName: "html", category: "frontend" },
        { name: "CSS3", iconName: "css", category: "frontend" },
        {
          name: "Typescript-React",
          iconName: "typescript",
          category: "frontend",
        },
      ],
      links: ["http://piforum.xyz", "http://piforum.xyz"],
      img: "https://via.placeholder.com/200",
    },
    {
      projectId: 3,
      name: "Virtual keyboard",
      description: "This is virtual keyboard app",
      technologies: [
        { name: "Typescript", iconName: "typescript", category: "backend" },
        { name: "Graphql", iconName: "graphql", category: "backend" },
        { name: "Apollo", iconName: "apollo", category: "backend" },
        { name: "Postgresql", iconName: "postgresql", category: "backend" },
        { name: "HTML5", iconName: "html", category: "frontend" },
        { name: "CSS3", iconName: "css", category: "frontend" },
        {
          name: "Typescript-React",
          iconName: "typescript",
          category: "frontend",
        },
      ],
      links: ["http://piforum.xyz", "http://piforum.xyz"],
      img: "https://via.placeholder.com/200",
    },
  ];

  const ProjectList = (() => {
    return (
      <>
        {projectsData.map((p) => (
          <ProjectItem
            key={p.name}
            name={p.name}
            description={p.description}
            technologies={p.technologies}
            links={p.links}
            img={p.img}
            projectId={p.projectId}
          />
        ))}
      </>
    );
  })();

  return (
    <Box id="projects" pb={6}>
      <Title title="Projects" />
      <Layout size="middle" mt={12}>
        {ProjectList}
      </Layout>
    </Box>
  );
};

export default Projects;
