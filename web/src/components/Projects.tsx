import { Box } from "@chakra-ui/core";
import React from "react";
import { useGetProjectsQuery } from "../generate/graphql";
import DataFailed from "./DataFailed";
import Layout from "./Layout";
import LoadingSpinner from "./LoadingSpinner";
import ProjectItem from "./ProjectItem";
import Title from "./Title";

export interface ProjectsProps {}

const Projects: React.FC<ProjectsProps> = ({}) => {
  const { data, loading } = useGetProjectsQuery();
  const ProjectList = (() => {
    return (
      <>
        {data?.getProjects.map((p, index) => (
          <ProjectItem key={p.name} project={p} position={index} />
        ))}
      </>
    );
  })();
  if (loading) {
    return <LoadingSpinner />;
  } else if (!loading && !data) {
    return <DataFailed />;
  }

  return (
    <Box id="projects">
      <Title>Projects</Title>
      <Layout size="middle" mt={12}>
        {ProjectList}
      </Layout>
    </Box>
  );
};

export default Projects;
