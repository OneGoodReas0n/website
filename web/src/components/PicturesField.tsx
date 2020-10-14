import React, { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/core";
import PictureInput from "./PictureInput";

export interface PicturesFieldProps {
  setField: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}

const PicturesField: React.FC<PicturesFieldProps> = ({ setField }) => {
  const [pictures, setPictures] = useState([] as File[]);
  let index = 0;

  useEffect(() => {
    setField("pictures", pictures);
  }, [pictures]);

  return (
    <Box overflow={pictures.length > 1 ? "scroll" : "auto"}>
      <Flex w="fit-content">
        <PictureInput
          setPictures={setPictures}
          pictures={pictures}
          index={index++}
          setField={setField}
        />
        {pictures.map(() => (
          <PictureInput
            setField={setField}
            key={index}
            pictures={pictures}
            setPictures={setPictures}
            index={index++}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default PicturesField;
