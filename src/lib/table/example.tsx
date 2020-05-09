import React, { ReactElement } from "react";
import GraphQLTable from "./GraphQLTable";
import Tag from "antd/lib/tag";
import _ from "lodash";
import gql from "graphql-tag";

interface Props {}

export default function Example({}: Props): ReactElement {
  return (
    <div>
      <GraphQLTable
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
          all: gql`
            query getEngines1(
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
