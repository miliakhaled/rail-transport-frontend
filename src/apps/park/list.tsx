import React, { ReactElement } from "react";
import { parkColumns as columns } from "./info";
import { parkFilters as filters } from "./info";
import { browserHistory } from "../../config";
import GraphQLTableView from "../../lib/views/GraphQLTableView";
import { deleteMutation, createMutation } from "../../lib/utils";
import gql from "graphql-tag";
import { ALL_ENGINES } from "./graphql/queries";
interface Props {}
export default function list({}: Props): ReactElement {
  return (
    <div>
      <GraphQLTableView
        title="Liste des Véhicules de Rail Logistic"
        columns={columns}
        filters={filters}
        createLink=""
        actions={[]}
        initVariables={{}}
        deleteColumn={false}
        updateColumn={false}
        history={browserHistory}
        graphql={{
          all: ALL_ENGINES,
          // delete: deleteMutation(""),
          // update: createMutation("", ""),
        }}
      />
    </div>
  );
}
