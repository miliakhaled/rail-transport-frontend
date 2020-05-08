import * as queryBuilder from "gql-query-builder";
import gql from "graphql-tag";
import _ from "lodash";
import { DocumentNode } from "graphql";

export const deleteMutation = (operation: string) => {
  return gql(
    queryBuilder.mutation({
      operation,
      variables: { id: { type: "ID!" } },
      fields: ["ok", { errors: ["field", "messages"] }],
    }).query
  );
};

/**
 * generate Graphql mutation.
 * @author Milia
 * @param {string} operation - The name of the mutation ex: create_client.
 * @param {string} author - The type of mutation ex : CreateGenericClient!.
 * @param {string} input  The input object name ex: new_client @default "input".
 */
export const createMutation = (
  operation: string,
  type: string,
  input = "input"
) => {
  return gql(
    queryBuilder.mutation({
      operation: `response:${operation}`,
      variables: { [input]: { type } },
      fields: ["ok", { errors: ["field", "messages"] }],
    }).query
  );
};
export const simple_mutation = (
  operation: string,
  type: string,
  input: string = "input"
) => {
  return gql(
    queryBuilder.mutation({
      operation: `response:${operation}`,
      variables: { [input]: { type } },
      // fields: ["ok", { errors: ["field", "messages"] }]
    }).query
  );
};
export const createNestedMutation = (
  operation: string,
  type: string,
  response: string,
  input: string = "input"
) => {
  return gql(
    queryBuilder.mutation({
      operation: `response:${operation}`,
      variables: { [input]: { type } },
      fields: [{ [`ok:${response}`]: ["id"] }],
    }).query
  );
};
export const createNestedUpdateMutation = (
  operation: string,
  type: string,
  response: string,
  input = "input"
) => {
  return gql(
    queryBuilder.mutation({
      operation: `response:${operation}`,
      variables: { [input]: { type }, id: { type: "ID!" } },
      fields: [{ [`ok:${response}`]: ["id"] }],
    }).query
  );
};

export const simple_query = (
  operation: string,
  fields: (string | object)[] = ["designation"],
  variables?: object
): DocumentNode => {
  return gql(
    queryBuilder.query({
      operation: `response:${operation}`,
      variables,
      fields: ["id", ...fields],
    }).query
  );
};
