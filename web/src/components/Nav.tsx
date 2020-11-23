import React from "react";
import { Link, Stack } from "@chakra-ui/core";
import NextLink from "next/link";

export interface NavProps {}

type Link = {
  id: number;
  name: string;
};

const Nav: React.FC<NavProps> = ({}) => {
  const linkObjects: Link[] = [
    { id: 1, name: "Home" },
    { id: 2, name: "About" },
    { id: 3, name: "Technologies" },
    { id: 4, name: "Projects" },
  ];

  const Links = (() => {
    return linkObjects.map((l) => {
      return (
        <NextLink href={`#${l.name.toLowerCase()}`} key={l.id}>
          <Link
            color="whitesmoke"
            fontFamily="Ubuntu"
            fontWeight={300}
            fontSize={20}
          >
            {l.name}
          </Link>
        </NextLink>
      );
    });
  })();

  return (
    <Stack
      spacing={{ base: "0.5rem", md: "4rem" }}
      direction={{ base: "column", md: "row" }}
      alignItems="center"
    >
      {Links}
    </Stack>
  );
};

export default Nav;
