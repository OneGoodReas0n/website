import { ApolloServer } from "apollo-server-express";
import { GraphQLResponse } from "apollo-server-types";
import {
  ApolloServerTestClient,
  createTestClient,
} from "apollo-server-testing";
import User from "../entities/User";
import { createApolloServer } from "../utils/createApolloServer";
import { createApolloTestServerWithSession } from "../utils/createApolloTestServerWithSession";
import {
  closeConnection,
  createORMConnection,
} from "../utils/createORMConnection";
import { Errors, errorsMap } from "../utils/validator";
import { getConnection } from "typeorm";
import Technology from "../entities/Technology";
import { UserInput } from "src/resolvers/user";
import { TechInput } from "src/resolvers/technology";
import { create } from "domain";

let apolloServer: ApolloServer;
let testClient: ApolloServerTestClient;

export const registerMutation = `
   mutation RegisterMutation ($email: String!, $password: String!){
      register(input:{email:$email, password: $password}){
         errors{
            name
            field
            message
         }
         entity{
            email
         }
      }
   }`;

export const loginMutation = `
   mutation LoginMutation($email: String!, $password: String!){
      login(input:{email:$email, password: $password}){
         errors{
            name
            field
            message
         }
         entity{
            email
         }
      }
   }`;
export const meQuery = `
   query meQuery {
      me {
         email
      }
   }`;

const getOneTechMutation = `
   query GetOneTechnology($name: String!){
     getOne(name: $name){
       id
       name
     }
   }
   `;

const createTechMutation = `
   mutation CreateTechMutation($name: String!, $picturePath: String!){
      create(input:{name:$name, picturePath:$picturePath}){
         errors{
            name
            field
            message
          }
          entity{
            name
          }
      }
   }`;

const updateTechMutation = `
  mutation UpdateTechMutation($id: Float!, $name: String!, $picturePath: String!){
    update(input:{name:$name, picturePath: $picturePath}, id:$id){
      errors{
        name
        field
        message
      }
      entity{
        id
        name
      }
    }
}`;

const deleteTechMutation = `
  mutation DeleteTech($id: Float!){
    delete(id: $id)
  }`;

const mutateRegister = async (
  input: UserInput,
  client: ApolloServerTestClient = testClient
): Promise<GraphQLResponse> => {
  return client.mutate({
    mutation: registerMutation,
    variables: input,
  });
};

const mutateLogin = async (
  input: UserInput,
  client: ApolloServerTestClient = testClient
): Promise<GraphQLResponse> => {
  return client.mutate({
    mutation: loginMutation,
    variables: input,
  });
};

const queryMe = async (
  client: ApolloServerTestClient = testClient
): Promise<GraphQLResponse> => {
  return client.query({
    query: meQuery,
  });
};

const mutateCreateTech = async (
  input: TechInput,
  client: ApolloServerTestClient = testClient
): Promise<GraphQLResponse> => {
  return client.mutate({
    mutation: createTechMutation,
    variables: input,
  });
};

const mutateGetOneTech = async (
  input: TechInput,
  client: ApolloServerTestClient = testClient
): Promise<GraphQLResponse> => {
  return client.mutate({
    mutation: getOneTechMutation,
    variables: { name: input.name },
  });
};

const mutateUpdateTech = async (
  input: TechInput,
  id: number,
  client: ApolloServerTestClient = testClient
): Promise<GraphQLResponse> => {
  return client.mutate({
    mutation: updateTechMutation,
    variables: { ...input, id },
  });
};

const mutateDeleteTech = async (
  id: number,
  client: ApolloServerTestClient = testClient
): Promise<GraphQLResponse> => {
  return client.mutate({
    mutation: deleteTechMutation,
    variables: { id },
  });
};

const clearSession = async () => {
  apolloServer = await createApolloServer();
  testClient = createTestClient(apolloServer);
};

const checkIfUserAuthorized = async () => {
  const testUser: UserInput = {
    email: "ben@ben.com",
    password: "123Benben",
  };

  await mutateRegister(testUser);
  const user = await User.findOne({ where: { email: testUser.email } });
  apolloServer = await createApolloTestServerWithSession(user?.id!);
  testClient = createTestClient(apolloServer);

  const meResult = await queryMe(testClient);
  expect(meResult.data?.me).toEqual({ email: user?.email });
};

beforeAll(async () => {
  await createORMConnection();
  await getConnection().runMigrations();
  apolloServer = await createApolloServer();
  testClient = createTestClient(apolloServer);
});

afterEach(async () => {
  await User.clear();
  await Technology.clear();
});

afterAll(async () => {
  await closeConnection();
});

describe("Apollo UserResolver testing", () => {
  describe("mutation register() ", () => {
    it("Error: password is not long enough", async () => {
      const testUser: UserInput = { email: "ben@ben.com", password: "123" };
      const result = await mutateRegister(testUser);
      expect(result.data?.register.errors).toEqual([
        errorsMap().get(Errors.PASSWORD_EMPTY),
      ]);
    });
    it("Error: password is not valid", async () => {
      const testUser: UserInput = { email: "ben@ben.com", password: "ben123" };
      const result = await mutateRegister(testUser);
      expect(result.data?.register.errors).toEqual([
        errorsMap().get(Errors.PASSWORD_INVALID),
      ]);
    });
    it("Error: email is empty", async () => {
      const testUser: UserInput = { email: "", password: "Ben123ben" };
      const result = await mutateRegister(testUser);
      expect(result.data?.register.errors).toEqual([
        errorsMap().get(Errors.EMAIL_EMPTY),
      ]);
    });
    it("Error: email is not valid", async () => {
      const testUser: UserInput = { email: "ben.com", password: "Ben123ben" };
      const result = await mutateRegister(testUser);
      expect(result.data?.register.errors).toEqual([
        errorsMap().get(Errors.EMAIL_INVALID),
      ]);
    });
    it("Error: email is empty, password is empty", async () => {
      const testUser: UserInput = { email: "", password: "" };
      const result = await mutateRegister(testUser);
      expect(result.data?.register.errors).toEqual([
        errorsMap().get(Errors.EMAIL_EMPTY),
        errorsMap().get(Errors.PASSWORD_EMPTY),
      ]);
    });
    it("Error: email is invalid, password is invalid", async () => {
      const testUser: UserInput = { email: "ben.com", password: "Benben" };
      const result = await mutateRegister(testUser);
      expect(result.data?.register.errors).toEqual([
        errorsMap().get(Errors.EMAIL_INVALID),
        errorsMap().get(Errors.PASSWORD_INVALID),
      ]);
    });

    it("Success: user is registred", async () => {
      const testUser: UserInput = {
        email: "ben@ben.com",
        password: "Ben123ben",
      };
      const result = await mutateRegister(testUser);
      expect(result.data?.register.entity).toEqual({ email: testUser.email });

      const user = await User.findOne({ where: { email: testUser.email } });
      expect(user).toBeDefined();
    });

    it("Error: email is used", async () => {
      const testUser: UserInput = {
        email: "ben@ben.com",
        password: "123Benben",
      };
      const result = await mutateRegister(testUser);
      expect(result.data?.register.entity).toEqual({ email: testUser.email });
      const sameEmailResult = await mutateRegister(testUser);
      expect(sameEmailResult.data?.register.errors).toEqual([
        errorsMap().get(Errors.EMAIL_IN_USE),
      ]);
    });
  });
  describe("mutation login()", () => {
    it("Error: email is empty", async () => {
      const testUser: UserInput = { email: "", password: "123Benben" };
      const result = await mutateLogin(testUser);
      expect(result.data?.login.errors).toEqual([
        errorsMap().get(Errors.EMAIL_EMPTY),
      ]);
    });
    it("Error: email is invalid", async () => {
      const testUser: UserInput = { email: "ben.com", password: "123Benben" };
      const result = await mutateLogin(testUser);
      expect(result.data?.login.errors).toEqual([
        errorsMap().get(Errors.EMAIL_INVALID),
      ]);
    });
    it("Error: password is empty", async () => {
      const testUser: UserInput = { email: "ben@ben.com", password: "" };
      const result = await mutateLogin(testUser);
      expect(result.data?.login.errors).toEqual([
        errorsMap().get(Errors.PASSWORD_EMPTY),
      ]);
    });
    it("Error: invalid password", async () => {
      const testUser: UserInput = {
        email: "ben@ben.com",
        password: "123Benben",
      };
      const registerResult = await mutateRegister(testUser);
      expect(registerResult.data?.register.entity).toEqual({
        email: testUser.email,
      });
      expect(
        await User.findOne({ where: { email: testUser.email } })
      ).toBeDefined();

      const loginResult = await mutateLogin({
        email: testUser.email,
        password: "123Ben123",
      });
      expect(loginResult.data?.login.errors).toEqual([
        errorsMap().get(Errors.INVALID_CREDENTIALS),
      ]);
    });
    it("Error: invalid email", async () => {
      const testUser: UserInput = {
        email: "ben@ben.com",
        password: "123Benben",
      };
      const registerResult = await mutateRegister(testUser);
      expect(registerResult.data?.register.entity).toEqual({
        email: testUser.email,
      });
      expect(
        await User.findOne({ where: { email: testUser.email } })
      ).toBeDefined();

      const loginResult = await mutateLogin({
        email: "ben1@ben.com",
        password: testUser.password,
      });
      expect(loginResult.data?.login.errors).toEqual([
        errorsMap().get(Errors.INVALID_CREDENTIALS),
      ]);
    });
  });
  describe("query me()", () => {
    it("Error: sessionId is undefined", async () => {
      const result = await queryMe();
      expect(result.data?.me).toEqual(null);
    });
    it("Error: no such user with sessionId", async () => {
      const id = -1;
      const testClientWithSession = await createTestClient(
        await createApolloTestServerWithSession(id)
      );
      const result = await queryMe(testClientWithSession);
      expect(result.data?.me).toEqual(null);
    });
    it("Success: user got by session userId", async () => {
      const testUser: UserInput = {
        email: "ben@ben.com",
        password: "ben123Ben",
      };
      const registerResult = await mutateRegister(testUser);
      expect(registerResult.data?.register.entity).toEqual({
        email: testUser.email,
      });
      const user = await User.findOne({ where: { email: testUser.email } });
      const testClientWithSession = await createTestClient(
        await createApolloTestServerWithSession(user?.id!)
      );
      const result = await queryMe(testClientWithSession);
      expect(result.data?.me).toEqual({ email: user?.email });
    });
  });
});

describe("Apollo TechResolver testing", () => {
  describe("mutation create() ", () => {
    it("Error: name is undefined", async () => {
      await checkIfUserAuthorized();
      const testTech: TechInput = {
        name: "",
        picturePath: "http://picture.com/1",
      };
      const result = await mutateCreateTech(testTech);
      expect(result.data?.create.errors).toEqual([
        errorsMap().get(Errors.TECH_NAME_EMPTY),
      ]);
      await clearSession();
    });

    it("Error: picturePath is undefined", async () => {
      await checkIfUserAuthorized();
      const testTech: TechInput = { name: "React", picturePath: "" };
      const result = await mutateCreateTech(testTech);
      expect(result.data?.create.errors).toEqual([
        errorsMap().get(Errors.TECH_PICTURE_PATH_EMPTY),
      ]);
      await clearSession();
    });

    it("Error: picturePath is invalid", async () => {
      await checkIfUserAuthorized();
      const testTech: TechInput = { name: "React", picturePath: "http://" };
      const result = await mutateCreateTech(testTech);
      expect(result.data?.create.errors).toEqual([
        errorsMap().get(Errors.TECH_PICTURE_PATH_INVALID),
      ]);
      await clearSession();
    });

    it("Error: name and picturePath are undefined", async () => {
      await checkIfUserAuthorized();
      const testTech: TechInput = { name: "", picturePath: "" };
      const result = await mutateCreateTech(testTech);
      expect(result.data?.create.errors).toEqual([
        errorsMap().get(Errors.TECH_NAME_EMPTY),
        errorsMap().get(Errors.TECH_PICTURE_PATH_EMPTY),
      ]);
      await clearSession();
    });
    it("Success: technology is created", async () => {
      await checkIfUserAuthorized();
      const testTech = { name: "React", picturePath: "http://picture.com/1" };
      const result = await mutateCreateTech(testTech);
      expect(result.data?.create.entity).toEqual({ name: testTech.name });

      const tech = await Technology.findOne({
        where: { name: testTech.name },
      });
      expect(tech).toBeDefined();
      await clearSession();
    });
  });

  describe("mutation getOne() ", () => {
    it("Error: no such technology", async () => {
      await checkIfUserAuthorized();
      const testTech: TechInput = {
        name: "React",
        picturePath: "http://picture.com/1",
      };
      const createResult = await mutateCreateTech(testTech);
      expect(createResult.data?.create.entity).toEqual({ name: testTech.name });
      const getResult = await mutateGetOneTech({
        name: "Graphql",
        picturePath: testTech.picturePath,
      });
      expect(getResult.data?.getOne).toEqual(null);
      await clearSession();
    });

    it("Success: one technology has been returned", async () => {
      await checkIfUserAuthorized();
      const testTech: TechInput = {
        name: "React",
        picturePath: "http://picture.com/1",
      };

      const createResult = await mutateCreateTech(testTech);
      expect(createResult.data?.create.entity).toEqual({ name: testTech.name });
      const tech = await Technology.findOne({
        where: { name: testTech.name },
        relations: ["picture"],
      });
      expect(tech).toBeDefined();

      const getResult = await testClient.mutate({
        mutation: getOneTechMutation,
        variables: { name: tech?.name },
      });
      expect(getResult.data?.getOne).toEqual({
        id: tech?.id,
        name: tech?.name,
      });
      await clearSession();
    });
  });

  describe("mutation update() ", () => {
    it("Error: technology name cannot be null", async () => {
      await checkIfUserAuthorized();
      const testEntity = { name: "React", picturePath: "http://picture.com/1" };
      const createResult = await mutateCreateTech(testEntity);
      expect(createResult.data?.create.entity).toEqual({
        name: testEntity.name,
      });
      const tech = await Technology.findOne({
        where: { name: testEntity.name },
      });
      expect(tech).toBeDefined();

      const updateResult = await mutateUpdateTech(
        { name: "", picturePath: testEntity.picturePath },
        tech?.id!
      );
      expect(updateResult.data?.update.errors).toEqual([
        errorsMap().get(Errors.TECH_NAME_EMPTY),
      ]);
      await clearSession();
    });

    it("Success: technology name is updated", async () => {
      await checkIfUserAuthorized();

      const testEntity = { name: "React", picturePath: "http://picture.com/1" };

      const result = await mutateCreateTech(testEntity);
      expect(result.data?.create.entity).toEqual({ name: testEntity.name });

      const tech = await Technology.findOne({
        where: { name: testEntity.name },
        relations: ["picture"],
      });
      expect(tech).toBeDefined();

      const updateResult = await mutateUpdateTech(
        { name: "Graphql", picturePath: testEntity.picturePath },
        tech?.id!
      );
      expect(updateResult.data?.update.entity).toEqual({
        id: tech?.id,
        name: "Graphql",
      });
      await clearSession();
    });
  });

  describe("mutation delete()", () => {
    it("Error: technology with such id is not found", async () => {
      await checkIfUserAuthorized();
      const tech: TechInput = {
        name: "React",
        picturePath: "http://random.com/1",
      };
      const createResult = await mutateCreateTech(tech);
      expect(createResult.data?.create.entity).toEqual({ name: tech.name });
      const technology = await Technology.findOne({
        where: { name: tech.name },
      });
      expect(technology).toBeDefined();
      const deleteResult = await mutateDeleteTech(-1);
      expect(deleteResult.data?.delete).toEqual(false);
      await clearSession();
    });
  });
  it("Success: technology has been deleted", async () => {
    await checkIfUserAuthorized();
    const tech: TechInput = {
      name: "React",
      picturePath: "http://random.com/1",
    };
    const createResult = await mutateCreateTech(tech);
    expect(createResult.data?.create.entity).toEqual({ name: tech.name });
    const technology = await Technology.findOne({
      where: { name: tech.name },
    });
    expect(technology).toBeDefined();
    const deleteResult = await mutateDeleteTech(technology?.id!);
    expect(deleteResult.data?.delete).toEqual(true);
    await clearSession();
  });
});
