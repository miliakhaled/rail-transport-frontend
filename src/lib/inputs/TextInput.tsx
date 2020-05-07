import React from "react";
import { Input, Form } from "antd";
import { InputsType } from "./types";
import { InputType } from "../types/FilterTypes";

export default function TextInput({
  fieldDef,
  onChange,
  values,
  label = true,
}: InputsType<InputType>) {
  const { defaultValue, type = "text" } = fieldDef.properties as InputType;
  const { name, title, required, size = "large", info } = fieldDef;

  return (
    <Form.Item
      name={name}
      label={label ? title : ""}
      help={info}
      rules={[
        {
          required: required,
          message: `${title} est obligatoire !`,
        },
      ]}
    >
      <Input
        defaultValue={defaultValue}
        onChange={(e) => onChange({ [name]: e.target.value })}
        type={type || "text"}
        size={size}
        placeholder={title}
        name={name}
      />
    </Form.Item>
  );
}
