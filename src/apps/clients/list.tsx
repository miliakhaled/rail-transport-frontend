import React, { ReactElement } from "react";
import GraphQLTableView from "../../lib/views/GraphQLTableView";
import { FETCH_CLIENTS } from "./graphql";
import { clientColumns, clientFilters } from "./info";
import { browserHistory } from "../../config";
import { deleteMutation } from "../../lib/utils";
import { EyeFilled } from "@ant-design/icons";
interface Props {}

export default function list({}: Props): ReactElement {
  return (
    <div>
      <GraphQLTableView
        title="List des clients"
        history={browserHistory}
        createLink="/clients/new"
        columns={clientColumns}
        filters={clientFilters}
        graphql={{
          all: FETCH_CLIENTS,
          delete: deleteMutation("delete_client"),
        }}
      />
    </div>
  );
}
