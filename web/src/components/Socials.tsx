import React from "react";
import { Stack, Image, Link, Flex } from "@chakra-ui/core";

export interface SocialsProps {
  variant?: "normal" | "wide";
}

type SocialItem = {
  id: number;
  name: string;
  src: string;
  description?: string;
  link: string;
};

const Socials: React.FC<SocialsProps> = ({ variant }) => {
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
        <Link href={s.link} key={s.id}>
          <Image
            w={{ base: "24px", md: "30px" }}
            h={{ base: "24px", md: "30px" }}
            objectFit="cover"
            src={s.src}
            alt={s.name}
          />
        </Link>
      );
    });
  })();

  return (
    <Flex justifyContent={variant === "wide" ? "center" : ""}>
      <Stack spacing={variant === "wide" ? 8 : 4} direction="row">
        {Socials}
      </Stack>
    </Flex>
  );
};

export default Socials;
