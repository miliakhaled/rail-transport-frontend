import React, { ReactElement } from "react";
import GraphQLForm from "../../../lib/form/GraphQLForm";
import { createNestedMutation, createMutation } from "../../../lib/utils";
import { browserHistory } from "../../../config";
import { contactInput, inputContactWithClient } from "./info";
interface Props {}
export default function create({}: Props): ReactElement {
  return (
    <GraphQLForm
      label={true}
      span={12}
      history={browserHistory}
      inputs={inputContactWithClient}
      initialValues={{}}
      mutation={createMutation("create_contact", "ContactCreateGenericType!")}
    />
  );
}
