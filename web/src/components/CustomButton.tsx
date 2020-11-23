import React from "react";
import { Button, ButtonProps } from "@chakra-ui/core";

export interface CustomButtonProps extends ButtonProps {
  variant: "transparent" | "normal";
}

const CustomButton: React.FC<CustomButtonProps> = ({ variant, children }) => {
  return (
    <Button
      rounded="full"
      px={{ base: 6, sm: 10, md: 12, lg: 16, xl: 20 }}
      py={{ base: 2, sm: 3, md: 6 }}
      textTransform="uppercase"
      color={variant === "transparent" ? "whitesmoke" : "black"}
      border={variant === "transparent" ? "2px" : "none"}
      borderColor={variant === "transparent" ? "whitesmoke" : "none"}
      bgColor={variant === "transparent" ? "transparent" : "none"}
      fontSize={{ base: "12px", sm: "14px", md: "16px", lg: "18px" }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
