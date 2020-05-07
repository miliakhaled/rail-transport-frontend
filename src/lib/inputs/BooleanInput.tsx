import React, { ReactElement } from "react";
import { Checkbox, Form } from "antd";
import { InputsType } from "./types";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { SwitchType } from "../types/FilterTypes";

export default function BooleanInput({
  fieldDef,
  onChange,
  label = true,
}: InputsType<SwitchType>): ReactElement {
  const { defaultChecked } = fieldDef.properties as SwitchType;

  const { title, name, required, rules = [] } = fieldDef;
  return (
    <Form.Item
      label={label ? title : ""}
      labelCol={{ span: 24 }}
      name={name}
      valuePropName="checked"
      rules={[
        {
          required: required,
          message: `${title} est obligatoire !`,
        },
        ...rules,
      ]}
      style={{ width: "100%" }}
    >
      <Checkbox
        defaultChecked={defaultChecked}
        onChange={(e: CheckboxChangeEvent) =>
          onChange({ [name]: e.target.checked })
        }
        style={{ width: "100%" }}
      >
        {title}
      </Checkbox>
    </Form.Item>
  );
}
