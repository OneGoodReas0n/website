import React from "react";
import { Box, Flex, Skeleton, Stack, Text } from "@chakra-ui/core";
import { useGetTechnologiesQuery } from "../generate/graphql";
import { categoryNames, mapCategoryNumByName } from "../utils/mapping";
import Layout from "./Layout";
import Slider from "./Slider";
import TechnologyTag from "./TechnologyTag";
import Title from "./Title";

export interface TechnologiesProps {}

const Technologies: React.FC<TechnologiesProps> = ({}) => {
  const { data, loading } = useGetTechnologiesQuery();

  if (loading) {
    return (
      <Box minHeight="500px" id="technologies">
        <Title>Technologies</Title>
        <Layout size="middle"></Layout>
        {categoryNames.map((cat) => {
          return (
            <Stack key={cat}>
              <Skeleton>Item</Skeleton>
              <Skeleton>Item</Skeleton>
              <Skeleton>Item</Skeleton>
            </Stack>
          );
        })}
      </Box>
    );
  } else if (!data && !loading) {
    return (
      <Layout size="middle">
        <Text>Something went wrong </Text>
      </Layout>
    );
  } else {
    return (
      <Box minHeight="500px" id="technologies">
        <Title>Technologies</Title>
        <Layout size="middle">
          {categoryNames.map((categoryName, index) => {
            const technologiesSection = (() => {
              return data?.getTechnologies
                .filter(
                  (el) =>
                    el.category ===
                    mapCategoryNumByName(categoryName, categoryNames)
                )
                .map((tech) => (
                  <TechnologyTag
                    key={tech.id}
                    iconName={tech.iconName ? tech.iconName : ""}
                    name={tech.name}
                    sepia={true}
                  />
                ));
            })();
            if (technologiesSection!.length > 3) {
              return (
                <Slider
                  key={categoryName}
                  children={technologiesSection}
                  numOfElemsToShow={3}
                  scrollDelay={2000 + index * 100}
                />
              );
            }
            return (
              <Flex key={categoryName} mt={12} justifyContent="space-around">
                {technologiesSection}
              </Flex>
            );
          })}
        </Layout>
      </Box>
    );
  }
};

export default Technologies;
