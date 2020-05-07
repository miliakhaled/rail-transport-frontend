import React, { ReactElement } from "react";
import GraphQLTableView from "../../lib/views/GraphQLTableView";
import { FETCH_CLIENTS } from "./graphql";
import { clientColumns, clientFilters } from "./info";
import { browserHistory } from "../../config";

interface Props {}

export default function list({}: Props): ReactElement {
  return (
    <div>
      <GraphQLTableView
        history={browserHistory}
        createLink="/clients/new"
        deleteColumn={false}
        columns={clientColumns}
        filters={clientFilters}
        graphql={{
          all: FETCH_CLIENTS,
        }}
      />
    </div>
  );
}
