import {
  Fade,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Image,
} from "@chakra-ui/core";
import { SlideFade } from "@chakra-ui/transition";
import React from "react";

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
    <Fade timeout={300} in={isOpen}>
      {(styles) => (
        <Modal
          id="bigPhotoModal"
          size="full"
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
                  <ModalCloseButton onClick={() => setOpen(false)} />
                  <ModalBody>
                    <Image src={url} borderRadius={8} />
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

export default BigPhotoModal;
