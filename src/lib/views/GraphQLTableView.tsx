import React, { ReactElement, useState } from "react";
import { ColumnsType } from "antd/lib/table";
import GraphQLTable, {
  GraphQLTableProps,
  QueryType,
} from "../table/GraphQLTable";
import { RouteComponentProps } from "react-router-dom";
import { OperationVariables } from "apollo-boost";
import { ViewToolbar } from ".";
import { useForm } from "antd/lib/form/util";
import { InputFieldType, InputUnionType } from "../types/FilterTypes";
import { FieldType, FormInputType } from "../form/types";
import { ActionsType } from "../table/RLTable";

interface Props {
  title?: string;
  columns: ColumnsType;
  graphql: QueryType;
  createLink?: string;
  updateLink?: string;
  nested?: boolean;
  isUpdatable?: () => boolean;
  isDeletable?: () => boolean;
  expand?: any;
  actions?: ActionsType[];
  updateColumn?: boolean;
  deleteColumn?: boolean;
  history?: RouteComponentProps["history"];
  initVariables?: OperationVariables;
  filters?: FieldType[];
  updateInputs?: FormInputType;
  resultTitle?: string;
}

export default function GraphQLTableView({
  columns,
  graphql,
  resultTitle = "response",
  filters,
  updateColumn = true,
  deleteColumn = true,
  isUpdatable = () => true,
  isDeletable = () => true,
  actions = [],
  createLink = "",
  expand,
  nested,
  title,
  updateLink,
  history,
  initVariables = {},
  updateInputs,
}: Props): ReactElement {
  const { delete: deleteMutation, all, update } = graphql;
  const [variables, setVariables] = useState<OperationVariables>(initVariables);
  //const [filtersForm] = useForm();
  const onVariablesChange = (value: any) => {
    setVariables({ ...variables, ...value });
  };

  return (
    <div>
      <ViewToolbar
        filters={filters}
        onVariablesChange={onVariablesChange}
        // form={filtersForm}
      />

      <GraphQLTable
        actions={actions}
        title={title}
        columns={columns}
        graphql={{ all, delete: deleteMutation, update }}
        variables={variables}
        createLink={createLink}
        deleteColumn={deleteColumn}
        expand={expand}
        history={history}
        initVariables={initVariables}
        isDeletable={isDeletable}
        isUpdatable={isUpdatable}
        nested={nested}
        resultTitle={resultTitle}
        updateColumn={updateColumn}
        updateLink={updateLink}
        updateInputs={updateInputs}
        //onVariableChange={onVariablesChange}
      ></GraphQLTable>
    </div>
  );
}
