import React from "react";
import { Box, Flex, Image, Link } from "@chakra-ui/core";

export interface SocialsProps {}

type SocialItem = {
  id: number;
  name: string;
  src: string;
  description?: string;
  link: string;
};

const Socials: React.FC<SocialsProps> = ({}) => {
  const socialList: SocialItem[] = [
    {
      id: 1,
      name: "LinkedIn",
      src:
        "https://res.cloudinary.com/reason-store/image/upload/v1601647666/linkedin_white_udrxxx.svg",
      description: "https://www.flaticon.com/authors/pixel-perfect",
      link: "https://www.linkedin.com/in/illia-korobov-450639170/",
    },
    {
      id: 2,
      name: "Facebook",
      src:
        "https://res.cloudinary.com/reason-store/image/upload/v1601647614/facebook_white_pym9es.svg",
      description: "https://www.flaticon.com/authors/freepik",
      link: "https://www.facebook.com/profile.php?id=100003452134570",
    },
    {
      id: 3,
      name: "Github",
      src:
        "https://res.cloudinary.com/reason-store/image/upload/v1601647614/github_white_waklbm.svg",
      description: "https://www.flaticon.com/authors/pixel-perfect",
      link: "https://github.com/OneGoodReas0n",
    },
  ];

  const Socials = (() => {
    return socialList.map((s) => {
      return (
        <Link href={s.link} ml={4} key={s.id}>
          <Image w="30px" h="30px" objectFit="cover" src={s.src} alt={s.name} />
        </Link>
      );
    });
  })();

  return (
    <Box>
      <Flex>{Socials}</Flex>
    </Box>
  );
};

export default Socials;
