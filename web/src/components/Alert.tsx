import React, { RefObject } from "react";
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
} from "@chakra-ui/core";
import {
  useDeleteTechnologyMutation,
  useDeleteProjectMutation,
} from "../generate/graphql";

export interface AlertProps {
  entityName: string;
  entityId: number;
  isAlertOpen: boolean;
  setAlertOpen(open: boolean): void;
  setUpdateModal(open: boolean): void;
}

const Alert: React.FC<AlertProps> = ({
  isAlertOpen,
  setAlertOpen,
  setUpdateModal,
  entityId,
  entityName,
}) => {
  const cancelRef = React.useRef() as RefObject<HTMLElement>;
  const [deleteTechnology] = useDeleteTechnologyMutation();
  const [deleteProject] = useDeleteProjectMutation();
  const toast = useToast();

  const callToast = (status: string) => {
    if (status === "success") {
      toast({
        title: `${entityName[0]
          .toUpperCase()
          .concat(entityName.slice(1))} has been deleted`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    toast({
      title: "Something went wrong",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    return;
  };

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isAlertOpen}
      onClose={() => {
        setAlertOpen(false);
      }}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete {entityName}
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              onClick={async () => {
                setAlertOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={async () => {
                if (entityName === "technology") {
                  const result = await deleteTechnology({
                    variables: {
                      id: entityId,
                    },
                    update: (cache) => {
                      cache.evict({ fieldName: "getTechnologies" });
                    },
                  });
                  if (result.data?.deleteTechnology) {
                    callToast("success");
                  } else {
                    callToast("error");
                  }
                } else if (entityName === "project") {
                  const result = await deleteProject({
                    variables: {
                      id: entityId,
                    },
                    update: (cache) => {
                      cache.evict({ fieldName: "getProjects" });
                    },
                  });
                  if (result.data?.deleteProject) {
                    callToast("success");
                  } else {
                    callToast("error");
                  }
                }
                setAlertOpen(false);
                setUpdateModal(false);
              }}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Alert;
