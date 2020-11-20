import { Flex, Input, Box, Image, BoxProps } from "@chakra-ui/core";
import { CloseIcon, PlusSquareIcon, CheckIcon } from "@chakra-ui/icons";
import React, { useState, RefObject } from "react";

export interface ExtendedFile extends File {
  id: number;
  blob?: string;
  url?: string;
  primary?: number;
}

export interface PictureInputProps extends BoxProps {
  pictures: ExtendedFile[];
  setPictures(files: ExtendedFile[]): void;
  currentFile?: ExtendedFile;
}

const PictureInput: React.FC<PictureInputProps> = ({
  pictures,
  setPictures,
  currentFile,
  ...props
}) => {
  const [file, setFile] = useState<ExtendedFile>(
    currentFile || ({} as ExtendedFile)
  );
  const inputRef = React.useRef() as RefObject<HTMLInputElement>;

  return (
    <Flex
      position="relative"
      border={!currentFile?.blob ? "3px solid #bbb" : ""}
      w="200px"
      h="100px"
      justifyContent="center"
      alignItems="center"
      mr={5}
      {...props}
    >
      <Input
        type="file"
        display="none"
        id={`picturesInput`}
        ref={inputRef}
        onChange={(e) => {
          const { files } = e.target;
          const firstFile: File | undefined | null = files?.item(0);
          if (firstFile) {
            let blob = "";
            const fr = new FileReader();
            fr.readAsDataURL(firstFile);
            fr.onloadend = function (event) {
              blob = event.target?.result as string;
              const extendedFile: ExtendedFile = {
                ...firstFile,
                id: Math.floor(Math.random() * Math.floor(100)) + 10,
                blob,
                url: blob,
              };
              setFile(extendedFile);
              setPictures([...pictures, extendedFile]);
            };
          }
        }}
      />
      <>
        {currentFile?.url && (
          <Image
            src={currentFile?.url}
            h="100%"
            onClick={() => {
              const updatePictures = Object.assign(
                [] as ExtendedFile[],
                pictures
              );
              updatePictures.forEach((element) => {
                if (element.id !== currentFile?.id) {
                  element.primary = 0;
                } else {
                  element.primary = 1;
                }
              });
              setPictures(updatePictures);
            }}
          />
        )}
        {currentFile?.url && (
          <>
            {currentFile.primary && (
              <Flex
                justifyContent="center"
                alignItems="center"
                position="absolute"
                w="100%"
                h="100%"
                zIndex={2}
                bg="rgba(0,0,0,0.3)"
              >
                <CheckIcon fontSize={40} color="white" />
              </Flex>
            )}
            <Flex
              justifyContent="center"
              alignItems="center"
              position="absolute"
              zIndex="5"
              right={2}
              top={2}
              bg="#aaa"
              p={1}
              borderRadius="3px"
              cursor="pointer"
              onClick={() => {
                setFile({} as ExtendedFile);
                const input = document.getElementById(
                  `picturesInput`
                ) as HTMLInputElement;
                input.value = "";
                const indexOfPicture = pictures.findIndex(
                  (pic) => pic.id === currentFile?.id
                );
                if (indexOfPicture !== -1) {
                  setPictures(
                    pictures
                      .slice(0, indexOfPicture)
                      .concat(pictures.slice(indexOfPicture + 1))
                  );
                }
              }}
            >
              <CloseIcon fontSize="10px" />
            </Flex>
          </>
        )}
      </>
      {!file?.name && !currentFile?.url && (
        <Box
          w="100%"
          h="100%"
          as="button"
          type="button"
          zIndex="1"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%,-50%);"
          onClick={() => {
            inputRef.current.click();
          }}
        >
          <PlusSquareIcon color="#bbb" fontSize={32} />
        </Box>
      )}
    </Flex>
  );
};

export default PictureInput;
