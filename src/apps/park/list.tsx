import React, { ReactElement } from "react";
import {parkColumns as columns} from "./info"
import {parkFilters as filters} from "./info"
import { browserHistory } from "../../config";
import GraphQLTableView from "../../lib/views/GraphQLTableView";
import { deleteMutation,createMutation } from "../../lib/utils";
interface Props {}
export default function list({}: Props): ReactElement {
  return (
<div>
 <GraphQLTableView
 columns={columns}
filters={filters}
createLink=""
actions={[]}
initVariables={{}}
deleteColumn={false}
updateColumn={false}
history={browserHistory}
graphql={{
all:"" ,
delete: deleteMutation(""),
 update: createMutation("", ""),
 }}
/>
 </div>
);}
