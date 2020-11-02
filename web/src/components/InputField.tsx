import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  Box,
} from "@chakra-ui/core";
import { useField } from "formik";
import React, { InputHTMLAttributes, useState } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  InputHTMLAttributes<HTMLTextAreaElement> & {
    name: string;
    label: string;
    variant?: "input" | "textarea" | "datalist";
    secondaryText?: boolean;
    isDisabled?: boolean;
    items?: string[];
    listName?: string;
  };

export const InputField: React.FC<InputFieldProps> = ({
  variant = "input",
  secondaryText = false,
  label,
  size: _,
  isDisabled,
  items,
  listName,
  ...props
}) => {
  const [field, { error }] = useField(props);
  const [techIcons, setTechIcons] = useState<string[]>(items || []);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={label} fontSize={secondaryText ? 14 : 16}>
        {label}
      </FormLabel>
      {variant === "input" ? (
        <Input {...field} id={field.name} {...props} isDisabled={isDisabled} />
      ) : variant === "textarea" ? (
        <Textarea size="lg" {...field} id={field.name} {...props} />
      ) : (
        <>
          <Input
            {...field}
            id={field.name}
            {...props}
            list={listName}
            onKeyUp={() => {}}
          />

          <datalist id={listName}>
            {techIcons?.sort().map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </datalist>
        </>
      )}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
