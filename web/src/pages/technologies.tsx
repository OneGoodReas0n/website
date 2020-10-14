import { Box, Skeleton, Flex } from "@chakra-ui/core";
import React, { useState } from "react";
import Layout from "../components/Layout";
import ModalForm from "../components/ModalForm";
import TechnologyCard from "../components/TechnologyCard";
import Title from "../components/Title";
import { useGetTechnologiesQuery, useMeQuery } from "../generate/graphql";
import { withApollo } from "../utils/withApollo";
import LoadingSpinner from "../components/LoadingSpinner";
import { useRouter } from "next/router";

export interface TechnologiesProps {}

const Technologies: React.FC<TechnologiesProps> = ({}) => {
  const { data: technologies, loading } = useGetTechnologiesQuery();
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [entityId, setEntityId] = useState(0);
  const { data: meData, loading: meLoading } = useMeQuery();

  const router = useRouter();

  const Technologies = (() => {
    return technologies?.getTechnologies?.map((p) => (
      <TechnologyCard
        mr={6}
        mb={6}
        key={p.name}
        name={p.name}
        categoryName={p.category?.name ? p.category?.name : ""}
        iconName={p.icon?.name ? p.icon?.name : ""}
        onClick={() => {
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
      <Title title="Technologies" />
      <Layout size="middle">
        <Box mt={12}>
          {body}
          <TechnologyCard
            key="default"
            name="default"
            categoryName=""
            onClick={() => {
              setCreateModalOpen(true);
            }}
            iconName=""
          />
        </Box>
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
