import React, { ReactElement } from "react";
import { Form, DatePicker } from "antd";
import { InputsType } from "./types";
import { DateType } from "../types/FilterTypes";

export default function DateInput({
  fieldDef,
  values,
  onChange,
  label = true,
}: InputsType<DateType>): ReactElement {
  const { picker, defaultDate, format } = fieldDef.properties as DateType;
  const { title, name, required, rules = [], size = "large" } = fieldDef;

  return (
    <Form.Item
      label={label ? title : ""}
      labelCol={{ span: 24 }}
      name={name}
      rules={[
        {
          type: "object",

          required: required,
          message: `${title} est obligatoire !`,
        },
        ...rules,
      ]}
      style={{ width: "100%" }}
    >
      <DatePicker
        format={format || undefined}
        picker={picker}
        onChange={(e) => {
          onChange({ [name]: e });
        }}
        size={size}
        style={{ width: "100%" }}
      ></DatePicker>
    </Form.Item>
  );
}
