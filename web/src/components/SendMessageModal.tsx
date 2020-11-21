import React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/core";
import SendMessageForm from "./SendMessageForm";
import { Fade, SlideFade } from "@chakra-ui/transition";

export interface SendMessageModalProps {
  isOpen: boolean;
  setOpen(state: boolean): void;
}

const SendMessageModal: React.FC<SendMessageModalProps> = ({
  isOpen,
  setOpen,
}) => {
  return (
    <Fade timeout={300} in={isOpen}>
      {(styles) => (
        <Modal
          size="md"
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
                  <ModalHeader textAlign="center">Send email</ModalHeader>
                  <ModalCloseButton onClick={() => setOpen(false)} />
                  <ModalBody p={4} px={8}>
                    <SendMessageForm setOpen={setOpen} />
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

export default SendMessageModal;
