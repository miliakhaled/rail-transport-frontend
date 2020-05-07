import React, { ReactElement } from "react";
import {
  GraphQLSelect,
  StaticSelect,
  DateInput,
  BooleanInput,
  DateRange,
  TextInput,
} from ".";
import { InputsType } from "./types";
import { InputUnionType } from "../types/FilterTypes";

export default function InputsFactory({
  fieldDef,
  onChange = (e) => {},
  label = false,
  save,
  values,
}: InputsType<InputUnionType>): ReactElement {
  switch (fieldDef.properties.type) {
    case "select":
      return (
        <GraphQLSelect
          fieldDef={fieldDef as any}
          onChange={onChange}
          label={label}
        />
      );
    case "static":
      return (
        <StaticSelect
          fieldDef={fieldDef as any}
          onChange={onChange}
          label={label}
        />
      );
    case "date":
      return (
        <DateInput
          fieldDef={fieldDef as any}
          onChange={onChange}
          label={label}
        />
      );
    case "boolean":
      return (
        <BooleanInput
          fieldDef={fieldDef as any}
          onChange={onChange}
          label={label}
        />
      );
    case "date_range":
      return (
        <DateRange
          fieldDef={fieldDef as any}
          onChange={onChange}
          label={label}
        />
      );
    default:
      return (
        <TextInput
          fieldDef={fieldDef as any}
          onChange={onChange}
          label={label}
        />
      );
  }
}
