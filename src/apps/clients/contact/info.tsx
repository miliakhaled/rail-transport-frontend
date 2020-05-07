import React from "react";
import { ColumnsType } from "antd/lib/table";
import { FieldType, FormInputType } from "../../../lib/form/types";
import _ from "lodash";
import { Button } from "antd";
import { simple_query } from "../../../lib/utils";
export const contactColumns: ColumnsType = [
  {
    dataIndex: "nom",
    title: "Nom",
  },
  {
    dataIndex: "prenom",
    title: "Prenom",
  },
  {
    dataIndex: "fonction",
    title: "Fonction",
  },
  {
    dataIndex: "email",
    title: "Email",
  },
  {
    dataIndex: "phone",
    title: "Téléphone",
  },
  {
    title: "Client",
    dataIndex: "client",
    render: (b) => (
      <Button type="primary" size="small" onClick={() => alert(b.id)}>
        {_.get(b, "raison_social", "undefinit")}
      </Button>
    ),
  },
];
export const contactInput: FormInputType = {
  title: "Nouveau Contacts",

  // graphql: graphqlName,
  fields: [
    {
      title: "Nom",
      name: "nom",
      properties: { type: "text" },
      required: true,
    },
    {
      title: "Prenom",
      name: "prenom",
      properties: { type: "text" },
      required: true,
    },
    {
      title: "Email",
      name: "email",
      properties: { type: "email" },
    },
    {
      title: "Téléphone",
      name: "phone",
      properties: { type: "text" },
    },

    {
      title: "Fonction",
      name: "fonction",
      properties: { type: "text" },
    },
  ],
};
export const contactFilters: FieldType[] = [];

export const inputContactWithClient: FormInputType = {
  ...contactInput,
  fields: [
    ...contactInput.fields,
    {
      name: "client",
      title: "Client",
      properties: {
        type: "select",
        show: "raison_social",
        query: simple_query("clients", ["raison_social"]),
      },
      required: true,
      // get: "client.id",
    },
  ],
};
