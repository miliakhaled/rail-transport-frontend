import React from "react";
import { Form, DatePicker, message } from "antd";
import locale from "antd/es/date-picker/locale/fr_FR";
import { InputsType } from "./types";
import { DateRangeType } from "../types/FilterTypes";

export default function DateRange({
  fieldDef,
  onChange,
  label = true,
}: InputsType<DateRangeType>) {
  const { begin, end, picker } = fieldDef.properties as DateRangeType;
  const { name, title, required, size = "large" } = fieldDef;
  return (
    <Form.Item
      label={label ? title : ""}
      style={{ width: "100%" }}
      name={name}
      rules={[
        {
          required: required,
          message: `${title} est obligatoire !`,
        },
      ]}
    >
      <DatePicker.RangePicker
        size={size}
        // picker={picker}
        // size={size}
        // picker={picker}
        style={{ width: "100%" }}
        // style={{ width: "100%" }}
        locale={locale}
        onChange={(values) => {
          if (values) {
            onChange({
              [name[0]]: values && values[0] && values[0].format("YYYY-MM-DD"),
              [name[1]]: values && values[1] && values[1].format("YYYY-MM-DD"),
            });
          } else {
            onChange({ [name[0]]: null, [name[1]]: null });
          }
        }}
      ></DatePicker.RangePicker>
    </Form.Item>
  );
}
