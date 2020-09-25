import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerTestClient,
  createTestClient,
} from "apollo-server-testing";
import { Connection } from "typeorm";
import User from "../entities/User";
import { createApolloServer } from "../utils/createApolloServer";
import { createTestConnection } from "../utils/createTestConnection";
import { Errors, errorsMap } from "../utils/validator";
import { createApolloTestServerWithSession } from "../utils/createApolloTestServerWithSession";

let apolloServer: ApolloServer;
let testClient: ApolloServerTestClient;
let conn: Connection;

const registerMutation = `
   mutation RegisterMutation ($email: String!, $password: String!){
      register(email:$email, password: $password){
         errors{
            name
            field
            message
         }
         user{
            email
         }
      }
   }`;

const loginMutation = `
   mutation LoginMutation($email: String!, $password: String!){
      login(email: $email, password: $password){
         errors{
            name
            field
            message
         }
         user{
            email
         }
      }
   }`;
const meQuery = `
   query meQuery { 
      me {
         email
      }
   }`;

beforeAll(async () => {
  conn = await createTestConnection();
  apolloServer = await createApolloServer();
  testClient = createTestClient(apolloServer);
});

afterAll(async () => {
  await conn.close();
});

describe("Apollo UserResolver testing", () => {
  describe("mutation register() ", () => {
    it("Error: password is not long enough", async () => {
      const result = await testClient.mutate({
        mutation: registerMutation,
        variables: {
          email: "ben@ben.com",
          password: "123",
        },
      });
      expect(result.data?.register.errors).toEqual([
        errorsMap().get(Errors.PASSWORD_EMPTY),
      ]);
    });
    it("Error: password is not valid", async () => {
      const result = await testClient.mutate({
        mutation: registerMutation,
        variables: {
          email: "ben@ben.com",
          password: "123benben",
        },
      });
      expect(result.data?.register.errors).toEqual([
        errorsMap().get(Errors.PASSWORD_INVALID),
      ]);
    });
    it("Error: email is empty", async () => {
      const result = await testClient.mutate({
        mutation: registerMutation,
        variables: {
          email: "",
          password: "123benBen",
        },
      });
      expect(result.data?.register.errors).toEqual([
        errorsMap().get(Errors.EMAIL_EMPTY),
      ]);
    });
    it("Error: email is not valid", async () => {
      const result = await testClient.mutate({
        mutation: registerMutation,
        variables: {
          email: "benben.com",
          password: "123benBen",
        },
      });
      expect(result.data?.register.errors).toEqual([
        errorsMap().get(Errors.EMAIL_INVALID),
      ]);
    });
    it("Error: email is empty, password is empty", async () => {
      const result = await testClient.mutate({
        mutation: registerMutation,
        variables: {
          email: "",
          password: "",
        },
      });
      expect(result.data?.register.errors).toEqual([
        errorsMap().get(Errors.EMAIL_EMPTY),
        errorsMap().get(Errors.PASSWORD_EMPTY),
      ]);
    });
    it("Error: email is invalid, password is invalid", async () => {
      const result = await testClient.mutate({
        mutation: registerMutation,
        variables: {
          email: "ben.com",
          password: "123ben",
        },
      });
      expect(result.data?.register.errors).toEqual([
        errorsMap().get(Errors.EMAIL_INVALID),
        errorsMap().get(Errors.PASSWORD_INVALID),
      ]);
    });

    it("Success: user is registred", async () => {
      const testUser = { email: "ben@ben.com", password: "123Benben" };
      const result = await testClient.mutate({
        mutation: registerMutation,
        variables: testUser,
      });
      expect(result.data?.register.user).toEqual({ email: testUser.email });

      const user = await User.findOne({ where: { email: testUser.email } });
      expect(user).toBeDefined();
    });

    it("Error: email is used", async () => {
      const testUser = { email: "ben1@ben.com", password: "123Benben" };
      const result = await testClient.mutate({
        mutation: registerMutation,
        variables: testUser,
      });
      expect(result.data?.register.user).toEqual({ email: testUser.email });
      const sameEmailResult = await testClient.mutate({
        mutation: registerMutation,
        variables: testUser,
      });
      expect(sameEmailResult.data?.register.errors).toEqual([
        errorsMap().get(Errors.EMAIL_IN_USE),
      ]);
    });
  });
  describe("mutation login()", () => {
    it("Error: email is empty", async () => {
      const result = await testClient.mutate({
        mutation: loginMutation,
        variables: {
          email: "",
          password: "123benBen",
        },
      });
      expect(result.data?.login.errors).toEqual([
        errorsMap().get(Errors.EMAIL_EMPTY),
      ]);
    });
    it("Error: email is invalid", async () => {
      const result = await testClient.mutate({
        mutation: loginMutation,
        variables: {
          email: "ben.com",
          password: "123benBen",
        },
      });
      expect(result.data?.login.errors).toEqual([
        errorsMap().get(Errors.EMAIL_INVALID),
      ]);
    });
    it("Error: password is empty", async () => {
      const result = await testClient.mutate({
        mutation: loginMutation,
        variables: {
          email: "ben@ben.com",
          password: "",
        },
      });
      expect(result.data?.login.errors).toEqual([
        errorsMap().get(Errors.PASSWORD_EMPTY),
      ]);
    });
    it("Error: invalid password", async () => {
      const testUser = { email: "ben2@ben.com", password: "ben123Ben" };
      const registerResult = await testClient.mutate({
        mutation: registerMutation,
        variables: testUser,
      });
      expect(registerResult.data?.register.user).toEqual({
        email: testUser.email,
      });
      expect(
        await User.findOne({ where: { email: testUser.email } })
      ).toBeDefined();

      const loginResult = await testClient.mutate({
        mutation: loginMutation,
        variables: { email: testUser.email, password: "123Ben123" },
      });
      expect(loginResult.data?.login.errors).toEqual([
        errorsMap().get(Errors.INVALID_CREDENTIALS),
      ]);
    });
    it("Error: invalid email", async () => {
      const testUser = { email: "ben3@ben.com", password: "ben123Ben" };
      const registerResult = await testClient.mutate({
        mutation: registerMutation,
        variables: testUser,
      });
      expect(registerResult.data?.register.user).toEqual({
        email: testUser.email,
      });
      expect(
        await User.findOne({ where: { email: testUser.email } })
      ).toBeDefined();

      const loginResult = await testClient.mutate({
        mutation: loginMutation,
        variables: { email: "ben4@ben.com", password: testUser.password },
      });
      expect(loginResult.data?.login.errors).toEqual([
        errorsMap().get(Errors.INVALID_CREDENTIALS),
      ]);
    });
  });
  describe("query me()", () => {
    it("Error: sessionId is undefined", async () => {
      const result = await testClient.query({
        query: meQuery,
      });
      expect(result.data?.me).toEqual(null);
    });
    it("Error: no such user with sessionId", async () => {
      const id = -1;
      const testClientWithSession = await createTestClient(
        await createApolloTestServerWithSession(id)
      );
      const result = await testClientWithSession.query({
        query: meQuery,
      });
      expect(result.data?.me).toEqual(null);
    });
    it("Success: user got by session userId", async () => {
      const id = 1;
      const testClientWithSession = await createTestClient(
        await createApolloTestServerWithSession(id)
      );
      const result = await testClientWithSession.query({
        query: meQuery,
      });
      const user = await User.findOne(id);
      expect(result.data?.me).toEqual({ email: user?.email });
    });
  });
});
