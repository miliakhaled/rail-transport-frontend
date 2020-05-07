import React, { ReactElement } from "react";
import { contactColumns as columns } from "./info";
import { contactFilters as filters } from "./info";
import { browserHistory } from "../../../config";
import GraphQLTableView from "../../../lib/views/GraphQLTableView";
import { deleteMutation, createMutation } from "../../../lib/utils";
import gql from "graphql-tag";
import { ALL_CONTACTS } from "./graphql/queries";
interface Props {}
export default function list({}: Props): ReactElement {
  return (
    <div>
      <GraphQLTableView
        columns={columns}
        filters={filters}
        createLink="/clients/contacts/new"
        actions={[]}
        initVariables={{}}
        deleteColumn={false}
        updateColumn={false}
        history={browserHistory}
        graphql={{
          all: ALL_CONTACTS,
          // delete: deleteMutation(""),
          // update: createMutation("", ""),
        }}
      />
    </div>
  );
}
