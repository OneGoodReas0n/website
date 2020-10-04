import React from "react";
import { Box, Heading, Text, Flex } from "@chakra-ui/core";

export interface AboutProps {}

const About: React.FC<AboutProps> = ({}) => {
  return (
    <Box minHeight="500px" id="about">
      <Heading mt={6} textAlign="center">
        About
      </Heading>
      <Flex w="60%" mx="auto" mt={6} flexDirection="column">
        <Text letterSpacing={1} mt={8}>
          My name is Illia Korobov, currently living in Ilmenau, Germany. I have
          a Bachelor and Master in Sybersecurity from Oles Gonchar National
          University and my primary focus and inspiration for my studies is Web
          Development. I started programming since I was 19 and I tried lots of
          languages (PHP, Java, C++, Javascript) and technologies (Laravel,
          Spring Boot, React, Typescript, Graphql and other). Now i am studying
          Computer Engeneering at Technical University Ilmenau and I really like
          to solve complex tasks and create some gorgeous and interactive
          websites.
        </Text>
        <Text letterSpacing={1} mt={8}>
          In my free time I make some IOT projects with esp32 or Arduino, study
          UI/UX basics and create my pet-projects. I am both driven and
          self-motivated, and I am often make some experiments with new
          technologies and techniques. I am very passionate about Web
          Development, and strive to better myself as a developer.
        </Text>
      </Flex>
    </Box>
  );
};

export default About;
