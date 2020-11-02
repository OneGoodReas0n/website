import React, { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/core";
import PictureInput from "./PictureInput";
import { ExtendedFile } from "./UpdateProjectForm";

export interface PicturesFieldProps {
  setField: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  existedPictures?: ExtendedFile[];
}

const PicturesField: React.FC<PicturesFieldProps> = ({
  setField,
  existedPictures,
}) => {
  const [pictures, setPictures] = useState<ExtendedFile[]>(
    existedPictures || []
  );
  let index = 0;

  useEffect(() => {
    if (pictures.length === 0 && existedPictures) {
      setPictures(existedPictures);
    }
  }, [existedPictures]);

  useEffect(() => {
    setField("pictures", pictures);
    console.log("PicturesField Pics: ", pictures);
  }, [pictures]);

  return (
    <Box overflow={pictures?.length > 1 ? "scroll" : "auto"}>
      <Flex w="fit-content">
        {pictures.length > 0 &&
          pictures.map((e) => (
            <PictureInput
              key={index++}
              pictures={pictures}
              setPictures={setPictures}
              currentFile={e}
            />
          ))}
        <PictureInput
          setPictures={setPictures}
          pictures={pictures}
          key={index}
        />
      </Flex>
    </Box>
  );
};

export default React.memo(PicturesField);
