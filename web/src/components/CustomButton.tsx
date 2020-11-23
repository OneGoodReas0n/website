import React from "react";
import { Button, ButtonProps } from "@chakra-ui/core";

export interface CustomButtonProps extends ButtonProps {
  variant: "transparent" | "normal";
}

const CustomButton: React.FC<CustomButtonProps> = ({ variant, children }) => {
  return (
    <Button
      rounded="full"
      px={{ base: "10px", sm: "10px", md: "20px" }}
      py={{ base: "4px", sm: "4px", md: "6px" }}
      mr={5}
      textTransform="uppercase"
      color={variant === "transparent" ? "whitesmoke" : "black"}
      border={variant === "transparent" ? "2px" : "none"}
      borderColor={variant === "transparent" ? "whitesmoke" : "none"}
      bgColor={variant === "transparent" ? "transparent" : "none"}
      fontSize={{ base: "12px", sm: "14px", md: "20px" }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
