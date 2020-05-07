import React, { ReactElement, useState } from "react";
import Table, { ColumnsType } from "antd/lib/table";
import { OperationVariables, ApolloQueryResult } from "apollo-boost";
import { ExecutionResult } from "graphql";
import { Button } from "antd";
import {
  EditFilled as Edit,
  DeleteOutlined as Delete,
} from "@ant-design/icons";
import { RouteComponentProps } from "react-router-dom";
import { PaginationType } from "./utils";
import confirm from "antd/lib/modal/confirm";
import { ObservableQueryFields } from "@apollo/react-common/lib/types/types";
import _ from "lodash";
interface Props {
  onDelete?: (variables: OperationVariables) => Promise<ExecutionResult<any>>;
  onUpdate?: (variables: OperationVariables) => Promise<ExecutionResult<any>>;
  data: object[];
  columns: ColumnsType<object>;
  actions?: ColumnsType<object>;
  loading?: boolean;
  updateColumn?: boolean;
  deleteColumn?: boolean;
  isUpdatable?: (e: any) => boolean;
  isDeletable?: (e: any) => boolean;
  updateLink?: string;
  history?: RouteComponentProps["history"];
  refetch?: () => Promise<ApolloQueryResult<any>> | void;
  pagination: PaginationType;
  fetchMore?: (v: any) => void;
  title: string;
  fetchMoreData?: (rowpage: number, page: number) => void;
  count: number;
}
/**
 *
 * Table to render data with delete and update features
 */
export default function RLTable({
  data = [],
  onDelete,
  onUpdate,
  history,
  loading,
  actions = [],
  columns,
  updateColumn = true,
  deleteColumn = true,
  isUpdatable = () => true,
  isDeletable = () => true,
  updateLink,
  refetch = () => {},
  pagination,
  fetchMoreData,
  title,
  count,
}: Props): ReactElement {
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);
  const allColumns: ColumnsType<object> = [...columns, ...actions];
  const { onPageChange, onRowPerPageChange, page, rowPerPage } = pagination;
  const showDeleteConfirm = (item: { id: string }) => {
    confirm({
      title: "Voulez-vous supprimer cet objet?",
      content: _.get(item, "designation", ""),
      okText: "supprimer",
      okType: "danger",
      cancelText: "annuler",
      onOk() {
        //if (graphql.delete)
        onDelete &&
          onDelete({ variables: { id: item.id } })
            .then((d: any) => {
              refetch();
              onPageChange(0);
            })
            .catch((e) => {
              console.log(e);
              alert("operation echouée");
            });
        //else alert("cette fonctionalité est desactiver par le devloppeur");
      },
    });
  };
  if (updateColumn)
    allColumns.push({
      render: (e) =>
        isUpdatable(e) ? (
          <Button
            icon={<Edit />}
            onClick={() => {
              if (updateLink) history && history.push(updateLink + `/${e.id}`);
              else {
                setSelected(e);
                setVisible(true);
              }
            }}
          />
        ) : null,
      width: 80,
      align: "center",
    });
  if (deleteColumn)
    allColumns.push({
      render: (e: any) => {
        return isDeletable(e) ? (
          <Button
            icon={<Delete />}
            type="danger"
            onClick={() => {
              showDeleteConfirm(e);
            }}
          />
        ) : null;
      },
      width: 80,
      align: "center",
    });
  return (
    <div>
      <Table
        rowKey="id"
        //expandable={expand}
        loading={loading}
        columns={allColumns}
        dataSource={data.slice(
          page * rowPerPage,
          page * rowPerPage + rowPerPage
        )}
        pagination={{
          total: count,
          showSizeChanger: true,
          pageSize: rowPerPage,
          pageSizeOptions: ["10", "20", "40"],
          onShowSizeChange: (page, next) => {
            onRowPerPageChange(next);
          },
          onChange: (p, rowpage?: number) => {
            fetchMoreData && fetchMoreData(rowPerPage, p);
            onPageChange(p - 1);
          },
        }}
        bordered
        title={() => <div>{title}</div>}
        size="middle"
      />
    </div>
  );
}
