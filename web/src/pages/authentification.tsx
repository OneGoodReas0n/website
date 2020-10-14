import { Box, Button, Flex } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import Layout from "../components/Layout";
import { validateLogin, errorMap } from "../utils/validation";
import { withApollo } from "../utils/withApollo";
import {
  useLoginMutation,
  MeQuery,
  MeDocument,
  useMeQuery,
} from "../generate/graphql";
import LoadingSpinner from "../components/LoadingSpinner";

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginError {
  field: string;
  message: string;
}

const Login: React.FC = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();
  const { loading, data } = useMeQuery();
  if (loading) {
    return <LoadingSpinner />;
  } else if (!loading && data?.me) {
    router.push("/dashboard");
    return <Box></Box>;
  } else
    return (
      <Layout size="small" mt={20}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const errors = validateLogin(values);
            if (errors.length > 0) {
              setErrors(errorMap(errors));
              return;
            }
            const response = await login({
              variables: values,
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: "Query",
                    me: data?.login.entity,
                  },
                });
              },
            });
            if (response.data?.login.errors) {
              setErrors(errorMap(response.data.login.errors));
              return;
            }
            router.push("/dashboard");
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box>
                <InputField placeholder="Email" label="Email" name="email" />
              </Box>
              <Box mt={4}>
                <InputField
                  placeholder="Password"
                  label="Password"
                  name="password"
                  type="password"
                />
              </Box>
              <Flex mt={8} justifyContent="space-between">
                <Button type="button" onClick={() => router.back()}>
                  Back
                </Button>
                <Button
                  type="submit"
                  colorScheme="teal"
                  isLoading={isSubmitting}
                >
                  Log in
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Layout>
    );
};

export default withApollo({ ssr: false })(Login);
