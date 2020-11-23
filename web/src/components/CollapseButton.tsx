import React from "react";
import { Box, Stack, ButtonProps, Flex } from "@chakra-ui/core";

export interface CollapseButtonProps extends ButtonProps {
  isOpen: boolean;
}

const CollapseButton: React.FC<CollapseButtonProps> = ({
  isOpen,
  ...properties
}) => {
  return (
    <Box as="button" {...properties}>
      {!isOpen ? (
        <Stack align="stretch" spacing="3px">
          <Box w="20px" h="2px" bgColor="whitesmoke" />
          <Box w="20px" h="2px" bgColor="whitesmoke" />
          <Box w="20px" h="2px" bgColor="whitesmoke" />
        </Stack>
      ) : (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Box
            w="20px"
            h="2px"
            bgColor="whitesmoke"
            transform="rotate(45deg)"
            position="relative"
            top="2px"
          />
          <Box
            w="20px"
            h="2px"
            bgColor="whitesmoke"
            transform="rotate(-45deg)"
          />
        </Flex>
      )}
    </Box>
  );
};

export default CollapseButton;
