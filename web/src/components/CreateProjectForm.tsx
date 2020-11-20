import {
  Box,
  BoxProps,
  Button,
  Flex,
  FormLabel,
  Select,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  useToast,
} from "@chakra-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import {
  PictureObj,
  useCreateProjectMutation,
  useGetTechnologiesQuery,
} from "../generate/graphql";
import { cutElementFromArr } from "../utils/cutElementFromArr";
import { uploadImages } from "../utils/uploadImages";
import { errorMap } from "../utils/validation";
import { InputField } from "./InputField";
import LoadingSpinner from "./LoadingSpinner";
import { ExtendedFile } from "./PictureInput";
import PicturesField from "./PicturesField";

export interface CreateProjectFormProps extends BoxProps {
  setOpen(open: boolean): void;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({
  setOpen,
  ...options
}) => {
  const toast = useToast();
  const {
    data: technologies,
    loading: technologiesLoading,
  } = useGetTechnologiesQuery();
  const [createProject] = useCreateProjectMutation();

  if (technologiesLoading) {
    return <LoadingSpinner />;
  } else {
    let techsToChoose: string[] =
      technologies?.getTechnologies.map((tech) => tech.name) || [];
    let addedTechs: string[] = [];
    return (
      <Box {...options}>
        <Formik
          initialValues={{
            name: "",
            description: "",
            status: "",
            technologyName: "",
            technologies: [] as string[],
            pictures: [] as ExtendedFile[],
            linkDemo: "",
            linkSourceCode: "",
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
                  link: {
                    demo: values.linkDemo,
                    source_code: values.linkSourceCode,
                  },
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
              console.log(result.data?.createProject.errors);
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
                    <InputField
                      placeholder="Your project name"
                      label="Name"
                      name="name"
                    />
                  </Box>
                  <Box mt={4}>
                    <FormLabel fontWeight={600}>Pictures</FormLabel>

                    <PicturesField setField={setFieldValue} />
                  </Box>
                  <Box mt={4}>
                    <FormLabel htmlFor="status">Status</FormLabel>
                    <Select
                      placeholder="Select status from the list"
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
                      items={techsToChoose}
                      listName="technologies"
                      variant="datalist"
                      onKeyUp={() => {
                        setFieldValue("technologyName", values.technologyName);
                        setFieldTouched("technologyName", true);
                        console.log(values.technologyName);
                        if (values.technologyName) {
                          setFieldTouched("technologyName", true);
                          if (techsToChoose.includes(values.technologyName)) {
                            techsToChoose = cutElementFromArr(
                              techsToChoose,
                              values.technologyName
                            );
                            addedTechs = [...addedTechs, values.technologyName];
                            setFieldValue("technologies", addedTechs);
                            setFieldValue("technologyName", "");
                          }
                        }
                      }}
                    />

                    <Box mt={4}>
                      {addedTechs.map((tech, index) => (
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
                              const elem = addedTechs[index];
                              if (elem) {
                                addedTechs = cutElementFromArr(
                                  addedTechs,
                                  index
                                );
                                techsToChoose = [...techsToChoose, elem];
                              }
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
                  <Box mt={4} mb={8}>
                    <FormLabel fontWeight={600}>Links</FormLabel>
                    <Stack spacing={2} direction="row" justifyContent="center">
                      <InputField
                        placeholder="Demo link..."
                        name="linkDemo"
                        variant="input"
                        value={values.linkDemo}
                      />
                      <InputField
                        placeholder="Source code link..."
                        name="linkSourceCode"
                        variant="input"
                        value={values.linkSourceCode}
                      />
                    </Stack>
                  </Box>
                </Flex>
                <Flex justifyContent="space-between">
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
  }
};

export default CreateProjectForm;
