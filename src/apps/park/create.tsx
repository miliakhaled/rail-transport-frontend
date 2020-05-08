import React, { ReactElement } from "react";
import GraphQLForm from "../../lib/form/GraphQLForm";
import { createMutation } from "../../lib/utils";

import { browserHistory } from "../../config";
import { parkInputs as inputs } from "./info";
interface Props {}
export default function create({}: Props): ReactElement {
  return (
    <GraphQLForm
      title="Nouvelle Véhicule"
      span={12}
      history={browserHistory}
      inputs={inputs}
      initialValues={{}}
      mutation={createMutation("create_nested_client", "CreateClientInput!")}
    />
  );
}
