import { Box, Flex, Text } from "@chakra-ui/core";
import React, { useState } from "react";
import Layout from "../components/Layout";
import ModalForm from "../components/ModalForm";
import ProjectCard from "../components/ProjectCard";
import Title from "../components/Title";
import { useGetProjectsQuery } from "../generate/graphql";
import { withApollo } from "../utils/withApollo";
import LoadingSpinner from "../components/LoadingSpinner";

export interface ProjectsProps {}

const Projects: React.FC<ProjectsProps> = ({}) => {
  const { data, loading } = useGetProjectsQuery();
  const projectsData = data?.getProjects;
  const [isOpen, setOpen] = useState(false);
  const [isUpdateProjectOpen, setUpdateProjectOpen] = useState(false);

  let body;

  if (loading) {
    // Loading state
  } else if (!loading && data) {
    console.log(data);
    const Projects = (() => {
      return projectsData?.map((p) => (
        <ProjectCard
          key={p.name}
          name={p.name}
          pictureSrc={p.pictures ? p.pictures?.find((p) => p.primary)?.url : ""}
        />
      ));
    })();
    body = Projects;
  }
  return (
    <Box>
      <Title title="Projects" />
      <Layout size="middle">
        <Flex mt={6}>
          {body}
          <ProjectCard
            onClick={() => {
              setOpen(true);
            }}
          />
        </Flex>
      </Layout>
      <ModalForm
        isOpen={isOpen}
        setOpen={setOpen}
        action="create"
        variant="project"
      />
      <ModalForm
        isOpen={isUpdateProjectOpen}
        setOpen={setUpdateProjectOpen}
        action="create"
        variant="project"
      />
    </Box>
  );
};

export default withApollo({ ssr: false })(Projects);
