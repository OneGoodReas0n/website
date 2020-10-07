import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { useLogoutMutation } from "../generate/graphql";

export interface NavbarProps {
  email: string;
}

const Navbar: React.FC<NavbarProps> = ({ email }) => {
  const router = useRouter();
  const [logout] = useLogoutMutation();
  return (
    <Box>
      <Flex justifyContent="flex-end" alignItems="center" p={4}>
        <Text mr={5}>{email}</Text>
        <Button
          onClick={() => {
            logout({
              update: (cache) => {
                cache.evict({ fieldName: "me" });
              },
            });
            router.push("/");
          }}
        >
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
