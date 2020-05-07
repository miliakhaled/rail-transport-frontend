import React, { ReactElement, useState } from "react";
import { ColumnsType } from "antd/lib/table";
import { Table, Modal, Row, Col, Button } from "antd";
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
import RLTable from "./RLTable";

export interface QueryType {
  all: DocumentNode;
  delete?: DocumentNode | any;
  update?: DocumentNode | any;
}
const { confirm } = Modal;
export interface GraphQLTableProps {
  title: string;
  columns: ColumnsType;
  graphql: QueryType;
  createLink?: string;
  resultTitle?: string;
  updateLink?: string;
  nested?: boolean;
  isUpdatable?: (e: any) => boolean;
  isDeletable?: (e: any) => boolean;
  expand?: any;
  actions?: ColumnsType;
  updateColumn?: boolean;
  deleteColumn?: boolean;
  history?: RouteComponentProps["history"];
  initVariables?: OperationVariables;
  // filters?: any[];
  updateInputs?: any[];
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
  const [selected, setSelected] = useState(null);
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
  try {
    [deleteItem] = useMutation(graphql.delete);
  } catch (e) {
    //console.log("no delete feature available ");
  }
  const fetchMoreData = (rowpage: number, page: number) =>
    fetchMore({
      variables: {
        offset: data.length,
        limit: rowpage * page,
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
        onDelete={deleteItem}
        //onUpdate={}
        refetch={refetch}
        fetchMore={fetchMore}
        updateColumn={updateColumn}
        updateLink={updateLink}
      />
      {/* <Table
        rowKey="id"
        expandable={expand}
        loading={loading}
        columns={allColumns}
        dataSource={_.get(data, `response.results`, []).slice(
          page * rowPerPage,
          page * rowPerPage + rowPerPage
        )}
        pagination={{
          total: _.get(data, "response.totalCount", 0),
          showSizeChanger: true,
          pageSize: rowPerPage,
          pageSizeOptions: ["10", "20", "40"],
          onShowSizeChange: (page, next) => {
            onRowPerPageChange(next);
          },
          onChange: (p, rowpage: number) => {
            fetchMore({
              variables: {
                offset: data.response.results.length,
                limit: rowpage * p,
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
            onPageChange(p - 1);
          },
        }}
        bordered
        title={() => <div>{title}</div>}
        size="middle"
      /> */}
    </TableContext.Provider>
  );
};
export default GraphQLTable;
