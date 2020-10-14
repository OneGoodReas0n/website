import { Flex, Input, Box, Image } from "@chakra-ui/core";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import React, { useState } from "react";

export interface PictureCardProps {
  setField: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  pictures: File[];
  setPictures(files: File[]): void;
  index: number;
}

const PictureCard: React.FC<PictureCardProps> = ({
  setField,
  pictures,
  setPictures,
  index,
}) => {
  const [file, setFile] = useState({} as File);
  const [picUrl, setPicUrl] = useState("");
  return (
    <Flex
      position="relative"
      border="3px dotted black"
      w="200px"
      h="100px"
      justifyContent="center"
      alignItems="center"
      mr={5}
    >
      <Input
        type="file"
        display="none"
        id={`picturesInput${index}`}
        onChange={(e) => {
          const { files } = e.target;
          const firstFile = files?.item(0);
          if (firstFile) {
            setFile(firstFile);
            const fr = new FileReader();
            fr.readAsDataURL(firstFile);
            fr.onloadend = function (event) {
              setPicUrl(event.target?.result as string);
            };
            setPictures([...pictures, firstFile]);
          }
        }}
      />
      {file.name && (
        <>
          <Image src={picUrl} h="100%" />
          <CloseIcon
            position="absolute"
            zIndex="5"
            right={2}
            top={2}
            fontSize="12px"
            cursor="pointer"
            onClick={() => {
              setFile({} as File);
              const input = document.getElementById(
                `picturesInput${index}`
              ) as HTMLInputElement;
              input.value = "";
              setPictures(
                pictures.slice(0, index).concat(pictures.slice(index + 1))
              );
            }}
          />
        </>
      )}
      {!file.name && (
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
            const input = document.getElementById(`picturesInput${index}`);
            input?.click();
          }}
        >
          <AddIcon />
        </Box>
      )}
    </Flex>
  );
};

export default PictureCard;
