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
  Stack,
} from "@chakra-ui/core";
import { Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
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
import { ExtendedFile } from "./PictureInput";
import { mapStatusNumByName, mapStatusByNum } from "../utils/mapping";
import Alert from "./Alert";

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
  const [isAlertOpen, setAlertOpen] = useState(false);
  const {
    data: technologies,
    loading: technologiesLoading,
  } = useGetTechnologiesQuery();
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
    linkSourceCode: "" as string,
    linkDemo: "" as string,
  });
  const [addedTechnologies, setAddedTechnologies] = useState<string[]>([]);
  const [restTechNames, setRestTechNames] = useState<string[]>([]);

  useEffect(() => {
    const initialize = async () => {
      const values = Object.assign({}, initValues);
      values.pictureUrls =
        projectData?.getProject?.pictures?.map((pic) => pic.url) || [];
      if (addedTechnologies.length === 0) {
        setAddedTechnologies(
          projectData?.getProject?.technologies?.map((t) => t.name) || []
        );
        setRestTechNames(
          technologies?.getTechnologies
            .filter((tech) => !addedTechnologies.includes(tech.name))
            .map((tech) => tech.name) || []
        );
      }
      values.name = projectData?.getProject?.name || "";
      values.description = projectData?.getProject?.description || "";
      values.status = projectData?.getProject?.status || 0;
      values.technologies =
        projectData?.getProject?.technologies?.map((tech) => tech.name) || [];
      values.linkDemo = projectData?.getProject?.link.demo || "";
      values.linkSourceCode = projectData?.getProject?.link.source_code || "";
      const actions: Promise<File>[] =
        values.pictureUrls.map((url, index) => {
          return new Promise(async (resolve) => {
            const result = await fetch(url);
            const blob = await result.blob();
            const file = new File([blob], `picture${index}`);
            resolve(file);
          });
        }) || [];
      const files = await Promise.all(actions);
      const extendedFiles: ExtendedFile[] = files.map((file, index) => {
        return { ...file, id: index, url: values.pictureUrls[index] };
      });
      values.pictures = extendedFiles;
      setInitValues(values);
    };
    if (!projectLoading && projectData) {
      initialize();
    }
  }, [projectLoading]);

  if (projectLoading || technologiesLoading) {
    return <LoadingSpinner />;
  } else if (!projectLoading && !projectData) {
    return <Box>Something went wrong with data</Box>;
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
                status: mapStatusByNum(values.status) || "",
                description: values.description || "",
                pictures,
                technologyNames: values.technologies,
                link: {
                  demo: values.linkDemo,
                  source_code: values.linkSourceCode,
                },
              },
              id: projectId,
            },
          });
          if (result.data?.updateProject.entity) {
            setOpen(false);
            toast({
              title: "Project has been updated",
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
                  <FormLabel fontWeight={600}>
                    Pictures {values.pictures.length}
                  </FormLabel>
                  <PicturesField
                    setField={setFieldValue}
                    existedPictures={values.pictures}
                  />
                </Box>
                <Box mt={4}>
                  <FormLabel htmlFor="status" fontWeight={600}>
                    Status
                  </FormLabel>
                  <Select
                    placeholder="Select status"
                    name="status"
                    value={values.status}
                    onChange={(e) => {
                      setFieldValue("status", e.target.value);
                    }}
                  >
                    <option value={mapStatusNumByName("In develop")!}>
                      In develop
                    </option>
                    <option value={mapStatusNumByName("Completed")!}>
                      Completed
                    </option>
                    <option value={mapStatusNumByName("Planned")!}>
                      Planned
                    </option>
                  </Select>
                </Box>
                <Box mt={4}>
                  <InputField
                    placeholder="Choose technologies"
                    label="Technologies"
                    name="technologyName"
                    variant="datalist"
                    listName="Added technologies"
                    items={restTechNames}
                    onKeyUp={() => {
                      setFieldValue("technologyName", values.technologyName);
                      setFieldTouched("technologyName", true);
                      if (values.technologyName) {
                        setFieldTouched("technologyName", true);
                        if (restTechNames.includes(values.technologyName)) {
                          setRestTechNames(
                            cutElementFromArr(
                              restTechNames,
                              values.technologyName
                            )
                          );
                          setAddedTechnologies([
                            ...addedTechnologies,
                            values.technologyName,
                          ]);
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
                            setAddedTechnologies(
                              cutElementFromArr(addedTechnologies, index)
                            );
                            setRestTechNames([...restTechNames, elem]);
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
                    setAlertOpen(true);
                  }}
                >
                  Delete
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
      <Alert
        isAlertOpen={isAlertOpen}
        setAlertOpen={setAlertOpen}
        entityId={projectId}
        setUpdateModal={setOpen}
        entityName="project"
      />
    </Box>
  );
};

export default UpdateProjectForm;
