import React, { ReactElement, useState } from "react";
import Table, { ColumnsType } from "antd/lib/table";
import { OperationVariables, ApolloQueryResult } from "apollo-boost";
import { ExecutionResult } from "graphql";
import { Button, Dropdown, Menu } from "antd";
import {
  EditFilled as Edit,
  DeleteOutlined as Delete,
  MoreOutlined as More,
} from "@ant-design/icons";
import { RouteComponentProps } from "react-router-dom";
import { PaginationType } from "./utils";
import confirm from "antd/lib/modal/confirm";
import { ObservableQueryFields } from "@apollo/react-common/lib/types/types";
import _ from "lodash";

export type ActionsType = {
  title: string;
  icon?: any;
  onClick: (item: any) => void;
};
interface Props {
  onDelete?: (variables: OperationVariables) => Promise<ExecutionResult<any>>;
  onUpdate?: (variables: OperationVariables) => Promise<ExecutionResult<any>>;
  data: object[];
  columns: ColumnsType<object>;
  actions?: ActionsType[];
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
  title?: string;
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
  const allColumns: ColumnsType<object> = [...columns];
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
      title: "modifier",
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
      title: "supprimer",
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
  if (actions.length > 0)
    allColumns.push({
      title: "actions",
      render: (i) => (
        <Dropdown
          overlay={
            <Menu theme="dark">
              {actions.map((a) => (
                <Menu.Item
                  style={{
                    alignItems: "center",
                    color: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    width: 130,
                  }}
                  key="1"
                  onClick={() => a.onClick(i)}
                >
                  {a.title}
                  <a.icon></a.icon>
                </Menu.Item>
              ))}
            </Menu>
          }
        >
          <Button size="small" type="ghost" icon={<More />}></Button>
        </Dropdown>
      ),
      width: 40,
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
