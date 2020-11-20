import { Box, BoxProps, Flex, Skeleton, Text, useToast } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import {
  useGetTechnologyQuery,
  useUpdateTechnologyMutation,
} from "../generate/graphql";
import { errorMap } from "../utils/validation";
import { withApollo } from "../utils/withApollo";
import Alert from "./Alert";
import TechnologyFormTemplate from "./TechnologyFormTemplate";

export interface UpdateTechnologyFormProps extends BoxProps {
  setOpen(open: boolean): void;
  entityId: number;
}

const UpdateTechnologyForm: React.FC<UpdateTechnologyFormProps> = ({
  entityId,
  setOpen,
  ...options
}) => {
  const { data, loading } = useGetTechnologyQuery({
    variables: { id: entityId },
  });
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [updateTechnology] = useUpdateTechnologyMutation();
  const toast = useToast();

  if (loading) {
    return (
      <Box>
        <Flex direction="column">
          <Skeleton height="24px" />
          <Skeleton height="24px" />
          <Skeleton height="24px" />
        </Flex>
        <Flex mt={6} justifyContent="space-between">
          <Skeleton height="24px" />
          <Skeleton height="24px" />
        </Flex>
      </Box>
    );
  } else if (!loading && !data) {
    return <Text>Something went wrong with data</Text>;
  } else
    return (
      <Box {...options}>
        <Formik
          enableReinitialize={false}
          initialValues={{
            name: data?.getTechnology?.name,
            category: data?.getTechnology?.category,
            iconName: data?.getTechnology?.iconName,
          }}
          onSubmit={async (values, { setErrors }) => {
            const result = await updateTechnology({
              variables: {
                input: {
                  name: values.name || "",
                  iconName: values.iconName || "",
                  category: Number(values.category),
                },
                id: entityId,
              },
              update: (cache) => {
                cache.evict({ fieldName: "getTechnologies" });
              },
            });
            if (!result.data?.updateTechnology?.errors) {
              setOpen(false);
              toast({
                title: "Technology has been updated",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
              });
              return;
            }
            setErrors(errorMap(result.data?.updateTechnology?.errors));
          }}
        >
          {({ isSubmitting, setFieldValue, setFieldTouched, values }) => (
            <Form>
              <TechnologyFormTemplate
                isSubmitting={isSubmitting}
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                values={values}
                setModalOpen={setAlertOpen}
                variant="update"
              />
            </Form>
          )}
        </Formik>
        <Alert
          isAlertOpen={isAlertOpen}
          setAlertOpen={setAlertOpen}
          entityId={entityId}
          setUpdateModal={setOpen}
          entityName="technology"
        />
      </Box>
    );
};

export default withApollo({ ssr: false })(UpdateTechnologyForm);
