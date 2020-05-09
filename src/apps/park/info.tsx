import React from "react";

import { ColumnsType } from "antd/lib/table";
import { FieldType, FormInputType } from "../../lib/form/types";
import { Tag } from "antd";
import { simple_query } from "../../lib/utils";
export const parkColumns: ColumnsType = [
  {
    title: "Designation",
    dataIndex: "model",
    render: (m) => <div>{m && m.designation}</div>,
  },
  {
    title: "Marque",
    dataIndex: "marque",
    render: (m) => <Tag color="green">{m}</Tag>,
  },
  {
    title: "Matricule",
    dataIndex: "matricule",
  },
  {
    title: "Nature",
    dataIndex: "nature",
  },
  {
    title: "Année",
    dataIndex: "year",
    render: (y) => <Tag color="default">{y}</Tag>,
  },
];

export const parkInputs: FormInputType = {
  title: "Nouvelle Véhicule",
  fields: [
    {
      name: "model",
      title: "Model",
      required: true,
      properties: {
        divider: "engine_type.designation",
        type: "select",
        query: simple_query("enginemodels", [
          "designation",
          { engine_type: ["designation"] },
        ]),
        get: "model.id",
      },
    },
    {
      name: "marque",
      title: "Marque",
      properties: { type: "text" },
    },
    {
      name: "matricule",
      required: true,
      title: "Matricule",
      properties: { type: "text" },
    },
    {
      name: "nature",
      title: "Nature",
      properties: { type: "text" },
    },
    {
      name: "year",
      title: "Année",
      properties: { type: "date", picker: "year" },
    },
  ],
  info: "creer une nouvelle véhicule dans le park Rail Logistic",
};
export const parkUpdate: FormInputType = {
  title: "Mettre à jour Véhicule",
  fields: [
    {
      name: "model",
      editable: false,
      title: "Model",
      required: true,
      properties: {
        divider: "engine_type.designation",
        type: "select",
        query: simple_query("enginemodels", [
          "designation",
          { engine_type: ["designation"] },
        ]),
        get: "model.id",
      },
    },
    {
      name: "marque",
      title: "Marque",
      properties: { type: "text" },
    },
    {
      name: "matricule",
      required: true,
      title: "Matricule",
      properties: { type: "text" },
    },
    {
      name: "nature",
      title: "Nature",
      properties: { type: "text" },
    },
    {
      name: "year",
      title: "Année",
      properties: { type: "number" },
    },
  ],
  info: "creer une nouvelle véhicule dans le park Rail Logistic",
};
export const parkFilters: FieldType[] = [];
