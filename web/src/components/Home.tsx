import { Box, Flex, Heading, Image, Text, Stack } from "@chakra-ui/core";
import React, { useState } from "react";
import Header from "./Header";
import Layout from "./Layout";
import SendMessageModal from "./SendMessageModal";
import CustomButton from "./CustomButton";

export interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Box position="relative" h={{ base: "400px", md: "56vw", lg: "48vw" }}>
      <Flex px={{ base: 4, md: 8 }} flexDirection="column" h="100%">
        <Box flexShrink={1}>
          <Header />
        </Box>
        <Layout h="100%">
          <Flex alignItems="center" h="100%">
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
                fontSize={{ base: "16px", sm: "20px", md: "24px", xl: "36px" }}
                fontFamily="Ubuntu"
                fontWeight={300}
                pt={3}
              >
                I am Fullstack Javascript Developer
              </Text>
              <Stack
                mt={{ base: 4, sm: 6, md: 8, lg: 10 }}
                direction={{ base: "column", sm: "row", md: "row" }}
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
        w="100%"
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
