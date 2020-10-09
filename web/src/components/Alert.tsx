import React from "react";
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
import { useDeleteTechnologyMutation } from "../generate/graphql";

export interface AlertProps {
  entityId: number;
  isOpen: boolean;
  setOpen(open: boolean): void;
  setUpdateModal(open: boolean): void;
}

const Alert: React.FC<AlertProps> = ({
  isOpen,
  setOpen,
  setUpdateModal,
  entityId,
}) => {
  const cancelRef = React.useRef();
  const [deleteTechnology] = useDeleteTechnologyMutation();
  const toast = useToast();

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={() => {
        setOpen(false);
      }}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Technology
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={async () => {
                const result = await deleteTechnology({
                  variables: { id: entityId },
                  update: (cache) => {
                    cache.evict({ fieldName: "getTechnologies" });
                  },
                });
                if (!result.data?.deleteTechnology) {
                  toast({
                    title: "Error while deleting technology",
                    description: "Something went wrong see server logs",
                    status: "error",
                    duration: 3000,
                    position: "top",
                    isClosable: true,
                  });
                  return;
                }
                toast({
                  title: "Technology has been deleted",
                  status: "success",
                  duration: 3000,
                  position: "top",
                  isClosable: true,
                });
                setOpen(false);
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
