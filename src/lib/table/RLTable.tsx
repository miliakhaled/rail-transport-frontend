import React, { ReactElement, useState } from "react";
import Table, { ColumnsType } from "antd/lib/table";
import { OperationVariables, ApolloQueryResult } from "apollo-boost";
import { ExecutionResult } from "graphql";
import { Button, Dropdown, Menu, Modal, Select } from "antd";
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
import { RLForm } from "../form";
import { FormInputType } from "../form/types";
import { Store } from "antd/lib/form/interface";
import { useForm } from "antd/lib/form/util";
import { extractForeignKey } from "../form/utils";

export type ActionsType = {
  title: string;
  icon?: any;
  onClick: (item: any) => void;
};
interface Props {
  onDelete?: (id: string | number) => void;
  onUpdate?: (values: Store) => void;
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
  updateInputs?: FormInputType;
  onSelect?: React.Dispatch<React.SetStateAction<any>>;
}

/**
 *
 * Table to render data with delete and update features
 */
export default function RLTable({
  data = [],
  onDelete,
  onSelect,
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
  updateInputs,
}: Props): ReactElement {
  const [selected, setSelected] = useState<any>({});
  const [visible, setVisible] = useState(false);
  const [updateForm] = useForm();
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
        onDelete && onDelete(item.id);
        //if (graphql.delete)
        // onDelete &&
        //   onDelete({ variables: { id: item.id } })
        //     .then((d: any) => {
        //       refetch();
        //       onPageChange(0);
        //     })
        //     .catch((e) => {
        //       console.log(e);
        //       alert("operation echouée");
        //     });
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
                onSelect && onSelect(e);
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
  // console.log(
  //   data
  //     .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
  //     .map((d: any) => d.id)
  // );
  // console.log(page * rowPerPage, page * rowPerPage + rowPerPage);
  // console.log(data);
  console.log(rowPerPage, page);

  return (
    <div>
      {updateInputs ? (
        <Modal
          destroyOnClose={true}
          visible={visible}
          onCancel={() => setVisible(false)}
          title={updateInputs.title}
          onOk={() => {
            updateForm.validateFields().then((values) => {
              onUpdate && onUpdate(values);
            });
          }}
        >
          <RLForm
            initialValues={selected}
            form={updateForm}
            card={false}
            //initialValues={selected}
            inputs={updateInputs}
            title=""
            onFinish={(e) => {
              console.log();
            }}
          ></RLForm>
        </Modal>
      ) : null}
      <Table
        rowKey="id"
        //expandable={expand}
        loading={loading}
        columns={allColumns}
        dataSource={data.slice(
          page * rowPerPage,
          page * rowPerPage + rowPerPage
        )}
        // pagination={{
        //   total: count,
        //   showSizeChanger: true,
        //   pageSize: rowPerPage,
        //   pageSizeOptions: ["10", "20", "40"],
        //   onShowSizeChange: (page, next) => {
        //     onPageChange(0);
        //     onRowPerPageChange(next);

        //     // fetchMoreData && fetchMoreData(rowPerPage, page);
        //   },

        //   onChange: (p, rowpage?: number) => {
        //     fetchMoreData && fetchMoreData(rowPerPage, p);
        //     onPageChange(p - 1);
        //   },
        // }}
        pagination={false}
        bordered
        title={() => <div>{title}</div>}
        size="middle"
      />
      <br />
      <div style={{ textAlign: "right" }}>
        <Button.Group>
          <Button
            disabled={page === 0}
            size="small"
            onClick={() => onPageChange(page - 1)}
          >
            {"<"}
          </Button>
          <div style={{ width: 5 }}> </div>
          <Button
            disabled={
              data.length == count &&
              Math.floor(data.length / rowPerPage) == page
            }
            size="small"
            onClick={() => {
              onPageChange(page + 1);
              fetchMoreData && fetchMoreData(rowPerPage, page);
            }}
          >
            {" "}
            {">"}{" "}
          </Button>
        </Button.Group>{" "}
        <Select
          onChange={(v) => {
            onRowPerPageChange(v);
            onPageChange(0);
          }}
          value={pagination.rowPerPage}
          size="small"
        >
          <Select.Option value={10}>10 / page</Select.Option>
          <Select.Option value={20}>20 / page</Select.Option>
          <Select.Option value={40}>40 / page</Select.Option>
        </Select>
      </div>
    </div>
  );
}
