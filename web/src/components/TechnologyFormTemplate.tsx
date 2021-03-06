import { Box, Button, Flex, FormLabel, Select, Stack } from "@chakra-ui/core";
import React from "react";
import { IconColor } from "../utils/iconsMap";
import { mapCategoryNumByName, categoryNames } from "../utils/mapping";
import { InputField } from "./InputField";

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
  const getIconList = () => {
    const iconNames: string[] = [];
    for (let iconName in IconColor) {
      iconNames.push(iconName);
    }
    return iconNames;
  };

  const icons = getIconList();

  return (
    <Box>
      <Flex direction="column">
        <Box mt={4}>
          <InputField placeholder="Name" label="Name" name="name" />
        </Box>
        <Box mt={4}>
          <FormLabel htmlFor="category" fontWeight={600}>
            Category
          </FormLabel>
          <Select
            placeholder="Select category"
            name="category"
            onChange={(e) => {
              setFieldValue("category", e.target.value);
            }}
            onBlur={() => setFieldTouched("categoryName", true)}
            value={values.category}
          >
            {categoryNames.map((name) => (
              <option
                value={mapCategoryNumByName(name, categoryNames)}
                key={name}
              >
                {name}
              </option>
            ))}
          </Select>
        </Box>
        <Box mt={4}>
          <Stack spacing={10} direction="row">
            <InputField
              placeholder="Icon name"
              label="Icon"
              name="iconName"
              variant="datalist"
              items={icons}
              listName="technologies"
            />
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
