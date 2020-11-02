import { Box, Heading, Link, Stack } from "@chakra-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import SectionSnippet from "../components/SectionSnippet";
import { useMeQuery } from "../generate/graphql";
import { withApollo } from "../utils/withApollo";
import LoadingSpinner from "../components/LoadingSpinner";

export interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}) => {
  const router = useRouter();
  const { data, loading } = useMeQuery();
  if (loading) {
    return <LoadingSpinner />;
  }

  if (data && !loading) {
    if (data.me) {
      return (
        <Box>
          <Navbar email={data.me?.email || ""} />
          <Heading textAlign="center" mt={6}>
            Dashboard
          </Heading>
          <Layout size="middle">
            <Stack isInline spacing={8} align="center" mt={12}>
              <NextLink href="/technologies">
                <Link>
                  <SectionSnippet
                    title="Technologies"
                    desc="This is a section for creating, updating and deleting technology entities"
                  />
                </Link>
              </NextLink>
              <NextLink href="/projects">
                <Link>
                  <SectionSnippet
                    title="Projects"
                    desc="This is a section for creating, updating and deleting project entities"
                  />
                </Link>
              </NextLink>
            </Stack>
          </Layout>
        </Box>
      );
    }
  }
  router.push("/authentification");
  return null;
};

export default withApollo({ ssr: false })(Dashboard);
