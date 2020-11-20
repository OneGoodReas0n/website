import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/core";

export interface DataFailedProps {}

const DataFailed: React.FC<DataFailedProps> = ({}) => {
  return <Flex alignItems="center" justifyContent="center">
     <Heading>Something went wrong with your data</Heading>
  </Flex>;
};

export default DataFailed;
