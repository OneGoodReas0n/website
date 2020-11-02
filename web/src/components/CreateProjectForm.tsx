import {
  Box,
  BoxProps,
  Button,
  Flex,
  FormLabel,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useToast,
} from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import {
  PictureObj,
  useCreateProjectMutation,
  useGetProjectsQuery,
  useGetTechnologiesQuery,
} from "../generate/graphql";
import { cutElementFromArr } from "../utils/cutElementFromArr";
import { errorMap } from "../utils/validation";
import { InputField } from "./InputField";
import LoadingSpinner from "./LoadingSpinner";
import PicturesField from "./PicturesField";
import { uploadImages } from "../utils/uploadImages";

export interface CreateProjectFormProps extends BoxProps {
  setOpen(open: boolean): void;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({
  setOpen,
  ...options
}) => {
  const toast = useToast();
  const { data, loading } = useGetProjectsQuery();
  const {
    data: technologies,
    loading: technologiesLoading,
  } = useGetTechnologiesQuery();
  const router = useRouter();
  const [createProject] = useCreateProjectMutation();

  if (loading) {
    return <LoadingSpinner />;
  } else if (!loading && !data) {
    return (
      <Box>
        <Text>Something went wrong with your data</Text>
      </Box>
    );
  }
  let addedTechnologies: string[] = [];
  let techNames: string[] = [];
  if (technologies?.getTechnologies) {
    techNames = technologies?.getTechnologies.map((tech) => tech.name);
  }
  return (
    <Box {...options}>
      <Formik
        initialValues={{
          name: "",
          description: "",
          status: "",
          technologyName: "",
          technologies: [] as string[],
          pictures: [] as File[],
        }}
        onSubmit={async (values, { setErrors }) => {
          const pictures: PictureObj[] = await uploadImages(values.pictures);
          const result = await createProject({
            variables: {
              input: {
                name: values.name,
                status: values.status,
                description: values.description,
                pictures,
                technologyNames: values.technologies,
              },
            },
          });
          if (result.data?.createProject.entity) {
            setOpen(false);
            toast({
              title: "Project has been created",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
            return;
          }
          if (result.data?.createProject.errors) {
            setErrors(errorMap(result.data?.createProject.errors));
            return;
          }
        }}
      >
        {({ isSubmitting, setFieldTouched, values, setFieldValue }) => (
          <Form>
            <Box>
              <Flex direction="column">
                <Box mt={4}>
                  <InputField placeholder="Name" label="Name" name="name" />
                </Box>
                <Box mt={4}>
                  <PicturesField setField={setFieldValue} />
                </Box>
                <Box mt={4}>
                  <FormLabel htmlFor="status">Status</FormLabel>
                  <Select
                    placeholder="Select status"
                    name="status"
                    value={values.status}
                    onChange={(e) => {
                      setFieldValue("status", e.target.value);
                    }}
                  >
                    <option value={"In develop"}>In develop</option>
                    <option value={"Completed"}>Completed</option>
                    <option value={"Planned"}>Planned</option>
                  </Select>
                </Box>
                <Box mt={4}>
                  <InputField
                    placeholder="Choose technologies"
                    label="Technologies"
                    name="technologyName"
                    onKeyUp={() => {
                      setFieldValue("technologyName", values.technologyName);
                      setFieldTouched("technologyName", true);
                      if (values.technologyName) {
                        setFieldTouched("technologyName", true);
                        if (techNames.includes(values.technologyName)) {
                          techNames = cutElementFromArr(
                            techNames,
                            values.technologyName
                          );

                          addedTechnologies.push(values.technologyName);
                          setFieldValue("technologies", addedTechnologies);
                          setFieldValue("technologyName", "");
                        }
                      }
                    }}
                  />
                  <Box mt={4}>
                    {addedTechnologies.map((tech, index) => (
                      <Tag
                        key={index}
                        p={2}
                        size="md"
                        borderRadius="10px"
                        variant="solid"
                        colorScheme="green"
                        mr={2}
                        mb={2}
                      >
                        <TagLabel>{tech}</TagLabel>
                        <TagCloseButton
                          name="closeBtn"
                          onClick={() => {
                            const elem = addedTechnologies[index];
                            addedTechnologies = cutElementFromArr(
                              addedTechnologies,
                              index
                            );
                            techNames.push(elem);

                            setFieldTouched("closeBtn", true);
                          }}
                        />
                      </Tag>
                    ))}
                  </Box>
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
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateProjectForm;
