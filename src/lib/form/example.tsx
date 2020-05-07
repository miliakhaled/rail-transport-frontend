import React, { ReactElement } from "react";
import RLForm from "./RLForm";
import { Button, Row, Col } from "antd";
import { useForm } from "antd/lib/form/util";
import GraphQLForm from "./GraphQLForm";
import gql from "graphql-tag";
import { simple_query } from "../utils";

interface Props {}

export default function Example({}: Props): ReactElement {
  const [form] = useForm();
  return (
    <div style={{ width: 1000 }}>
      <GraphQLForm
        //form={form}
        // form={form}
        title="Create Person"
        mutation={gql`
          mutation createEngine($input: EngineCreateGenericType!) {
            response: create_engine(input: $input) {
              ok
              errors {
                field
                messages
              }
            }
          }
        `}
        mode="create"
        span={6}
        label={true}
        initialValues={{
          observation: "passed observation",
          designation: "dsmldksmkl",
          engine_type: "2",
        }}
        inputs={{
          title: "Create Person",
          fields: [
            {
              title: "Raison Social",
              name: "raison_social",
              properties: { type: "text" },
              required: true,
            },
            {
              title: "Raison Social",
              name: "raison_social",
              properties: { type: "text" },
              required: true,
            },
            {
              title: "Raison Social",
              name: "raison_social",
              properties: { type: "text" },
              required: true,
            },
            {
              title: "Raison Social",
              name: "raison_social",
              properties: { type: "text" },
              required: true,
            },
            {
              title: "Raison Social",
              name: "raison_social",
              properties: { type: "text" },
              required: true,
            },
            {
              title: "Code Client",
              name: "code_client",
              required: true,
              properties: {
                type: "text",
              },
            },
            {
              name: "contact",
              title: "Contacts",
              info: "some helper",
              properties: {
                type: "multiple",
                fields: [
                  {
                    name: "nom",
                    title: "Nom",
                    properties: { type: "text" },
                    size: "middle",
                  },
                  {
                    name: "nom",
                    title: "Nom",
                    properties: { type: "text" },
                    size: "middle",
                  },
                  {
                    name: "nom",
                    title: "Nom",
                    properties: { type: "text" },
                    size: "middle",
                  },
                  {
                    name: "nom",
                    title: "Nom",
                    properties: { type: "text" },
                    size: "middle",
                  },
                  {
                    name: "prenom",
                    title: "Prénom",
                    properties: { type: "text" },
                    size: "middle",
                  },
                  {
                    name: "Email",
                    title: "email",
                    properties: { type: "email" },
                    size: "middle",
                  },
                ],
              },
            },
          ],
          info: "some helper",
        }}
        onFinish={(e) => console.log(e)}
      />
    </div>
  );
}
