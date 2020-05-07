import React, { ReactElement } from "react";
import GraphQLForm from "../../lib/form/GraphQLForm";
import { createNestedMutation } from "../../lib/utils";
import { browserHistory } from "../../config";
import { inputClientWithContactCreate } from "./info";

interface Props {}

export default function create({}: Props): ReactElement {
  return (
    <GraphQLForm
      history={browserHistory}
      span={8}
      label
      inputs={inputClientWithContactCreate}
      mutation={createNestedMutation(
        "create_nested_client",
        "CreateClientInput!",
        "client"
      )}
    />
  );
}
