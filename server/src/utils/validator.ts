import { FieldError } from "src/resolvers/types";
import { UserInput } from "src/resolvers/user";
import { TechInput } from "src/resolvers/technology";
import { ProjectInput } from "src/resolvers/project";

export enum Errors {
  EMAIL_EMPTY = "EMAIL_EMPTY",
  EMAIL_INVALID = "EMAIL_INVALID",
  PASSWORD_EMPTY = "PASSWORD_EMPTY",
  PASSWORD_INVALID = "PASSWORD_INVALID",
  EMAIL_IN_USE = "EMAIL_IN_USE",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  TECH_NAME_EMPTY = "TECH_NAME_EMPTY",
  TECH_PICTURE_PATH_EMPTY = "TECH_PICTURE_PATH_EMPTY",
  TECH_PICTURE_PATH_INVALID = "TECH_PICTURE_PATH_INVALID",
  TECH_IS_CREATED = "TECH_IS_CREATED",
  TECH_IS_NOT_FOUND = "TECH_IS_NOT_FOUND",
  PROJECT_IS_NOT_FOUND = "PROJECT_IS_NOT_FOUND",
  PROJECT_NAME_IS_EMPTY = "PROJECT_NAME_IS_EMPTY",
  PROJECT_PICTURE_IS_EMPTY = "PROJECT_PICTURE_IS_EMPTY",
  PROJECT_PICTURE_PATH_INVALID = "PROJECT_PICTURE_PATH_INVALID",
  PROJECT_IS_CREATED = "PROJECT_IS_CREATED",
  PROJECT_STATUS_IS_UNDEFINED = "PROJECT_STATUS_IS_UNDEFINED",
}

export const errorsMap = (): Map<string, FieldError> => {
  const map = new Map<string, FieldError>();
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
    {
      name: Errors.TECH_NAME_EMPTY,
      field: "name",
      message: "Name should be at least 3 symbolds long",
    },
    {
      name: Errors.TECH_PICTURE_PATH_EMPTY,
      field: "picturePath",
      message: "Picture path cannot be empty",
    },
    {
      name: Errors.TECH_PICTURE_PATH_INVALID,
      field: "picturePath",
      message: "Picture path is not valid",
    },
    {
      name: Errors.TECH_IS_CREATED,
      field: "name",
      message: "Technology with a such name is already created",
    },
    {
      name: Errors.TECH_IS_NOT_FOUND,
      field: "error",
      message: "Technology with a such name is not found",
    },
    {
      name: Errors.PROJECT_IS_NOT_FOUND,
      field: "name",
      message: "Project with a such name is not found",
    },
    {
      name: Errors.PROJECT_NAME_IS_EMPTY,
      field: "name",
      message: "Project name cannot be null",
    },
    {
      name: Errors.PROJECT_PICTURE_IS_EMPTY,
      field: "pictureUrl",
      message: "Project pictureUrl cannot be null",
    },
    {
      name: Errors.PROJECT_PICTURE_PATH_INVALID,
      field: "pictureUrl",
      message: "Picture path is invalid",
    },
    {
      name: Errors.PROJECT_STATUS_IS_UNDEFINED,
      field: "status",
      message: "Status cannot be undefined",
    },
    {
      name: Errors.PROJECT_IS_CREATED,
      field: "error",
      message: "Project with such name is already created",
    },
  ];
  errors.forEach((e) => {
    map.set(e.name, e);
  });

  return map;
};

export const validateUser = (input: UserInput): FieldError[] => {
  const errors: FieldError[] = [];
  if (!input.email) {
    const error = errorsMap().get(Errors.EMAIL_EMPTY)!;
    errors.push(error);
  } else if (
    input.email.length !== 0 &&
    !input.email.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi
    )
  ) {
    const error = errorsMap().get(Errors.EMAIL_INVALID)!;
    errors.push(error);
  }

  if (input.password.length < 6) {
    const error = errorsMap().get(Errors.PASSWORD_EMPTY)!;
    errors.push(error);
  } else if (
    !input.password.match(/^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9])(.{6,})$/gm)
  ) {
    const error = errorsMap().get(Errors.PASSWORD_INVALID)!;
    errors.push(error);
  }

  return errors;
};

export const validateTechnology = (input: TechInput): FieldError[] => {
  const errors: FieldError[] = [];
  if (input.name.length < 3) {
    const error = errorsMap().get(Errors.TECH_NAME_EMPTY)!;
    errors.push(error);
  }
  if (!input.picturePath) {
    const error = errorsMap().get(Errors.TECH_PICTURE_PATH_EMPTY)!;
    errors.push(error);
  } else if (
    !input.picturePath.match(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm
    )
  ) {
    const error = errorsMap().get(Errors.TECH_PICTURE_PATH_INVALID)!;
    errors.push(error);
  }
  return errors;
};

export const validateProject = (input: ProjectInput): FieldError[] => {
  const errors: FieldError[] = [];
  if (!input.name) {
    errors.push(errorsMap().get(Errors.PROJECT_NAME_IS_EMPTY)!);
  }

  if (!input.status) {
    errors.push(errorsMap().get(Errors.PROJECT_STATUS_IS_UNDEFINED)!);
  }
  return errors;
};
