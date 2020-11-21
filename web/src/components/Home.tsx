import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/core";
import React, { useState } from "react";
import Header from "./Header";
import Layout from "./Layout";
import SendMessageModal from "./SendMessageModal";

export interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Box h="760px" position="relative">
        <Flex px={16} flexDirection="column" h="100%">
          <Box flexShrink={1}>
            <Header />
          </Box>
          <Layout h="100%" size="big">
            <Flex alignItems="center" h="100%" pb={20}>
              <Flex flexDirection="column" justify="center">
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
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    Write me
                  </Button>
                </Box>
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
      </Box>
      <SendMessageModal isOpen={isOpen} setOpen={setOpen} />
    </>
  );
};

export default Home;
