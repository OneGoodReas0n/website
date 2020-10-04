import React from "react";
import { Box, Image, Heading, Flex, Text, Button } from "@chakra-ui/core";
import Header from "./Header";

export interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  return (
    <Box h="100vh">
      <Flex px={16} flexDirection="column" h="100%">
        <Box flexShrink={1}>
          <Header />
        </Box>
        <Flex flexDirection="column" justifyContent="center" flex={1} mb={20}>
          <Heading
            letterSpacing={1}
            color="whitesmoke"
            fontFamily="PT Sans"
            fontWeight={400}
            fontSize={48}
          >
            Hi, I'm Reason.
          </Heading>
          <Text
            letterSpacing={2}
            color="whitesmoke"
            fontSize={30}
            fontFamily="Ubuntu"
            fontWeight={300}
            pt={3}
          >
            I am Junior Javascript Developer
          </Text>
          <Box mt={10}>
            <Button
              rounded="full"
              px={20}
              py={6}
              mr={5}
              textTransform="uppercase"
            >
              See Projects
            </Button>
            <Button
              color="whitesmoke"
              rounded="full"
              px={20}
              py={6}
              textTransform="uppercase"
              border="2px"
              borderColor="whitesmoke"
              bgColor="transparent"
            >
              Write me
            </Button>
          </Box>
        </Flex>
      </Flex>

      <Image
        zIndex={-1}
        position="absolute"
        src="https://res.cloudinary.com/reason-store/image/upload/v1601646313/portfolio_bg_s4vvb2.jpg"
        top="0"
      />
    </Box>
  );
};

export default Home;
