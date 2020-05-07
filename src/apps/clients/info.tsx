import React from "react";
import { simple_query } from "../../lib/utils";
import { ColumnsType } from "antd/lib/table";
import { FieldType, FormInputType } from "../../lib/form/types";
import { Button } from "antd";
import _ from "lodash";
import { contactInput } from "./contact/info";

export const clientColumns: ColumnsType = [
  { title: "Raison Social", dataIndex: "raison_social" },
  { title: "Code Client", dataIndex: "code_client" },
  { title: "address", dataIndex: "address" },
  { title: "email", dataIndex: "email" },
  { title: "Telephone", dataIndex: "phone" },
  // {
  //   title: "Barem",
  //   dataIndex: "barem",
  //   render: (b) => (
  //     <Button type="primary" size="small" onClick={() => alert(b.id)}>
  //       {_.get(b, "designation", "undefinit")}
  //     </Button>
  //   ),
  // },
];
export const clientInput: FormInputType = {
  title: "Information Générale",
  fields: [
    {
      name: "raison_social",
      title: "Raison_social",
      required: true,
      properties: { type: "text" },
    },
    {
      name: "code_client",
      title: "Code Client",
      required: true,
      properties: { type: "text" },
    },
    {
      name: "address",
      title: "Adresse",
      properties: { type: "text" },
    },
    {
      name: "phone",
      title: "Mobile",
      properties: { type: "text" },
    },
    {
      name: "fix",
      title: "Fix",
      properties: { type: "text" },
    },
    {
      name: "fax",
      title: "Fax",
      properties: { type: "text" },
    },
    {
      name: "email",
      title: "Email",
      properties: { type: "email" },
    },
    {
      name: "NIF",
      title: "NIF",
      properties: { type: "text" },
    },
    {
      name: "TIN",
      title: "TIN",
      properties: { type: "text" },
    },
    {
      name: "RC",
      title: "N° registre commercial",
      properties: { type: "text" },
    },
    // {
    //   name: "barem",
    //   title: "Barem",
    //   query: simple_query("barems"),
    //   get: "barem.id",
    //   type: "select",
    // },
  ],
};
export const clientFilters: FieldType[] = [
  {
    title: "Raison Social",
    name: "raison_social",
    properties: { type: "text" },
  },
  { title: "Code Client", name: "code_client", properties: { type: "text" } },
];

export const inputClientWithContact: FormInputType = {
  ...clientInput,

  fields: [
    ...clientInput.fields,
    {
      title: "Contacts",
      name: "contact",
      properties: { type: "multiple", fields: contactInput.fields },
    },
  ],
};

export const inputClientWithContactCreate: FormInputType = {
  ...clientInput,
  fields: [
    ...clientInput.fields,
    {
      title: "Contacts",
      name: "contacts_add",
      properties: { type: "multiple", fields: contactInput.fields },
    },
  ],
};
