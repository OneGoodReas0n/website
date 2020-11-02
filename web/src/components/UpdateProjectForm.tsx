import {
  Box,
  Button,
  Flex,
  FormLabel,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  useToast,
} from "@chakra-ui/core";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import {
  PictureObj,
  useGetProjectQuery,
  useGetTechnologiesQuery,
  useUpdateProjectMutation,
} from "../generate/graphql";
import { cutElementFromArr } from "../utils/cutElementFromArr";
import { errorMap } from "../utils/validation";
import { InputField } from "./InputField";
import LoadingSpinner from "./LoadingSpinner";
import PicturesField from "./PicturesField";
import { makePictureObjects } from "../utils/makePicturesObjects";

export interface ExtendedFile extends File {
  id: number;
  url?: string;
  primary?: boolean;
}

export interface UpdateProjectFormProps {
  setOpen(value: boolean): void;
  projectId: number;
}

const UpdateProjectForm: React.FC<UpdateProjectFormProps> = ({
  setOpen,
  projectId,
  ...options
}) => {
  const toast = useToast();
  const { data: technologies } = useGetTechnologiesQuery();
  const [updateProject] = useUpdateProjectMutation();
  const { data: projectData, loading: projectLoading } = useGetProjectQuery({
    variables: { id: projectId },
  });
  const [initValues, setInitValues] = useState({
    name: "",
    description: "" as string,
    status: 0,
    technologyName: "",
    technologies: [] as string[],
    pictures: [] as ExtendedFile[],
    pictureUrls: [] as string[],
  });

  let addedTechnologies: string[] = [];
  let techNames: string[] = [];

  const createPictureFiles = async () => {
    const actions: Promise<File>[] =
      initValues.pictureUrls.map((url, index) => {
        return new Promise(async (resolve) => {
          const result = await fetch(url);
          const blob = await result.blob();
          const file = new File([blob], `picture${index}`);
          resolve(file);
        });
      }) || [];
    const files = await Promise.all(actions);
    const extendedFiles: ExtendedFile[] = files.map((file, index) => {
      return { ...file, id: index, url: initValues.pictureUrls[index] };
    });
    setInitValues((prev) => ({
      ...prev,
      pictures: extendedFiles,
    }));
  };

  if (projectLoading) {
    return <LoadingSpinner />;
  } else if (!projectLoading && projectData) {
    initValues.pictureUrls =
      projectData.getProject?.pictures?.map((pic) => pic.url) || [];
    if (addedTechnologies.length === 0) {
      addedTechnologies =
        projectData?.getProject?.technologies?.map((t) => t.name) || [];
      techNames =
        technologies?.getTechnologies
          .filter((tech) => !addedTechnologies.includes(tech.name))
          .map((tech) => tech.name) || [];
    }

    initValues.name = projectData.getProject?.name || "";
    initValues.description = projectData.getProject?.description || "";
    initValues.status = projectData.getProject?.status || 0;
    initValues.technologies =
      projectData.getProject?.technologies?.map((tech) => tech.name) || [];
    createPictureFiles();
  }

  return (
    <Box {...options}>
      <Formik
        initialValues={initValues}
        onSubmit={async (values, { setErrors }) => {
          const pictures: PictureObj[] = await makePictureObjects(
            values.pictures
          );
          const result = await updateProject({
            variables: {
              input: {
                name: values.name || "",
                status:
                  values.status === 1
                    ? "In develop"
                    : values.status === 2
                    ? "Complete"
                    : "Planned",
                description: values.description || "",
                pictures,
                technologyNames: values.technologies,
              },
              id: projectId,
            },
          });
          if (result.data?.updateProject.entity) {
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
          if (result.data?.updateProject.errors) {
            setErrors(errorMap(result.data?.updateProject.errors));
            return;
          }
        }}
        enableReinitialize={true}
      >
        {({ isSubmitting, setFieldTouched, values, setFieldValue }) => (
          <Form>
            <Box>
              <Flex direction="column">
                <Box mt={4}>
                  <InputField placeholder="Name" label="Name" name="name" />
                </Box>
                <Box mt={4}>
                  <FormLabel>Pictures {values.pictures.length}</FormLabel>
                  <PicturesField
                    setField={setFieldValue}
                    existedPictures={values.pictures}
                  />
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
                    value={values.description || ""}
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

export default UpdateProjectForm;
