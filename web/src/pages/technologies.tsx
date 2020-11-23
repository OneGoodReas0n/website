import { Box, Flex, Skeleton } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Layout from "../components/Layout";
import LoadingSpinner from "../components/LoadingSpinner";
import ModalForm from "../components/ModalForm";
import TechnologyItem from "../components/TechnologyItem";
import Title from "../components/Title";
import {
  useGetTechnologiesQuery,
  useMeQuery,
  RegularTechnologyFragment,
} from "../generate/graphql";
import { withApollo } from "../utils/withApollo";

export interface TechnologiesProps {}

const Technologies: React.FC<TechnologiesProps> = ({}) => {
  const { data: technologies, loading } = useGetTechnologiesQuery();
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [entityId, setEntityId] = useState(0);
  const { data: meData, loading: meLoading } = useMeQuery();

  const router = useRouter();

  const Technologies = (() => {
    return [
      ...(technologies?.getTechnologies || []),
      {
        name: "default",
        category: -1,
        iconName: "addIcon",
      } as RegularTechnologyFragment,
    ].map((p) => (
      <TechnologyItem
        key={p.name}
        name={p.name}
        category={p.category}
        iconName={p.iconName}
        handleClick={() => {
          if (p.name === "default") {
            setCreateModalOpen(true);
            return;
          }
          setEntityId(p.id);
          setUpdateModalOpen(true);
        }}
      />
    ));
  })();
  let body;
  if (meLoading) {
    return <LoadingSpinner />;
  } else if (!meLoading && !meData?.me) {
    router.push("/");
  }

  if (loading) {
    return (
      <Box>
        <Flex>
          <Skeleton>Item</Skeleton>
          <Skeleton>Item</Skeleton>
          <Skeleton>Item</Skeleton>
          <Skeleton>Item</Skeleton>
        </Flex>
        <Flex>
          <Skeleton>Item</Skeleton>
          <Skeleton>Item</Skeleton>
          <Skeleton>Item</Skeleton>
          <Skeleton>Item</Skeleton>
        </Flex>
        <Flex>
          <Skeleton>Item</Skeleton>
          <Skeleton>Item</Skeleton>
          <Skeleton>Item</Skeleton>
          <Skeleton>Item</Skeleton>
        </Flex>
        <Flex>
          <Skeleton>Item</Skeleton>
          <Skeleton>Item</Skeleton>
          <Skeleton>Item</Skeleton>
          <Skeleton>Item</Skeleton>
        </Flex>
      </Box>
    );
  } else if (!loading && technologies) {
    body = Technologies;
  }
  return (
    <Box>
      <Title>Technologies</Title>
      <Layout size="middle">
        <Box mt={8}>{body}</Box>
      </Layout>
      <ModalForm
        variant="technology"
        action="create"
        isOpen={isCreateModalOpen}
        setOpen={setCreateModalOpen}
      />
      <ModalForm
        variant="technology"
        action="update"
        isOpen={isUpdateModalOpen}
        setOpen={setUpdateModalOpen}
        entityId={entityId}
      />
    </Box>
  );
};

export default withApollo({ ssr: false })(Technologies);
