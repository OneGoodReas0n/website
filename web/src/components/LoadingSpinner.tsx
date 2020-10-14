import React from "react";
import { Flex, Spinner, Box } from "@chakra-ui/core";

export interface LoadingSpinnerProps {}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({}) => {
  return (
    <Box>
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner
          thickness="8px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          w="60px"
          h="60px"
        />
      </Flex>
    </Box>
  );
};

export default LoadingSpinner;
