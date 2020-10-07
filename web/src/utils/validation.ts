import { LoginError, LoginInput } from "../pages/authentification";

export const validateLogin = (input: LoginInput): LoginError[] => {
  const errors: LoginError[] = [];
  if (input.email.length === 0) {
    errors.push({ field: "email", message: "Name is required" });
  }
  if (input.password.length === 0) {
    errors.push({ field: "password", message: "Password is required" });
  }
  return errors;
};

export const errorMap = (errors: LoginError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
