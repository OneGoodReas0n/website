import { Box, Flex, Skeleton, Stack, Text } from "@chakra-ui/core";
import React from "react";
import { useGetTechnologiesQuery } from "../generate/graphql";
import { Breakpoints } from "../utils/breakpoints";
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
      <Box id="technologies">
        <Title>Technologies</Title>
        <Layout />
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
      <Layout>
        <Text>Something went wrong </Text>
      </Layout>
    );
  } else {
    return (
      <Box id="technologies">
        <Title>Technologies</Title>
        <Layout>
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
            if (technologiesSection!.length > 2) {
              return (
                <>
                  <Box display={{ base: "block", md: "none" }}>
                    <Slider
                      key={categoryName}
                      children={technologiesSection}
                      numOfElemsToShow={2}
                      scrollDelay={2000 + index * 100}
                    />
                  </Box>
                  <Box display={{ base: "none", md: "block" }}>
                    <Slider
                      key={categoryName}
                      children={technologiesSection}
                      numOfElemsToShow={3}
                      scrollDelay={2000 + index * 100}
                    />
                  </Box>
                </>
              );
            }
            return (
              <Flex
                key={categoryName}
                mt={{ base: 4, sm: 6, md: 8, lg: 12 }}
                justifyContent="space-around"
              >
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
