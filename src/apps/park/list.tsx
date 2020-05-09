import React, { ReactElement } from "react";
import { parkColumns as columns, parkInputs, parkUpdate } from "./info";
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
        createLink="/park/vehicules/create"
        actions={[]}
        initVariables={{}}
        deleteColumn={false}
        updateColumn={true}
        updateInputs={{
          title: parkUpdate.title,
          fields: parkUpdate.fields,
        }}
        history={browserHistory}
        graphql={{
          all: ALL_ENGINES,
          delete: deleteMutation("delete_engine"),
          update: createMutation("update_engine", "EngineUpdateGenericType!"),
        }}
      />
    </div>
  );
}
