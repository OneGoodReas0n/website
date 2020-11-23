import { Box, Flex } from "@chakra-ui/core";
import React from "react";
import Layout from "./Layout";
import TextSnippet from "./TextSnippet";
import Title from "./Title";

export interface AboutProps {}

const About: React.FC<AboutProps> = ({}) => {
  return (
    <Box id="about">
      <Title>About</Title>
      <Layout size="middle">
        <Flex mt={6} flexDirection="column">
          <TextSnippet text="My name is Illia Korobov, currently living in Ilmenau, Germany. I have Bachelor and Master deegrees in Sybersecurity from Oles Gonchar National University and my primary focus and inspiration for my studies is Web Development. I started programming since I was 19 and I tried lots of languages (PHP, Java, C++, Javascript) and technologies (Laravel,Spring Boot, React, Typescript, Graphql and other). Now i am studying Computer Engeneering at Technical University Ilmenau and I really like to solve complex tasks and create some gorgeous and interactive websites." />
          <TextSnippet text="In my free time I make some IOT projects with esp32 or Arduino, study UI/UX basics and create my pet-projects. I am both driven and self-motivated, and I am often make some experiments with new technologies and techniques. I am very passionate about Web    Development, and strive to better myself as a developer." />
        </Flex>
      </Layout>
    </Box>
  );
};

export default About;
