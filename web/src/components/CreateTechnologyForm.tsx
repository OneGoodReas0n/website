import { Box, BoxProps, useToast } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useCreateTechnologyMutation } from "../generate/graphql";
import { categoryColor, IconColor } from "../utils/iconsMap";
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
          name: "",
          categoryName: "",
          categoryColor: "",
          iconName: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          values.categoryColor = categoryColor(
            String(values.categoryName).toLowerCase()
          );
          const result = await createTechnology({
            variables: {
              input: {
                name: values.name,
                icon: values.iconName,
                category: {
                  name: values.categoryName,
                  color: values.categoryColor,
                },
              },
            },
            update: (cache) => {
              console.log("Cache: ", cache);
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
