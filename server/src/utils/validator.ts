import { FieldError } from "src/resolvers/user";

export enum Errors {
  EMAIL_EMPTY = "EMAIL_EMPTY",
  EMAIL_INVALID = "EMAIL_INVALID",
  PASSWORD_EMPTY = "PASSWORD_EMPTY",
  PASSWORD_INVALID = "PASSWORD_INVALID",
  EMAIL_IN_USE = "EMAIL_IN_USE",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
}

export const errorsMap = (): Map<string, FieldError> => {
  const map = new Map<Errors, FieldError>();
  const errors: FieldError[] = [
    {
      name: Errors.EMAIL_EMPTY,
      field: "email",
      message: "Email field cannot be empty",
    },
    {
      name: Errors.EMAIL_INVALID,
      field: "email",
      message: "Invalid email address",
    },
    {
      name: Errors.PASSWORD_EMPTY,
      field: "password",
      message: "Password should be at least 6 symbols long",
    },
    {
      name: Errors.PASSWORD_INVALID,
      field: "password",
      message:
        "Password should contain at least one digit and one capital letter",
    },
    {
      name: Errors.EMAIL_IN_USE,
      field: "email",
      message: "This email is already in use",
    },
    {
      name: Errors.INVALID_CREDENTIALS,
      field: "password",
      message: "Email or password is not correct",
    },
  ];
  errors.forEach((e) => {
    map.set(Errors[e.name], e);
  });

  return map;
};

export const validateLogin = (
  email: string,
  password: string
): FieldError[] => {
  const errors: FieldError[] = [];
  if (email.length === 0) {
    const error = errorsMap().get(Errors.EMAIL_EMPTY)!;
    errors.push(error);
  } else if (
    email.length !== 0 &&
    !email.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi
    )
  ) {
    const error = errorsMap().get(Errors.EMAIL_INVALID)!;
    errors.push(error);
  }

  if (password.length < 6) {
    const error = errorsMap().get(Errors.PASSWORD_EMPTY)!;
    errors.push(error);
  } else if (
    !password.match(/^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9])(.{6,})$/gm)
  ) {
    const error = errorsMap().get(Errors.PASSWORD_INVALID)!;
    errors.push(error);
  }

  return errors;
};
