import React from "react";
import { Flex, FormLabel, Select, Stack, Button, Box } from "@chakra-ui/core";
import { InputField } from "./InputField";
import { setIconList } from "../utils/setIconList";

export interface TechnologyFormTemplateProps {
  values: any;
  setFieldValue(
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ): void;
  setFieldTouched(
    field: string,
    isTouched?: boolean | undefined,
    shouldValidate?: boolean | undefined
  ): void;
  setModalOpen(value: boolean): void;
  isSubmitting: boolean;
  variant: "create" | "update";
}

const TechnologyFormTemplate: React.FC<TechnologyFormTemplateProps> = ({
  values,
  setFieldTouched,
  setFieldValue,
  isSubmitting,
  setModalOpen,
  variant,
}) => {
  setIconList("iconName");
  return (
    <Box>
      <Flex direction="column">
        <Box mt={4}>
          <InputField placeholder="Name" label="Name" name="name" />
        </Box>
        <Box mt={4}>
          <FormLabel htmlFor="categoryName">Category</FormLabel>
          <Select
            placeholder="Select category"
            name="categoryName"
            onChange={(e) => {
              setFieldValue("categoryName", e.target.value);
            }}
            onBlur={() => setFieldTouched("categoryName", true)}
            value={values.categoryName}
          >
            <option value="Backend">Backend</option>
            <option value="Frontend">Frontend</option>
            <option value="Database">Database</option>
            <option value="Testing">Testing</option>
            <option value="Other">Other</option>
          </Select>
        </Box>
        <Box mt={4}>
          <Stack spacing={10} direction="row">
            <InputField placeholder="Icon name" label="Icon" name="iconName" />
          </Stack>
        </Box>
      </Flex>
      <Flex mt={6} justifyContent="space-between">
        {variant === "create" ? (
          <Button
            colorScheme="pink"
            variant="solid"
            mr={3}
            onClick={() => {
              setModalOpen(false);
            }}
          >
            Back
          </Button>
        ) : (
          <Button
            colorScheme="pink"
            variant="solid"
            mr={3}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Delete
          </Button>
        )}

        <Button
          variant="solid"
          colorScheme="teal"
          type="submit"
          isLoading={isSubmitting}
        >
          Save
        </Button>
      </Flex>
    </Box>
  );
};

export default TechnologyFormTemplate;
