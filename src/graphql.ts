import { BatchHttpLink } from "apollo-link-batch-http";
import { ApolloLink } from "apollo-boost";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { ServerError, ServerParseError } from "apollo-link-http-common";
import { serverUrl } from "./config";

export const errorLink = onError(
  ({ graphQLErrors, networkError, response }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path, nodes }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
        console.log(locations);
      });
    if (networkError) console.log(networkError);
    if (
      networkError &&
      (networkError as ServerError).result &&
      (networkError as ServerError).result.map
    )
      (networkError as ServerError).result.map((e: any) => console.log(e));

    if (networkError && (networkError as ServerError).statusCode === 401) {
      // remove cached token on 401 from the server
      // window.location.replace('/login');
    }
  }
);
// Creating the link to the graphql server
const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },

  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};
const authLink: ApolloLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // if (!token) console.log('ldùsmdlùsdlm');

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  };
});
const authMiddleware: ApolloLink = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.getItem("token");
  if (token == null) window.location.replace("/");
  operation.setContext({
    headers: {
      authorization: token ? `JWT ${token}` : "",
    },
  });

  return forward(operation);
});
const link: BatchHttpLink = new BatchHttpLink({
  uri: serverUrl,
  credentials: "same-origin",
});
// const resetToken = onError(({ response, networkError }) => {
//   if (networkError && networkError.statusCode === 401) {
//     // remove cached token on 401 from the server
//     localStorage.clear();
//   }
// });
// Creating the client
export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),

  link: ApolloLink.from([errorLink, authLink, link]), // authLink,
  //defaultOptions,
});
