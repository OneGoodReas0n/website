import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  getTechnology?: Maybe<Technology>;
  getTechnologies: Array<Technology>;
  getProject?: Maybe<Project>;
  getProjects: Array<Project>;
};


export type QueryGetTechnologyArgs = {
  id: Scalars['Float'];
};


export type QueryGetProjectArgs = {
  id: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  email: Scalars['String'];
};

export type Technology = {
  __typename?: 'Technology';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  name: Scalars['String'];
  icon?: Maybe<Icon>;
  category?: Maybe<Category>;
};

export type Icon = {
  __typename?: 'Icon';
  id: Scalars['Int'];
  name: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int'];
  name: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  color?: Maybe<Scalars['String']>;
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  status: Scalars['Float'];
  pictures?: Maybe<Array<Picture>>;
  technologies?: Maybe<Array<Technology>>;
};

export type Picture = {
  __typename?: 'Picture';
  id: Scalars['Int'];
  url: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  primary?: Maybe<Scalars['Float']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  createTechnology?: Maybe<TechResponse>;
  updateTechnology?: Maybe<TechResponse>;
  deleteTechnology?: Maybe<Scalars['Boolean']>;
  createProject: ProjectResponse;
  updateProject: ProjectResponse;
  deleteProject: Scalars['Boolean'];
};


export type MutationLoginArgs = {
  input: UserInput;
};


export type MutationRegisterArgs = {
  input: UserInput;
};


export type MutationCreateTechnologyArgs = {
  input: TechInput;
};


export type MutationUpdateTechnologyArgs = {
  input: TechInput;
  id: Scalars['Float'];
};


export type MutationDeleteTechnologyArgs = {
  id: Scalars['Float'];
};


export type MutationCreateProjectArgs = {
  input: ProjectInput;
};


export type MutationUpdateProjectArgs = {
  id: Scalars['Float'];
  input: ProjectInput;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['Float'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  entity?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  name: Scalars['String'];
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type TechResponse = {
  __typename?: 'TechResponse';
  errors?: Maybe<Array<FieldError>>;
  entity?: Maybe<Technology>;
};

export type TechInput = {
  name: Scalars['String'];
  category: CategoryInput;
  icon: Scalars['String'];
};

export type CategoryInput = {
  name: Scalars['String'];
  color?: Maybe<Scalars['String']>;
};

export type ProjectResponse = {
  __typename?: 'ProjectResponse';
  errors?: Maybe<Array<FieldError>>;
  entity?: Maybe<Project>;
};

export type ProjectInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  pictures?: Maybe<Array<PictureObj>>;
  technologyNames?: Maybe<Array<Scalars['String']>>;
};

export type PictureObj = {
  url: Scalars['String'];
  primary?: Maybe<Scalars['Float']>;
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'name' | 'field' | 'message'>
);

export type RegularProjectFragment = (
  { __typename?: 'Project' }
  & Pick<Project, 'name' | 'description' | 'status'>
  & { pictures?: Maybe<Array<(
    { __typename?: 'Picture' }
    & Pick<Picture, 'url' | 'primary'>
  )>>, technologies?: Maybe<Array<(
    { __typename?: 'Technology' }
    & Pick<Technology, 'name'>
    & { icon?: Maybe<(
      { __typename?: 'Icon' }
      & Pick<Icon, 'name'>
    )>, category?: Maybe<(
      { __typename?: 'Category' }
      & Pick<Category, 'name' | 'color'>
    )> }
  )>> }
);

export type RegularTechnologyFragment = (
  { __typename?: 'Technology' }
  & Pick<Technology, 'id' | 'name'>
  & { icon?: Maybe<(
    { __typename?: 'Icon' }
    & Pick<Icon, 'name'>
  )>, category?: Maybe<(
    { __typename?: 'Category' }
    & Pick<Category, 'name' | 'color'>
  )> }
);

export type CreateProjectMutationMutationVariables = Exact<{
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  pictures?: Maybe<Array<PictureObj>>;
  technologyNames?: Maybe<Array<Scalars['String']>>;
}>;


export type CreateProjectMutationMutation = (
  { __typename?: 'Mutation' }
  & { createProject: (
    { __typename?: 'ProjectResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, entity?: Maybe<(
      { __typename?: 'Project' }
      & RegularProjectFragment
    )> }
  ) }
);

export type CreateTechnologyMutationVariables = Exact<{
  name: Scalars['String'];
  icon: Scalars['String'];
  category: CategoryInput;
}>;


export type CreateTechnologyMutation = (
  { __typename?: 'Mutation' }
  & { createTechnology?: Maybe<(
    { __typename?: 'TechResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, entity?: Maybe<(
      { __typename?: 'Technology' }
      & RegularTechnologyFragment
    )> }
  )> }
);

export type DeleteProjectMutationMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteProjectMutationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteProject'>
);

export type DeleteTechnologyMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteTechnologyMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTechnology'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, entity?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'email'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type UpdateProjectMutationMutationVariables = Exact<{
  id: Scalars['Float'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  pictures?: Maybe<Array<PictureObj>>;
  technologyNames?: Maybe<Array<Scalars['String']>>;
}>;


export type UpdateProjectMutationMutation = (
  { __typename?: 'Mutation' }
  & { updateProject: (
    { __typename?: 'ProjectResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, entity?: Maybe<(
      { __typename?: 'Project' }
      & RegularProjectFragment
    )> }
  ) }
);

export type UpdateTechnologyMutationVariables = Exact<{
  id: Scalars['Float'];
  name: Scalars['String'];
  icon: Scalars['String'];
  category: CategoryInput;
}>;


export type UpdateTechnologyMutation = (
  { __typename?: 'Mutation' }
  & { updateTechnology?: Maybe<(
    { __typename?: 'TechResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, entity?: Maybe<(
      { __typename?: 'Technology' }
      & RegularTechnologyFragment
    )> }
  )> }
);

export type GetProjectQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetProjectQuery = (
  { __typename?: 'Query' }
  & { getProject?: Maybe<(
    { __typename?: 'Project' }
    & RegularProjectFragment
  )> }
);

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = (
  { __typename?: 'Query' }
  & { getProjects: Array<(
    { __typename?: 'Project' }
    & RegularProjectFragment
  )> }
);

export type GetTechnologiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTechnologiesQuery = (
  { __typename?: 'Query' }
  & { getTechnologies: Array<(
    { __typename?: 'Technology' }
    & RegularTechnologyFragment
  )> }
);

export type GetTechnologyQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetTechnologyQuery = (
  { __typename?: 'Query' }
  & { getTechnology?: Maybe<(
    { __typename?: 'Technology' }
    & RegularTechnologyFragment
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'email'>
  )> }
);

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  name
  field
  message
}
    `;
export const RegularProjectFragmentDoc = gql`
    fragment RegularProject on Project {
  name
  description
  status
  pictures {
    url
    primary
  }
  technologies {
    name
    icon {
      name
    }
    category {
      name
      color
    }
  }
}
    `;
export const RegularTechnologyFragmentDoc = gql`
    fragment RegularTechnology on Technology {
  id
  name
  icon {
    name
  }
  category {
    name
    color
  }
}
    `;
export const CreateProjectMutationDocument = gql`
    mutation CreateProjectMutation($name: String!, $description: String, $status: String!, $pictures: [PictureObj!], $technologyNames: [String!]) {
  createProject(input: {name: $name, description: $description, status: $status, pictures: $pictures, technologyNames: $technologyNames}) {
    errors {
      ...RegularError
    }
    entity {
      ...RegularProject
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularProjectFragmentDoc}`;
export type CreateProjectMutationMutationFn = Apollo.MutationFunction<CreateProjectMutationMutation, CreateProjectMutationMutationVariables>;

/**
 * __useCreateProjectMutationMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutationMutation, { data, loading, error }] = useCreateProjectMutationMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      status: // value for 'status'
 *      pictures: // value for 'pictures'
 *      technologyNames: // value for 'technologyNames'
 *   },
 * });
 */
export function useCreateProjectMutationMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutationMutation, CreateProjectMutationMutationVariables>) {
        return Apollo.useMutation<CreateProjectMutationMutation, CreateProjectMutationMutationVariables>(CreateProjectMutationDocument, baseOptions);
      }
export type CreateProjectMutationMutationHookResult = ReturnType<typeof useCreateProjectMutationMutation>;
export type CreateProjectMutationMutationResult = Apollo.MutationResult<CreateProjectMutationMutation>;
export type CreateProjectMutationMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutationMutation, CreateProjectMutationMutationVariables>;
export const CreateTechnologyDocument = gql`
    mutation CreateTechnology($name: String!, $icon: String!, $category: CategoryInput!) {
  createTechnology(input: {name: $name, icon: $icon, category: $category}) {
    errors {
      ...RegularError
    }
    entity {
      ...RegularTechnology
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularTechnologyFragmentDoc}`;
export type CreateTechnologyMutationFn = Apollo.MutationFunction<CreateTechnologyMutation, CreateTechnologyMutationVariables>;

/**
 * __useCreateTechnologyMutation__
 *
 * To run a mutation, you first call `useCreateTechnologyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTechnologyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTechnologyMutation, { data, loading, error }] = useCreateTechnologyMutation({
 *   variables: {
 *      name: // value for 'name'
 *      icon: // value for 'icon'
 *      category: // value for 'category'
 *   },
 * });
 */
export function useCreateTechnologyMutation(baseOptions?: Apollo.MutationHookOptions<CreateTechnologyMutation, CreateTechnologyMutationVariables>) {
        return Apollo.useMutation<CreateTechnologyMutation, CreateTechnologyMutationVariables>(CreateTechnologyDocument, baseOptions);
      }
export type CreateTechnologyMutationHookResult = ReturnType<typeof useCreateTechnologyMutation>;
export type CreateTechnologyMutationResult = Apollo.MutationResult<CreateTechnologyMutation>;
export type CreateTechnologyMutationOptions = Apollo.BaseMutationOptions<CreateTechnologyMutation, CreateTechnologyMutationVariables>;
export const DeleteProjectMutationDocument = gql`
    mutation DeleteProjectMutation($id: Float!) {
  deleteProject(id: $id)
}
    `;
export type DeleteProjectMutationMutationFn = Apollo.MutationFunction<DeleteProjectMutationMutation, DeleteProjectMutationMutationVariables>;

/**
 * __useDeleteProjectMutationMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutationMutation, { data, loading, error }] = useDeleteProjectMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProjectMutationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutationMutation, DeleteProjectMutationMutationVariables>) {
        return Apollo.useMutation<DeleteProjectMutationMutation, DeleteProjectMutationMutationVariables>(DeleteProjectMutationDocument, baseOptions);
      }
export type DeleteProjectMutationMutationHookResult = ReturnType<typeof useDeleteProjectMutationMutation>;
export type DeleteProjectMutationMutationResult = Apollo.MutationResult<DeleteProjectMutationMutation>;
export type DeleteProjectMutationMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutationMutation, DeleteProjectMutationMutationVariables>;
export const DeleteTechnologyDocument = gql`
    mutation DeleteTechnology($id: Float!) {
  deleteTechnology(id: $id)
}
    `;
export type DeleteTechnologyMutationFn = Apollo.MutationFunction<DeleteTechnologyMutation, DeleteTechnologyMutationVariables>;

/**
 * __useDeleteTechnologyMutation__
 *
 * To run a mutation, you first call `useDeleteTechnologyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTechnologyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTechnologyMutation, { data, loading, error }] = useDeleteTechnologyMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTechnologyMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTechnologyMutation, DeleteTechnologyMutationVariables>) {
        return Apollo.useMutation<DeleteTechnologyMutation, DeleteTechnologyMutationVariables>(DeleteTechnologyDocument, baseOptions);
      }
export type DeleteTechnologyMutationHookResult = ReturnType<typeof useDeleteTechnologyMutation>;
export type DeleteTechnologyMutationResult = Apollo.MutationResult<DeleteTechnologyMutation>;
export type DeleteTechnologyMutationOptions = Apollo.BaseMutationOptions<DeleteTechnologyMutation, DeleteTechnologyMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(input: {email: $email, password: $password}) {
    errors {
      field
      message
    }
    entity {
      email
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const UpdateProjectMutationDocument = gql`
    mutation UpdateProjectMutation($id: Float!, $name: String!, $description: String, $status: String!, $pictures: [PictureObj!], $technologyNames: [String!]) {
  updateProject(id: $id, input: {name: $name, description: $description, status: $status, pictures: $pictures, technologyNames: $technologyNames}) {
    errors {
      ...RegularError
    }
    entity {
      ...RegularProject
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularProjectFragmentDoc}`;
export type UpdateProjectMutationMutationFn = Apollo.MutationFunction<UpdateProjectMutationMutation, UpdateProjectMutationMutationVariables>;

/**
 * __useUpdateProjectMutationMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutationMutation, { data, loading, error }] = useUpdateProjectMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      status: // value for 'status'
 *      pictures: // value for 'pictures'
 *      technologyNames: // value for 'technologyNames'
 *   },
 * });
 */
export function useUpdateProjectMutationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutationMutation, UpdateProjectMutationMutationVariables>) {
        return Apollo.useMutation<UpdateProjectMutationMutation, UpdateProjectMutationMutationVariables>(UpdateProjectMutationDocument, baseOptions);
      }
export type UpdateProjectMutationMutationHookResult = ReturnType<typeof useUpdateProjectMutationMutation>;
export type UpdateProjectMutationMutationResult = Apollo.MutationResult<UpdateProjectMutationMutation>;
export type UpdateProjectMutationMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutationMutation, UpdateProjectMutationMutationVariables>;
export const UpdateTechnologyDocument = gql`
    mutation UpdateTechnology($id: Float!, $name: String!, $icon: String!, $category: CategoryInput!) {
  updateTechnology(input: {name: $name, icon: $icon, category: $category}, id: $id) {
    errors {
      ...RegularError
    }
    entity {
      ...RegularTechnology
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularTechnologyFragmentDoc}`;
export type UpdateTechnologyMutationFn = Apollo.MutationFunction<UpdateTechnologyMutation, UpdateTechnologyMutationVariables>;

/**
 * __useUpdateTechnologyMutation__
 *
 * To run a mutation, you first call `useUpdateTechnologyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTechnologyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTechnologyMutation, { data, loading, error }] = useUpdateTechnologyMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      icon: // value for 'icon'
 *      category: // value for 'category'
 *   },
 * });
 */
export function useUpdateTechnologyMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTechnologyMutation, UpdateTechnologyMutationVariables>) {
        return Apollo.useMutation<UpdateTechnologyMutation, UpdateTechnologyMutationVariables>(UpdateTechnologyDocument, baseOptions);
      }
export type UpdateTechnologyMutationHookResult = ReturnType<typeof useUpdateTechnologyMutation>;
export type UpdateTechnologyMutationResult = Apollo.MutationResult<UpdateTechnologyMutation>;
export type UpdateTechnologyMutationOptions = Apollo.BaseMutationOptions<UpdateTechnologyMutation, UpdateTechnologyMutationVariables>;
export const GetProjectDocument = gql`
    query getProject($id: Float!) {
  getProject(id: $id) {
    ...RegularProject
  }
}
    ${RegularProjectFragmentDoc}`;

/**
 * __useGetProjectQuery__
 *
 * To run a query within a React component, call `useGetProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
        return Apollo.useQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, baseOptions);
      }
export function useGetProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
          return Apollo.useLazyQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, baseOptions);
        }
export type GetProjectQueryHookResult = ReturnType<typeof useGetProjectQuery>;
export type GetProjectLazyQueryHookResult = ReturnType<typeof useGetProjectLazyQuery>;
export type GetProjectQueryResult = Apollo.QueryResult<GetProjectQuery, GetProjectQueryVariables>;
export const GetProjectsDocument = gql`
    query GetProjects {
  getProjects {
    ...RegularProject
  }
}
    ${RegularProjectFragmentDoc}`;

/**
 * __useGetProjectsQuery__
 *
 * To run a query within a React component, call `useGetProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
        return Apollo.useQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, baseOptions);
      }
export function useGetProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          return Apollo.useLazyQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, baseOptions);
        }
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<typeof useGetProjectsLazyQuery>;
export type GetProjectsQueryResult = Apollo.QueryResult<GetProjectsQuery, GetProjectsQueryVariables>;
export const GetTechnologiesDocument = gql`
    query GetTechnologies {
  getTechnologies {
    ...RegularTechnology
  }
}
    ${RegularTechnologyFragmentDoc}`;

/**
 * __useGetTechnologiesQuery__
 *
 * To run a query within a React component, call `useGetTechnologiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTechnologiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTechnologiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTechnologiesQuery(baseOptions?: Apollo.QueryHookOptions<GetTechnologiesQuery, GetTechnologiesQueryVariables>) {
        return Apollo.useQuery<GetTechnologiesQuery, GetTechnologiesQueryVariables>(GetTechnologiesDocument, baseOptions);
      }
export function useGetTechnologiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTechnologiesQuery, GetTechnologiesQueryVariables>) {
          return Apollo.useLazyQuery<GetTechnologiesQuery, GetTechnologiesQueryVariables>(GetTechnologiesDocument, baseOptions);
        }
export type GetTechnologiesQueryHookResult = ReturnType<typeof useGetTechnologiesQuery>;
export type GetTechnologiesLazyQueryHookResult = ReturnType<typeof useGetTechnologiesLazyQuery>;
export type GetTechnologiesQueryResult = Apollo.QueryResult<GetTechnologiesQuery, GetTechnologiesQueryVariables>;
export const GetTechnologyDocument = gql`
    query GetTechnology($id: Float!) {
  getTechnology(id: $id) {
    ...RegularTechnology
  }
}
    ${RegularTechnologyFragmentDoc}`;

/**
 * __useGetTechnologyQuery__
 *
 * To run a query within a React component, call `useGetTechnologyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTechnologyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTechnologyQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTechnologyQuery(baseOptions?: Apollo.QueryHookOptions<GetTechnologyQuery, GetTechnologyQueryVariables>) {
        return Apollo.useQuery<GetTechnologyQuery, GetTechnologyQueryVariables>(GetTechnologyDocument, baseOptions);
      }
export function useGetTechnologyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTechnologyQuery, GetTechnologyQueryVariables>) {
          return Apollo.useLazyQuery<GetTechnologyQuery, GetTechnologyQueryVariables>(GetTechnologyDocument, baseOptions);
        }
export type GetTechnologyQueryHookResult = ReturnType<typeof useGetTechnologyQuery>;
export type GetTechnologyLazyQueryHookResult = ReturnType<typeof useGetTechnologyLazyQuery>;
export type GetTechnologyQueryResult = Apollo.QueryResult<GetTechnologyQuery, GetTechnologyQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;