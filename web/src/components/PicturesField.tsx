import React, { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/core";
import PictureInput from "./PictureInput";
import { ExtendedFile } from "./PictureInput";

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
    return () => {
      setField("pictures", null);
    };
  }, [pictures]);

  return (
    <Box overflow={pictures?.length > 1 ? "scroll" : "auto"}>
      <Flex w="fit-content">
        {[...pictures, {} as ExtendedFile].map((e) => (
          <PictureInput
            key={index++}
            pictures={pictures}
            setPictures={setPictures}
            currentFile={e}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default React.memo(PicturesField);
