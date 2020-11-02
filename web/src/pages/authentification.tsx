import { Box, Button, Flex } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import Layout from "../components/Layout";
import { validateLogin, errorMap } from "../utils/validation";
import { withApollo } from "../utils/withApollo";
import {
  useLoginMutation,
  MeQuery,
  MeDocument,
  useMeQuery,
  useGetUsersQuery,
  useRegisterMutation,
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
  const [register] = useRegisterMutation();
  const { loading, data } = useMeQuery();
  const { loading: usersLoading, data: users } = useGetUsersQuery();
  const [action, setAction] = useState<"login" | "register">();
  if (loading || usersLoading) {
    return <LoadingSpinner />;
  } else if (!loading && data?.me) {
    router.push("/dashboard");
    return null;
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
            if (action === "login") {
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
            } else {
              const response = await register({
                variables: values,
                update: (cache, { data }) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: "Query",
                      me: data?.register.entity,
                    },
                  });
                },
              });
              if (response.data?.register.errors) {
                setErrors(errorMap(response.data.register.errors));
                return;
              }
              router.push("/dashboard");
            }
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
                {users?.getUsers?.length || [].length > 0 ? (
                  <Button
                    type="submit"
                    colorScheme="teal"
                    isLoading={isSubmitting}
                    onClick={() => {
                      setAction("login");
                    }}
                  >
                    Log in
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    colorScheme="teal"
                    isLoading={isSubmitting}
                    onClick={() => {
                      setAction("register");
                    }}
                  >
                    Register
                  </Button>
                )}
              </Flex>
            </Form>
          )}
        </Formik>
      </Layout>
    );
};

export default withApollo({ ssr: false })(Login);
