import { Box, BoxProps, useToast } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { useCreateTechnologyMutation } from "../generate/graphql";
import { errorMap } from "../utils/validation";
import { withApollo } from "../utils/withApollo";
import TechnologyFormTemplate from "./TechnologyFormTemplate";

export interface CreateTechnologyFormProps extends BoxProps {
  setOpen(open: boolean): void;
}

const CreateTechnologyForm: React.FC<CreateTechnologyFormProps> = ({
  setOpen,
  ...options
}) => {
  const [createTechnology] = useCreateTechnologyMutation();
  const toast = useToast();

  return (
    <Box {...options}>
      <Formik
        enableReinitialize={false}
        initialValues={{
          name: "" as string,
          category: -1 as number,
          iconName: "" as string,
        }}
        onSubmit={async (values, { setErrors }) => {
          const result = await createTechnology({
            variables: {
              input: {
                name: values.name,
                iconName: values.iconName,
                category: Number(values.category),
              },
            },
            update: (cache) => {
              cache.evict({ fieldName: "getTechnologies" });
            },
          });
          if (!result.data?.createTechnology?.errors) {
            setOpen(false);
            toast({
              title: "Technology has been created",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
            return;
          }
          setErrors(errorMap(result.data?.createTechnology?.errors));
        }}
      >
        {({ isSubmitting, setFieldValue, setFieldTouched, values }) => (
          <Form>
            <TechnologyFormTemplate
              isSubmitting={isSubmitting}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              values={values}
              setModalOpen={setOpen}
              variant="create"
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default withApollo({ ssr: false })(CreateTechnologyForm);
