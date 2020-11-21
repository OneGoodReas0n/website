import { LoginInput } from "../pages/authentification";
import { SendMessageInput } from "../components/SendMessageForm";

interface FormError {
  field: string;
  message: string;
}

const validEmailPattern = new RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  "gi"
);

export const validateLogin = (input: LoginInput): FormError[] => {
  const errors: FormError[] = [];
  if (input.email.length === 0) {
    errors.push({ field: "email", message: "Name is required" });
  }
  if (input.password.length === 0) {
    errors.push({ field: "password", message: "Password is required" });
  }
  return errors;
};

export const validateSendMessage = (input: SendMessageInput): FormError[] => {
  const errors: FormError[] = [];
  if (!input.email.match(validEmailPattern)) {
    errors.push({ field: "email", message: "Email is not valid" });
  }

  if (input.title.length < 3) {
    errors.push({
      field: "title",
      message: "Title should contain at least 3 characters",
    });
  }

  if (input.message.length < 10) {
    errors.push({
      field: "message",
      message: "Message should contain at least 10 characters",
    });
  }
  return errors;
};

export const errorMap = (errors: FormError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
