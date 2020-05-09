import React, { ReactElement, useState } from "react";
import { ColumnsType } from "antd/lib/table";
import { Table, Modal, Row, Col, Button, message, Select } from "antd";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { DocumentNode } from "graphql";
import { usePagination } from "./utils";
import { OperationVariables } from "apollo-boost";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
  EditFilled as Edit,
  DeleteOutlined as Delete,
} from "@ant-design/icons";

import {
  PlusOutlined as ADD,
  UploadOutlined as ExportOutlined,
} from "@ant-design/icons";

import _ from "lodash";
import RLTable, { ActionsType } from "./RLTable";
import { FormInputType } from "../form/types";
import { RLForm } from "../form";
import { Store } from "antd/lib/form/interface";

export interface QueryType {
  all: DocumentNode;
  delete?: DocumentNode | any;
  update?: DocumentNode | any;
}
const { confirm } = Modal;
export interface GraphQLTableProps {
  title?: string;
  columns: ColumnsType;
  graphql: QueryType;
  createLink?: string;
  resultTitle?: string;
  updateLink?: string;
  nested?: boolean;
  isUpdatable?: (e: any) => boolean;
  isDeletable?: (e: any) => boolean;
  expand?: any;
  actions?: ActionsType[];
  updateColumn?: boolean;
  deleteColumn?: boolean;
  history?: RouteComponentProps["history"];
  initVariables?: OperationVariables;
  // filters?: any[];
  updateInputs?: FormInputType;
  variables?: OperationVariables;
  // onVariablesChange?: (e: any) => void;
}

export const TableContext = React.createContext({});
const TableProvider = TableContext.Provider;
export const TableConsumer = TableContext.Consumer;

const GraphQLTable: React.FC<GraphQLTableProps> = ({
  //********* Graphql ********* */
  graphql,
  resultTitle = "response",
  variables,
  initVariables = {},
  // onVariablesChange,
  // filters,
  /*************Table*************/
  title,
  columns,
  isDeletable = () => true,
  isUpdatable = () => true,
  actions = [],
  createLink = "",
  deleteColumn = true,
  expand,
  updateColumn = true,
  /**************** Update *************/
  updateInputs,
  updateLink,
  nested,
  /*************Utils **************** */
  history,
}) => {
  //const [variables, setVariables] = useState<OperationVariables>(initVariables);
  const [selected, setSelected] = useState<any>({});
  const [visible, setVisible] = useState(false);
  // const onVariablesChange = (value: any) => {
  //   setVariables({ ...variables, ...value });
  // };

  const pagination = usePagination();

  const { data, loading, fetchMore, refetch } = useQuery(graphql.all, {
    variables: {
      ...variables,
      limit: pagination.rowPerPage,
      offset: 0,
      ...initVariables,
    },
    fetchPolicy: "cache-and-network",
  });

  let deleteItem: any;
  let updateItem: any;
  try {
    [deleteItem] = useMutation(graphql.delete);
  } catch (e) {
    //console.log("no delete feature available ");
  }
  try {
    [updateItem] = useMutation(graphql.update);
  } catch (e) {
    //console.log("no delete feature available ");
  }

  const fetchMoreData = (rowpage: number, page: number) => {
    console.log({
      variables: {
        offset: data && data.response.results.length,
        limit: rowpage * page,
      },
    });

    fetchMore({
      variables: {
        offset: data && data.response.results.length,
        limit: rowpage,
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          response: {
            results: [
              ...prev.response.results,
              ...fetchMoreResult.response.results,
            ],
          },
        });
      },
    });
  };
  // const showDeleteConfirm = (item: { id: string }) => {
  //   confirm({
  //     title: "Voulez-vous supprimer cet objet?",
  //     content: _.get(item, "designation", ""),
  //     okText: "supprimer",
  //     okType: "danger",
  //     cancelText: "annuler",
  //     onOk() {
  //       if (graphql.delete)
  //         deleteItem({ variables: { id: item.id } }).then((d: any) => {
  //           refetch();
  //           onPageChange(0);
  //         });
  //       else alert("cette fonctionalité est desactiver par le devloppeur");
  //     },
  //   });
  // };
  const onDelete = (id: string | number) => {
    deleteItem({ variables: { id } }).then((d: any) => {
      refetch();
    });
  };
  const onUpdate = (values: Store) => {
    const variables = nested
      ? { id: selected.id, input: { ...values } }
      : { input: { ...values, id: selected.id } };

    updateItem({ variables })
      .then((d: any) => {
        message.success("Operation avec succée");
        refetch();
      })
      .catch((e: any) => console.log(e));
  };

  return (
    <TableContext.Provider value={{ refetch }}>
      {/* <UpdateModal
        nested={nested}
        mutation={graphql.update}
        inputs={updateInputs}
        page={page}
        selected={selected}
        visible={visible}
        refetch={refetch}
      /> */}
      <Row justify="end" gutter={[16, 10]}>
        <Col md={12} lg={3} xs={24}>
          <Button
            icon={<ExportOutlined />}
            danger
            // shape="round"
            style={{ width: "100%" }}
          >
            exporter
          </Button>
        </Col>
        <Col md={12} lg={3} xs={24}>
          <Button
            style={{
              width: "100%",
              // backgroundColor: "#5bddc0",
              borderWidth: 0,
              // color: "white",
              padding: 0,
            }}
            type="primary"
            icon={<ADD />}
            onClick={() => history && history.push(createLink)}
          >
            nouveau
          </Button>
        </Col>
      </Row>
      {/* <GraphQLFilter
        onChange={onVariablesChange}
        filters={filters}
        variables={variables}
      ></GraphQLFilter> */}

      <br />
      <RLTable
        onSelect={setSelected}
        onUpdate={onUpdate}
        fetchMoreData={fetchMoreData}
        title={title}
        pagination={pagination}
        data={_.get(data, `response.results`, [])}
        count={_.get(data, `${resultTitle}.totalCount`, 0)}
        columns={columns}
        actions={actions}
        isDeletable={isDeletable}
        isUpdatable={isUpdatable}
        history={history}
        deleteColumn={deleteColumn}
        loading={loading}
        onDelete={onDelete}
        //onUpdate={}
        refetch={refetch}
        fetchMore={fetchMore}
        updateColumn={updateColumn}
        updateLink={updateLink}
        updateInputs={updateInputs}
      />
    </TableContext.Provider>
  );
};
export default GraphQLTable;
