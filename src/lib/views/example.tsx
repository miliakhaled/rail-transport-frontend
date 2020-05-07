import React, { ReactElement } from "react";
import GraphQLTableView from "./GraphQLTableView";
import gql from "graphql-tag";
import { Tag, Form } from "antd";
import _ from "lodash";
import { InputFieldType, InputUnionType } from "../types/FilterTypes";
interface Props {
  filters?: InputFieldType<InputUnionType>[];
}

export default function Example({
  filters = [
    {
      name: "designation",
      title: "designation",
      properties: { type: "email" },
    },
    {
      name: "type",
      title: "engine type",
      properties: {
        get: "engine_type.id",
        type: "select",
        query: gql`
          query getEnginesType {
            response: enginetypes {
              id
              designation
            }
          }
        `,
      },
    },
  ],
}: Props): ReactElement {
  return (
    <div>
      <GraphQLTableView
        filters={filters}
        columns={[
          {
            dataIndex: "designation",
            title: "Designation",
          },
          {
            dataIndex: "engine_type",
            title: "Type",
            render: (e) => (
              <Tag color="magenta">{_.get(e, "designation", "")}</Tag>
            ),
          },
          {
            dataIndex: "properties",
            title: "Proprietés",
          },
          {
            dataIndex: "observation",
            title: "Observation",
          },
        ]}
        title="dsdsd"
        graphql={{
          delete: gql`
            mutation delete($id: ID!) {
              delete_engine(id: $id) {
                ok
              }
            }
          `,
          all: gql`
            query getEngines2(
              $designation: String
              $properties: String
              $type: ID
              $offset: Int
              $limit: Int
            ) {
              response: all_engines(
                designation__icontains: $designation
                properties__icontains: $properties
                engine_type: $type
              ) {
                totalCount
                results(limit: $limit, offset: $offset) {
                  id
                  designation
                  properties
                  observation
                  engine_type {
                    designation
                    id
                  }
                }
              }
            }
          `,
        }}
      />
    </div>
  );
}
