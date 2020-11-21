import React from "react";
import { Formik, Form } from "formik";
import { InputField } from "./InputField";
import { Flex, Button, useToast } from "@chakra-ui/core";
import { useSendMessageMutation } from "../generate/graphql";
import { validateSendMessage, errorMap } from "../utils/validation";

export interface SendMessageFormProps {
  setOpen(state: boolean): void;
}

export interface SendMessageInput {
  email: string;
  title: string;
  message: string;
}

const SendMessageForm: React.FC<SendMessageFormProps> = ({ setOpen }) => {
  const [sendMessage] = useSendMessageMutation();
  const toast = useToast();
  return (
    <Formik
      initialValues={{
        email: "",
        title: "",
        message: "",
      }}
      onSubmit={async (values, { setErrors }) => {
        const input: SendMessageInput = values;
        const errors = validateSendMessage(input);
        if (errors.length > 0) {
          setErrors(errorMap(errors));
        } else {
          await sendMessage({
            variables: {
              email: input.email,
              title: input.title,
              message: input.message,
            },
          });
          toast({
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
            title: "Thanks for your email!",
            description: "I will reply as soon as possible",
          });
          setOpen(false);
        }
      }}
    >
      {({ isSubmitting, values }) => (
        <Form>
          {Object.keys(values).map((val) => {
            if (val === "message") {
              return (
                <InputField
                  key={val}
                  name={val}
                  label={val.slice(0, 1).toUpperCase().concat(val.slice(1))}
                  placeholder={`Write your message here`}
                  variant="textarea"
                />
              );
            }
            return (
              <InputField
                key={val}
                name={val}
                label={val.slice(0, 1).toUpperCase().concat(val.slice(1))}
                placeholder={`Your ${val}`}
              />
            );
          })}
          <Flex justifyContent="space-between">
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button isLoading={isSubmitting} type="submit" colorScheme="teal">
              Send
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default SendMessageForm;
