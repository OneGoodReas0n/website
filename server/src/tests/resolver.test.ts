import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerTestClient,
  createTestClient,
} from "apollo-server-testing";
import { GraphQLResponse } from "apollo-server-types";
import { DocumentNode } from "graphql";
import { createORMConnection } from "../utils/createORMConnection";
import { getConnection } from "typeorm";
import Picture from "../entities/Picture";
import Project from "../entities/Project";
import Technology from "../entities/Technology";
import User from "../entities/User";
import { ProjectInput } from "../resolvers/project";
import { TechInput } from "../resolvers/technology";
import { UserInput } from "../resolvers/user";
import { createApolloServer } from "../utils/createApolloServer";
import { createApolloTestServerWithSession } from "../utils/createApolloTestServerWithSession";
import { Errors, errorsMap } from "../utils/validator";

type StringOrAst = string | DocumentNode;

let apolloServer: ApolloServer;
let testClient: ApolloServerTestClient;

const registerMutation = `
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

const loginMutation = `
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

const meQuery = `
   query meQuery {
      me {
         email
      }
   }`;

const getOneTechMutation = `
  query GetTechnology($id:Float!){
    getTechnology(id:$id){
      name
      iconName
      category
    }
  }
   `;

const createTechMutation = `
   mutation CreateTechnology($name: String!, $iconName: String!, $category: Float!){
      createTechnology(input:{name:$name, iconName:$iconName, category:$category}){
         errors{
            name
            field
            message
          }
          entity{
            name
            iconName
            category
          }
      }
   }`;

const updateTechMutation = `
  mutation UpdateTechnology($id: Float!, $name: String!, $iconName: String!, $category: Float! ){
    updateTechnology(input:{name:$name, iconName: $iconName, category: $category}, id:$id){
      errors{
        name
        field
        message
      }
      entity{
        name
        iconName
        category
      }
    }
  }`;

const deleteTechMutation = `
  mutation DeleteTechnology($id: Float!){
    deleteTechnology(id: $id)
  }`;

const getProjectsQuery = `
  query GetProjects{
    getProjects{
      name
      description
      status
      pictures{
        url
        primary
      }
      technologies{
        name
        iconName
      }
      link{
        demo
        source_code
      }
    }
  }
`;

const getProjectQuery = `
  query getProject($id: Float!){
    getProject(id: $id){
      name
      description
      status
      pictures{
        url
      }
      technologies{
        name
      }
      link{
        demo
        source_code
      }
    }
  }
`;

const createProjectMutation = `
  mutation CreateProjectMutation($name: String!, $description: String, $status: String!, $pictures: [PictureObj!], $technologyNames: [String!], $link: LinkObj!){
    createProject(input:{name:$name, description:$description, status: $status, pictures:$pictures, technologyNames:$technologyNames, link:$link}){
      errors{
        name
        field
        message
      }
      entity{
        name
        description
        status
        pictures{
          url
          primary
        }
        technologies{
          name
          iconName
          category
        }
        link{
          demo
          source_code
        }
      }
    }
}
`;

const updateProjectMutation = `
  mutation UpdateProjectMutation($id: Float!, $name: String!, $description: String, $status: String!, $pictures: [PictureObj!], $technologyNames: [String!], $link: LinkObj!){
    updateProject(id:$id,input:{name:$name, description:$description, status: $status, pictures:$pictures, technologyNames:$technologyNames, link:$link}){
      errors{
        name
        field
        message
      }
      entity{
        name
        description
        status
        pictures{
          url
        }
        technologies{
          name
        }
        link{
          demo
          source_code
        }
      }
    }
  }
`;

const deleteProjectMutation = `
  mutation DeleteProjectMutation($id: Float!){
    deleteProject(id:$id)
  }
`;

const mutate = async (
  input: UserInput,
  mutation: StringOrAst,
  client: ApolloServerTestClient = testClient
): Promise<GraphQLResponse> => {
  return client.mutate({
    mutation,
    variables: input,
  });
};

const query = async (
  query: StringOrAst,
  client: ApolloServerTestClient = testClient
): Promise<GraphQLResponse> => {
  return client.query({
    query,
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
  id: Number,
  client: ApolloServerTestClient = testClient
): Promise<GraphQLResponse> => {
  return client.mutate({
    mutation: getOneTechMutation,
    variables: { id },
  });
};

const mutateUpdateTech = async (
  input: TechInput,
  id: Number,
  client: ApolloServerTestClient = testClient
): Promise<GraphQLResponse> => {
  return client.mutate({
    mutation: updateTechMutation,
    variables: { ...input, id },
  });
};

const mutateDeleteTech = async (
  id: Number,
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

  await mutate(testUser, registerMutation);
  const user = await User.findOne({ where: { email: testUser.email } });
  apolloServer = await createApolloTestServerWithSession(user?.id!);
  testClient = createTestClient(apolloServer);

  const meResult = await query(meQuery, testClient);
  expect(meResult.data?.me).toEqual({ email: user?.email });
};

const queryGetProjects = async (
  client: ApolloServerTestClient = testClient
): Promise<GraphQLResponse> => {
  return client.query({
    query: getProjectsQuery,
  });
};

const queryGetProject = async (
  id: Number,
  client: ApolloServerTestClient = testClient
): Promise<GraphQLResponse> => {
  return client.query({
    query: getProjectQuery,
    variables: { id },
  });
};

const mutateCreateProject = async (
  input: ProjectInput,
  client: ApolloServerTestClient = testClient
): Promise<GraphQLResponse> => {
  return client.mutate({
    mutation: createProjectMutation,
    variables: input,
  });
};

const mutateUpdateProject = async (
  id: Number,
  input: ProjectInput,
  client: ApolloServerTestClient = testClient
): Promise<GraphQLResponse> => {
  return client.mutate({
    mutation: updateProjectMutation,
    variables: { id, ...input },
  });
};

const mutateDeleteProject = async (
  id: Number,
  client: ApolloServerTestClient = testClient
): Promise<GraphQLResponse> => {
  return client.mutate({
    mutation: deleteProjectMutation,
    variables: { id },
  });
};

const clearPictures = async () => {
  const pictures = await Picture.find();
  const promises = pictures.map((p) => {
    return new Promise(async (resolve) => {
      p.project = new Project();
      await p.save();
      await Picture.remove(p);
      resolve(true);
    });
  });
  await Promise.all(promises);
};

const clearTechnologies = async () => {
  const technologies = await Technology.find();
  if (technologies.length > 0) {
    await Technology.delete([...technologies.map((tech) => tech.id)]);
  }
};

const clearProjects = async () => {
  const projects = await Project.find();
  if (projects.length > 0) {
    await Project.delete([...projects.map((p) => p.id)]);
  }
};

const createOneTechnology = async (input: TechInput): Promise<Technology> => {
  const result = await mutateCreateTech(input);
  expect(result.data?.createTechnology.entity).toEqual(input);
  const tech = await Technology.findOne({
    where: { name: input.name },
  });
  expect(tech).toBeDefined();
  return tech!;
};

beforeAll(async () => {
  await createORMConnection();
  apolloServer = await createApolloServer();
  testClient = createTestClient(apolloServer);
});

beforeEach(async () => {
  await User.clear();
});

afterAll(async () => {
  await getConnection().close();
});

describe("UserResolver testing", () => {
  describe("mutation register() ", () => {
    it("Error: password is not long enough", async () => {
      const testUser: UserInput = { email: "ben@ben.com", password: "123" };
      const result = await mutate(testUser, registerMutation);
      expect(result.data?.register.errors).toEqual([
        errorsMap().get(Errors.PASSWORD_EMPTY),
      ]);
    });
    it("Error: password is not valid", async () => {
      const testUser: UserInput = { email: "ben@ben.com", password: "ben123" };
      const result = await mutate(testUser, registerMutation);
      expect(result.data?.register.errors).toEqual([
        errorsMap().get(Errors.PASSWORD_INVALID),
      ]);
    });
    it("Error: email is empty", async () => {
      const testUser: UserInput = { email: "", password: "Ben123ben" };
      const result = await mutate(testUser, registerMutation);
      expect(result.data?.register.errors).toEqual([
        errorsMap().get(Errors.EMAIL_EMPTY),
      ]);
    });
    it("Error: email is not valid", async () => {
      const testUser: UserInput = { email: "ben.com", password: "Ben123ben" };
      const result = await mutate(testUser, registerMutation);
      expect(result.data?.register.errors).toEqual([
        errorsMap().get(Errors.EMAIL_INVALID),
      ]);
    });
    it("Error: email is empty, password is empty", async () => {
      const testUser: UserInput = { email: "", password: "" };
      const result = await mutate(testUser, registerMutation);
      expect(result.data?.register.errors).toEqual([
        errorsMap().get(Errors.EMAIL_EMPTY),
        errorsMap().get(Errors.PASSWORD_EMPTY),
      ]);
    });
    it("Error: email is invalid, password is invalid", async () => {
      const testUser: UserInput = { email: "ben.com", password: "Benben" };
      const result = await mutate(testUser, registerMutation);
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
      const result = await mutate(testUser, registerMutation);
      expect(result.data?.register.entity).toEqual({ email: testUser.email });
      const user = await User.findOne({ where: { email: testUser.email } });
      expect(user).toBeDefined();
    });

    it("Error: email is used", async () => {
      const testUser: UserInput = {
        email: "ben@ben.com",
        password: "123Benben",
      };
      const result = await mutate(testUser, registerMutation);
      expect(result.data?.register.entity).toEqual({ email: testUser.email });
      const sameEmailResult = await mutate(testUser, registerMutation);
      expect(sameEmailResult.data?.register.errors).toEqual([
        errorsMap().get(Errors.EMAIL_IN_USE),
      ]);
    });
  });
  describe("mutation login()", () => {
    it("Error: email is empty", async () => {
      const testUser: UserInput = { email: "", password: "123Benben" };
      const result = await mutate(testUser, loginMutation);
      expect(result.data?.login.errors).toEqual([
        errorsMap().get(Errors.EMAIL_EMPTY),
      ]);
    });
    it("Error: email is invalid", async () => {
      const testUser: UserInput = { email: "ben.com", password: "123Benben" };
      const result = await mutate(testUser, loginMutation);
      expect(result.data?.login.errors).toEqual([
        errorsMap().get(Errors.EMAIL_INVALID),
      ]);
    });
    it("Error: password is empty", async () => {
      const testUser: UserInput = { email: "ben@ben.com", password: "" };
      const result = await mutate(testUser, loginMutation);
      expect(result.data?.login.errors).toEqual([
        errorsMap().get(Errors.PASSWORD_EMPTY),
      ]);
    });
    it("Error: invalid password", async () => {
      const testUser: UserInput = {
        email: "ben@ben.com",
        password: "123Benben",
      };
      const registerResult = await mutate(testUser, registerMutation);
      expect(registerResult.data?.register.entity).toEqual({
        email: testUser.email,
      });
      expect(
        await User.findOne({ where: { email: testUser.email } })
      ).toBeDefined();

      const loginResult = await mutate(
        { email: testUser.email, password: "123Ben123" },
        loginMutation
      );
      expect(loginResult.data?.login.errors).toEqual([
        errorsMap().get(Errors.INVALID_CREDENTIALS),
      ]);
    });
    it("Error: invalid email", async () => {
      const testUser: UserInput = {
        email: "ben@ben.com",
        password: "123Benben",
      };
      const registerResult = await mutate(testUser, registerMutation);
      expect(registerResult.data?.register.entity).toEqual({
        email: testUser.email,
      });
      expect(
        await User.findOne({ where: { email: testUser.email } })
      ).toBeDefined();

      const loginResult = await mutate(
        {
          email: "ben1@ben.com",
          password: testUser.password,
        },
        loginMutation
      );
      expect(loginResult.data?.login.errors).toEqual([
        errorsMap().get(Errors.INVALID_CREDENTIALS),
      ]);
    });
  });
  describe("query me()", () => {
    it("Error: sessionId is undefined", async () => {
      const result = await query(meQuery);
      expect(result.data?.me).toEqual(null);
    });
    it("Error: no such user with sessionId", async () => {
      const id = -1;
      const testClientWithSession = await createTestClient(
        await createApolloTestServerWithSession(id)
      );
      const result = await query(meQuery, testClientWithSession);
      expect(result.data?.me).toEqual(null);
    });
    it("Success: user got by session userId", async () => {
      const testUser: UserInput = {
        email: "ben@ben.com",
        password: "ben123Ben",
      };
      const registerResult = await mutate(testUser, registerMutation);
      expect(registerResult.data?.register.entity).toEqual({
        email: testUser.email,
      });
      const user = await User.findOne({ where: { email: testUser.email } });
      const testClientWithSession = await createTestClient(
        await createApolloTestServerWithSession(user?.id!)
      );
      const result = await query(meQuery, testClientWithSession);
      expect(result.data?.me).toEqual({ email: user?.email });
    });
  });
});

describe("TechResolver testing", () => {
  describe("mutation create() ", () => {
    it("Error: name is undefined", async () => {
      await checkIfUserAuthorized();
      const testTech: TechInput = {
        name: "",
        iconName: "picture",
        category: 1,
      };
      const result = await mutateCreateTech(testTech);
      expect(result.data?.createTechnology.errors).toEqual([
        errorsMap().get(Errors.TECH_NAME_EMPTY),
      ]);
      await clearSession();
    });

    it("Error: iconName is undefined", async () => {
      await checkIfUserAuthorized();
      const testTech: TechInput = {
        name: "React",
        iconName: "",
        category: 1,
      };
      const result = await mutateCreateTech(testTech);
      expect(result.data?.createTechnology.errors).toEqual([
        errorsMap().get(Errors.TECH_ICON_NAME_EMPTY),
      ]);
      await clearSession();
    });

    it("Success: technology is created", async () => {
      await checkIfUserAuthorized();
      const testTech: TechInput = {
        name: "React",
        iconName: "picture",
        category: 1,
      };
      const result = await mutateCreateTech(testTech);
      expect(result.data?.createTechnology.entity).toEqual(testTech);
      const tech = await Technology.findOne({
        where: { name: testTech.name },
      });
      expect(tech).toBeDefined();
      await clearTechnologies();
      await clearSession();
    });
  });

  describe("mutation getOne() ", () => {
    it("Error: no such technology", async () => {
      await checkIfUserAuthorized();
      const getResult = await mutateGetOneTech(-1);
      expect(getResult.data?.getTechnology).toEqual(null);
      await clearSession();
    });

    it("Success: one technology has been returned", async () => {
      await checkIfUserAuthorized();
      const testTech: TechInput = {
        name: "React",
        iconName: "picture",
        category: 1,
      };
      const createResult = await mutateCreateTech(testTech);
      expect(createResult.data?.createTechnology.entity).toEqual(testTech);
      const tech = await Technology.findOne({
        where: { name: testTech.name },
      });
      expect(tech).toBeDefined();
      const getResult = await testClient.mutate({
        mutation: getOneTechMutation,
        variables: { id: tech?.id },
      });
      expect(getResult.data?.getTechnology).toEqual(testTech);
      await clearTechnologies();
      await clearSession();
    });
  });

  describe("mutation update() ", () => {
    it("Error: technology name cannot be null", async () => {
      await checkIfUserAuthorized();
      const testEntity: TechInput = {
        name: "React",
        iconName: "picture",
        category: 1,
      };
      const createResult = await mutateCreateTech(testEntity);
      expect(createResult.data?.createTechnology.entity).toEqual(testEntity);
      const tech = await Technology.findOne({
        where: { name: testEntity.name },
      });
      expect(tech).toBeDefined();

      const updateResult = await mutateUpdateTech(
        {
          name: "",
          iconName: "picture",
          category: 1,
        },
        tech?.id!
      );
      expect(updateResult.data?.updateTechnology.errors).toEqual([
        errorsMap().get(Errors.TECH_NAME_EMPTY),
      ]);
      await clearTechnologies();
      await clearSession();
    });

    it("Success: technology name is updated", async () => {
      await checkIfUserAuthorized();
      const testEntity: TechInput = {
        name: "React",
        iconName: "picture",
        category: 1,
      };
      const newEntity: TechInput = {
        name: "Graphql",
        iconName: "picture",
        category: 1,
      };
      const tech = await createOneTechnology(testEntity);
      const updateResult = await mutateUpdateTech(newEntity, tech?.id!);
      expect(updateResult.data?.updateTechnology.entity).toEqual(newEntity);
      await clearTechnologies();
      await clearSession();
    });
  });

  describe("mutation delete()", () => {
    it("Error: technology with such id is not found", async () => {
      await checkIfUserAuthorized();
      const deleteResult = await mutateDeleteTech(-1);
      expect(deleteResult.data?.deleteTechnology).toEqual(false);
      await clearSession();
    });

    it("Success: technology has been deleted", async () => {
      await checkIfUserAuthorized();
      const tech: TechInput = {
        name: "React",
        iconName: "picture",
        category: 1,
      };
      const technology = await createOneTechnology(tech);
      await Technology.update(
        { id: technology?.id },
        { iconName: "icon", category: 1 }
      );
      const deleteResult = await mutateDeleteTech(technology?.id!);
      expect(deleteResult.data?.deleteTechnology).toEqual(true);
      await clearSession();
    });
  });
});

describe("ProjectResolver testing", () => {
  describe("query getProjects()", () => {
    it("Warning: no exist projects", async () => {
      await checkIfUserAuthorized();
      const result = await queryGetProjects();

      expect(result.data?.getProjects).toEqual([]);
      await clearSession();
    });
    it("Success: current projects have been returned", async () => {
      await checkIfUserAuthorized();
      const testProject: ProjectInput = {
        name: "Test",
        description: "This is test",
        status: "In develop",
        pictures: [],
        technologyNames: [],
        link: { demo: "http://localhost", source_code: "http://localhost" },
      };
      const returnProject = {
        name: testProject.name,
        description: testProject.description,
        status: 0,
        pictures: [],
        technologies: [],
        link: { demo: "http://localhost", source_code: "http://localhost" },
      };
      const createResult = await mutateCreateProject(testProject);
      expect(createResult.data?.createProject.entity).toEqual(returnProject);
      const result = await queryGetProjects();
      expect(result.data?.getProjects).toEqual([returnProject]);
      await clearProjects();
      await clearTechnologies();
      await clearSession();
    });
  });

  describe("query getProject()", () => {
    it("Error: project with such id is not exist", async () => {
      await checkIfUserAuthorized();
      const result = await queryGetProject(1);
      expect(result.data?.getProject).toEqual(null);
      await clearSession();
    });

    it("Success: project has been returned", async () => {
      await checkIfUserAuthorized();
      const testProject: ProjectInput = {
        name: "Test",
        description: "This is test",
        status: "In develop",
        pictures: [],
        technologyNames: [],
        link: { demo: "http://localhost", source_code: "http://localhost" },
      };
      const returnProject = {
        name: "Test",
        description: "This is test",
        status: 0,
        pictures: [],
        technologies: [],
        link: { demo: "http://localhost", source_code: "http://localhost" },
      };
      const createResult = await mutateCreateProject(testProject);
      expect(createResult.data?.createProject.entity).toEqual(returnProject);
      const project = await Project.findOne({
        where: { name: testProject.name },
      });
      expect(project).toBeDefined();
      const result = await queryGetProject(project!.id);
      expect(result.data?.getProject).toEqual(returnProject);
      await clearProjects();
      await clearTechnologies();
      await clearSession();
    });
  });

  describe("mutate createProject()", () => {
    it("Error: name cannot be null", async () => {
      await checkIfUserAuthorized();
      const testProject: ProjectInput = {
        name: "",
        description: "This is test",
        status: "In develop",
        pictures: [],
        technologyNames: [],
        link: { demo: "http://localhost", source_code: "http://localhost" },
      };
      const createProjectResult = await mutateCreateProject(testProject);
      expect(createProjectResult.data?.createProject.errors).toEqual([
        errorsMap().get(Errors.PROJECT_NAME_IS_EMPTY),
      ]);
      await clearSession();
    });
    it("Success: project has been created", async () => {
      await checkIfUserAuthorized();
      const testTech: TechInput = {
        name: "React",
        iconName: "picture",
        category: 1,
      };
      const tech = await createOneTechnology(testTech);
      const testProject: ProjectInput = {
        name: "Test",
        description: "This is test",
        status: "In develop",
        pictures: [{ url: "https://picture.com/5", primary: 1 }],
        technologyNames: [tech.name],
        link: { demo: "http://localhost", source_code: "http://localhost" },
      };
      const returnProject = {
        name: "Test",
        description: "This is test",
        status: 0,
        pictures: [{ url: testProject.pictures[0].url, primary: 1 }],
        technologies: [
          {
            name: tech.name,
            iconName: testTech.iconName,
            category: testTech.category,
          },
        ],
        link: { demo: "http://localhost", source_code: "http://localhost" },
      };
      const createProjectResult = await mutateCreateProject(testProject);
      expect(createProjectResult.data?.createProject.entity).toEqual(
        returnProject
      );
      await clearProjects();
      await clearTechnologies();
      await clearSession();
    });
  });

  describe("mutate updateProject()", () => {
    it("Error: name cannot be null", async () => {
      await checkIfUserAuthorized();
      const testProject: ProjectInput = {
        name: "Test",
        description: "This is test",
        status: "In develop",
        pictures: [],
        technologyNames: [],
        link: { demo: "http://localhost", source_code: "http://localhost" },
      };
      const returnProject = {
        name: "Test",
        description: "This is test",
        status: 0,
        pictures: [],
        technologies: [],
        link: { demo: "http://localhost", source_code: "http://localhost" },
      };
      const createProjectResult = await mutateCreateProject(testProject);
      expect(createProjectResult.data?.createProject.entity).toEqual(
        returnProject
      );
      const project = await Project.findOne({
        where: { name: testProject.name },
      });
      expect(project).toBeDefined();
      const updateProjectResult = await mutateUpdateProject(project!.id, {
        ...testProject,
        name: "",
      });
      expect(updateProjectResult.data?.updateProject.errors).toEqual([
        errorsMap().get(Errors.PROJECT_NAME_IS_EMPTY),
      ]);
      await clearProjects();
      await clearTechnologies();
      await clearSession();
    });

    it("Success: add few pictures", async () => {
      await checkIfUserAuthorized();
      const testProject: ProjectInput = {
        name: "Test",
        description: "This is test",
        status: "In develop",
        pictures: [],
        technologyNames: [],
        link: { demo: "http://localhost", source_code: "http://localhost" },
      };
      const returnProject = {
        name: "Test",
        description: "This is test",
        status: 0,
        pictures: [],
        technologies: [],
        link: { demo: "http://localhost", source_code: "http://localhost" },
      };
      const createProjectResult = await mutateCreateProject(testProject);
      expect(createProjectResult.data?.createProject.entity).toEqual(
        returnProject
      );
      const project = await Project.findOne({
        where: { name: testProject.name },
        relations: ["pictures"],
      });
      expect(project).toBeDefined();
      const updateProjectResult = await mutateUpdateProject(project!.id, {
        ...testProject,
        pictures: [
          { url: "http://picture.com/1" },
          { url: "http://picture.com/2" },
        ],
      });
      expect(updateProjectResult.data?.updateProject.entity).toEqual({
        ...returnProject,
        pictures: [
          { url: "http://picture.com/1" },
          { url: "http://picture.com/2" },
        ],
      });
      await clearProjects();
      await clearTechnologies();
      await clearSession();
    });

    it("Success: add few technologies", async () => {
      await checkIfUserAuthorized();
      const testProject: ProjectInput = {
        name: "Test",
        description: "This is test",
        status: "In develop",
        pictures: [],
        technologyNames: [],
        link: { demo: "http://localhost", source_code: "http://localhost" },
      };
      const returnProject = {
        name: "Test",
        description: "This is test",
        status: 0,
        pictures: [],
        technologies: [],
        link: { demo: "http://localhost", source_code: "http://localhost" },
      };
      const technology1 = await createOneTechnology({
        name: "React",
        iconName: "picture",
        category: 1,
      });
      const technology2 = await createOneTechnology({
        name: "Graphql",
        iconName: "another",
        category: 1,
      });
      const createProjectResult = await mutateCreateProject(testProject);
      expect(createProjectResult.data?.createProject.entity).toEqual(
        returnProject
      );
      const project = await Project.findOne({
        where: { name: testProject.name },
        relations: ["technologies"],
      });
      expect(project).toBeDefined();
      const updateProjectResult = await mutateUpdateProject(project!.id, {
        ...testProject,
        technologyNames: [technology1.name, technology2.name],
      });
      expect(updateProjectResult.data?.updateProject.entity).toEqual({
        ...returnProject,
        technologies: [{ name: technology1.name }, { name: technology2.name }],
      });
      await clearProjects();
      await clearTechnologies();
      await clearSession();
    });
  });

  describe("mutate deleteProject()", () => {
    it("Error: no project with such id", async () => {
      await checkIfUserAuthorized();
      const result = await mutateDeleteProject(1);
      expect(result.data?.deleteProject).toEqual(false);
      await clearSession();
    });

    it("Success: project has been deleted", async () => {
      await checkIfUserAuthorized();
      const testProject: ProjectInput = {
        name: "Test",
        description: "This is test",
        status: "In develop",
        pictures: [],
        technologyNames: [],
        link: { demo: "http://localhost", source_code: "http://localhost" },
      };
      const returnProject = {
        name: "Test",
        description: "This is test",
        status: 0,
        pictures: [],
        technologies: [],
        link: { demo: "http://localhost", source_code: "http://localhost" },
      };
      const createProjectResult = await mutateCreateProject(testProject);
      expect(createProjectResult.data?.createProject.entity).toEqual(
        returnProject
      );
      const project = await Project.findOne({
        where: { name: testProject.name },
      });
      expect(project).toBeDefined();
      const result = await mutateDeleteProject(project!.id);
      expect(result.data?.deleteProject).toEqual(true);
      await clearProjects();
      await clearTechnologies();
      await clearSession();
    });
  });
});
