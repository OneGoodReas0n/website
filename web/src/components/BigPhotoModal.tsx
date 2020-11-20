import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Image,
} from "@chakra-ui/core";

export interface BigPhotoModalProps {
  url: string;
  isOpen: boolean;
  setOpen(state: boolean): void;
}

const BigPhotoModal: React.FC<BigPhotoModalProps> = ({
  isOpen,
  setOpen,
  url,
}) => {
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Image src={url} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BigPhotoModal;
