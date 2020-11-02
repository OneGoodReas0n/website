import {
  Fade,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/core";
import { SlideFade } from "@chakra-ui/transition";
import React from "react";
import CreateProjectForm from "./CreateProjectForm";
import CreateTechnologyForm from "./CreateTechnologyForm";
import UpdateTechnologyForm from "./UpdateTechnologyForm";
import UpdateProjectForm from "./UpdateProjectForm";

export interface ModalFormProps {
  variant: "project" | "technology";
  action: "create" | "update";
  isOpen: boolean;
  setOpen(state: boolean): void;
  entityId?: number;
  projectId?: number;
}

const ModalForm: React.FC<ModalFormProps> = ({
  isOpen,
  setOpen,
  variant,
  action,
  entityId,
  projectId,
}) => {
  return (
    <Fade timeout={300} in={isOpen}>
      {(styles) => (
        <Modal
          size={variant === "technology" ? "md" : "xl"}
          onClose={() => {
            setOpen(false);
          }}
          isOpen={true}
          isCentered
        >
          <ModalOverlay style={styles}>
            <SlideFade timeout={150} in={isOpen} unmountOnExit={false}>
              {(styles) => (
                <ModalContent style={styles}>
                  <ModalHeader>{`${action
                    .slice(0, 1)
                    .toUpperCase()
                    .concat(action.slice(1))} ${variant
                    .slice(0, 1)
                    .toUpperCase()
                    .concat(variant.slice(1))}`}</ModalHeader>
                  <ModalCloseButton onClick={() => setOpen(false)} />
                  <ModalBody pb={8}>
                    {variant === "project" ? (
                      action === "create" ? (
                        <CreateProjectForm setOpen={setOpen} />
                      ) : (
                        <UpdateProjectForm
                          setOpen={setOpen}
                          projectId={projectId || -1}
                        />
                      )
                    ) : action === "create" ? (
                      <CreateTechnologyForm setOpen={setOpen} />
                    ) : (
                      <UpdateTechnologyForm
                        setOpen={setOpen}
                        entityId={entityId}
                      />
                    )}
                  </ModalBody>
                </ModalContent>
              )}
            </SlideFade>
          </ModalOverlay>
        </Modal>
      )}
    </Fade>
  );
};

export default ModalForm;
