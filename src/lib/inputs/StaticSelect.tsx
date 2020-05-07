import React from "react";
import { Form, Select } from "antd";
import _ from "lodash";
import { StaticSelectType } from "../types/FilterTypes";
import { InputsType } from "./types";
export default function StaticSelect({
  fieldDef,
  values,
  onChange,
  save,
  label = true,
}: InputsType<StaticSelectType>) {
  const {
    defaultValue,
    mode,
    choices,
  } = fieldDef.properties as StaticSelectType;

  const { size = "large", name, title, required, rules = [] } = fieldDef;
  const onValueChange = (e: any) => {
    onChange({ [name]: e });
  };
  return (
    <Form.Item
      rules={[
        {
          required: required,
          message: `${title} est obligatoire !`,
        },
        ...rules,
      ]}
      name={name}
      label={label ? title : ""}
      style={{ width: "100%" }}
    >
      <Select
        onChange={
          save
            ? (e, item) => {
                // const value = choices[choices.findIndex((i:any) => i["id"] === e)];
                // const res = save.fields.reduce(
                //   (acc, curr) => ({
                //     ...acc,
                //     [curr]: _.get(value, curr, ""),
                //   }),
                //   {}
                // );
                save.action({ [name]: e });
                onValueChange(e);
              }
            : onValueChange
        }
        mode={mode}
        allowClear
        size={size}
        placeholder={title}
        defaultValue={defaultValue}
      >
        {choices.map((c) => (
          <Select.Option value={c.value}>{c.title}</Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
}
