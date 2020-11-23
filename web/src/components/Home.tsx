import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  Stack,
} from "@chakra-ui/core";
import React, { useState } from "react";
import Header from "./Header";
import Layout from "./Layout";
import SendMessageModal from "./SendMessageModal";
import CustomButton from "./CustomButton";

export interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Box h={{ base: "500px", sm: "500px", md: "760px" }} position="relative">
      <Flex
        px={{ base: "1rem", sm: "1rem", md: "2rem" }}
        flexDirection="column"
        h="100%"
      >
        <Box flexShrink={1}>
          <Header />
        </Box>
        <Layout h="100%">
          <Flex alignItems="center" h="100%" pb={20}>
            <Flex flexDirection="column" justify="center">
              <Heading
                letterSpacing={1}
                color="whitesmoke"
                fontFamily="PT Sans"
                fontWeight={400}
                fontSize={{ base: "24px", sm: "30px", md: "36px", xl: "48px" }}
              >
                Hi, I'm Reason.
              </Heading>
              <Text
                letterSpacing={2}
                color="whitesmoke"
                fontSize={{ base: "16px", sm: "20px", md: "28px", xl: "36px" }}
                fontFamily="Ubuntu"
                fontWeight={300}
                pt={3}
              >
                I am Fullstack Javascript Developer
              </Text>
              <Stack
                mt={10}
                direction={{ base: "column", sm: "column", md: "row" }}
                spacing={4}
                align="stretch"
              >
                <CustomButton variant="normal">See Projects</CustomButton>
                <CustomButton
                  variant="transparent"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Write me
                </CustomButton>
              </Stack>
            </Flex>
          </Flex>
        </Layout>
      </Flex>
      <Image
        height="100%"
        objectFit="cover"
        zIndex={-1}
        position="absolute"
        src="https://res.cloudinary.com/reason-store/image/upload/v1601646313/portfolio_bg_s4vvb2.jpg"
        top="0"
      />
      <SendMessageModal isOpen={isOpen} setOpen={setOpen} />
    </Box>
  );
};

export default Home;
