import React, { InputHTMLAttributes } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/core";
import { useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  variant?: string;
  secondaryText?: boolean;
  isDisabled?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  variant = "input",
  secondaryText = false,
  label,
  size: _,
  isDisabled,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={label} fontSize={secondaryText ? 14 : 16}>
        {label}
      </FormLabel>
      {variant === "input" ? (
        <Input {...field} id={field.name} {...props} isDisabled={isDisabled} />
      ) : variant === "color" ? (
        <Input
          {...field}
          type="color"
          id={field.name}
          {...props}
          isDisabled={isDisabled}
        />
      ) : (
        <Textarea size="lg" {...field} id={field.name} {...props} />
      )}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
