import { useQuery } from "@apollo/react-hooks";
import { Select, Form } from "antd";
import React from "react";
import _ from "lodash";
import { InputsType } from "./types";
import { SelectType } from "../types/FilterTypes";

export default function SelectControl({
  fieldDef,
  onChange,
  values,
  save,
  label = true,
}: InputsType<SelectType>) {
  const {
    responseTitle = "response",
    defaultValue,
    query,
    variables,
    mode,
    filters = [],
    show = "designation",
    identifier = "id",
    get_items,
    divide,
  } = fieldDef.properties as SelectType;
  const { size = "large", name, title, required, rules = [] } = fieldDef;

  const { data, loading } = useQuery(query, {
    variables: {
      ...variables,
      ...filters.reduce(
        (acc, cur) => ({ ...acc, [cur]: values ? values[cur] : "" }),
        {}
      ),
    },
  });
  const items = get_items
    ? _.get(data, `${responseTitle}.${get_items}`, [])
    : _.get(data, responseTitle, []);

  const onValueChange = (e: any) => {
    onChange({ [name]: e });
  };
  console.log(_.groupBy(items, divide));

  return (
    <Form.Item
      label={label ? title : ""}
      labelCol={{ span: 24 }}
      name={name}
      rules={[
        {
          required: required,
          message: `${title} est obligatoire !`,
        },
        ...rules,
      ]}
      style={{ width: "100%" }}
    >
      <Select
        // key={key}
        size={size}
        onChange={
          save
            ? (e, item) => {
                const value =
                  items[items.findIndex((i: any) => i[identifier] === e)];
                const res = save.fields.reduce(
                  (acc, curr) => ({
                    ...acc,
                    [curr]: _.get(value, curr, ""),
                  }),
                  {}
                );
                save.action(res);
                onValueChange(e);
              }
            : onValueChange
        }
        mode={mode}
        placeholder={title}
        loading={loading}
        allowClear
        defaultValue={defaultValue}
        showSearch
        optionFilterProp="children"
      >
        {/* {additional.map(c => (
                    <option value={c[identifier]}>{c[column]}</option>
                ))} */}
        {items.map((c: any) => (
          <Select.Option key={c[identifier]} value={c[identifier]}>
            {c[show]}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
}
