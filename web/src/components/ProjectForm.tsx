import {
  Box,
  BoxProps,
  Flex,
  FormLabel,
  Select,
  Button,
} from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useGetProjectsQuery } from "../generate/graphql";
import React, { useRef } from "react";
import { InputField } from "./InputField";
import { useRouter } from "next/router";

export interface ProjectFormProps extends BoxProps {
  setOpen(open: boolean): void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ setOpen, ...options }) => {
  const { data, loading } = useGetProjectsQuery();
  const router = useRouter();
  (() => {
    const testData = [
      "England",
      "Spain",
      "Germany",
      "USA",
      "Austria",
      "Ukraine",
      "Russia",
    ];
    const input = document.getElementById("technologyNames");
    const datalist = document.createElement("datalist");
    input?.setAttribute("list", "technologyList");
    datalist.id = "technologyList";
    testData.forEach((el) => {
      const option: HTMLOptionElement = document.createElement("option");
      option.value = el;
      option.innerText = el;
      datalist.appendChild(option);
    });
    input?.appendChild(datalist);
  })();

  return (
    <Box {...options}>
      <Formik
        initialValues={{
          name: "",
          description: "",
          status: "",
          technologyNames: [],
          pictures: [],
        }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values.technologyNames);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <Flex direction="column">
                <Box mt={4}>
                  <InputField placeholder="Name" label="Name" name="name" />
                </Box>
                <Box mt={4}>
                  <FormLabel htmlFor="status">Status</FormLabel>
                  <Select placeholder="Select status" name="status">
                    <option value={0}>In develop</option>
                    <option value={1}>Completed</option>
                    <option value={2}>Planned</option>
                  </Select>
                </Box>
                <Box mt={4}>
                  <InputField
                    placeholder="Choose technologies"
                    label="Technologies"
                    name="technologyNames"
                  />
                </Box>
                <Box mt={4}>
                  <InputField
                    placeholder="Write here something about your project..."
                    label="Description"
                    name="description"
                    variant="textarea"
                  />
                </Box>
              </Flex>
              <Flex>
                <Button
                  colorScheme="pink"
                  variant="solid"
                  mr={3}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Back
                </Button>
                <Button variant="solid" colorScheme="teal" type="submit">
                  Save
                </Button>
              </Flex>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ProjectForm;
