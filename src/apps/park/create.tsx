import React, { ReactElement } from 'react';
import GraphQLForm from "../../lib/form/GraphQLForm";
import { creatMutation } from "../../lib/utils";
import { browserHistory } from "../../config";
import {parkInputs as inputs} from "./info"
interface Props {}
export default function create({}: Props): ReactElement {
return (
<GraphQLForm
span={12}
history={browserHistory}
inputs={inputs}
initialValues={{}}
mutation={creatMutation("create_nested_client","CreateClientInput!" )}
/>
  );
}
