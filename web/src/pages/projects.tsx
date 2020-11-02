import { Box, Flex } from "@chakra-ui/core";
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
  const [isOpen, setOpen] = useState(false);
  const [projectId, setProjectId] = useState(-1);
  const [isUpdateModalOpen, setUpdateModal] = useState(false);

  let body;

  if (loading) {
    return <LoadingSpinner />;
  } else if (!loading && data) {
    const Projects = (() => {
      return data.getProjects?.map((p) => (
        <ProjectCard
          key={p.name}
          name={p.name}
          pictureSrc={p.pictures ? p.pictures?.find((p) => p.primary)?.url : ""}
          onClick={() => {
            setProjectId(p.id);
            setUpdateModal(true);
          }}
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
        isOpen={isUpdateModalOpen}
        setOpen={setUpdateModal}
        action="update"
        variant="project"
        projectId={projectId}
      />
    </Box>
  );
};

export default withApollo({ ssr: false })(Projects);
