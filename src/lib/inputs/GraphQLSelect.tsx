import { useQuery } from "@apollo/react-hooks";
import { Select, Form } from "antd";
import React from "react";
import _ from "lodash";
import { InputsType } from "./types";
import { SelectType } from "../types/FilterTypes";
const { Option, OptGroup } = Select;

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
    divider,
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
  const groupedOptions = divider ? _.groupBy(items, divider) : null;
  const options = groupedOptions ? Object.keys(groupedOptions) : null;

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

        {divider && groupedOptions && options
          ? options?.map((o) => (
              <OptGroup label={o}>
                {groupedOptions[o].map((c: any) => (
                  <Option key={c[identifier]} value={c[identifier]}>
                    {c[show]}
                  </Option>
                ))}
              </OptGroup>
            ))
          : items.map((c: any) => (
              <Option key={c[identifier]} value={c[identifier]}>
                {c[show]}
              </Option>
            ))}
      </Select>
    </Form.Item>
  );
}
