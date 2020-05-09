import { DocumentNode } from "graphql";
import { ColProps } from "antd/lib/col";
import { Rule } from "antd/lib/form";

export type StaticChoicesType = {
  /**
   * Value passed to Select.Option
   */
  value: any;
  /**
   * Text of Select.Option
   */
  title: string;
};

export type StaticSelectType = {
  defaultValue?: any;
  type: "static";
  /**
   * The options available
   */
  choices: StaticChoicesType[];
  /**
   * Mode of Selection: multiple selection, tags selection or single selection
   * default: single
   */
  mode?: "multiple" | "tags" | undefined;

  /**
   * The default selected value from the passed choices.
   */
};

export type SelectType = {
  type: "select";
  query: DocumentNode;
  /**
   * The field to divide the list by it ex: divide the list by year
   */
  divider?: string;
  /**
   * the path to access the identifier ex: "client.id"
   */
  get?: string;
  responseTitle?: string;
  variables?: {};
  mode?: "multiple" | "tags" | undefined;
  identifier?: string;
  show?: string;
  filters?: [];
  get_items?: string;

  /**
   * The default selected value : most likely an ID.
   */
  defaultValue?: string;
};

export type DateType = {
  type: "date";
  defaultDate?: string | Date;
  format?: string;
  picker: "month" | "week" | "year";
};
export type InputType = {
  type: "text" | "email" | "number";
  defaultValue?: string | number;
};
export type SwitchType = {
  type: "boolean";
  defaultChecked?: boolean;
};
export type MultipleType = {
  type: "multiple";
  fields: InputFieldType<InputUnionType>[];
};

export type DateRangeType = {
  type: "date_range";
  begin?: string;
  end?: string;
  picker?: "time" | "date" | "week" | "month" | "quarter" | "year" | undefined;
};
export type InputUnionType =
  | StaticSelectType
  | SelectType
  | DateType
  | DateRangeType
  | InputType
  | SwitchType
  | MultipleType;

export interface InputFieldType<T> {
  info?: string;
  title: string;
  /**
   * Field or fields name for filters : this most likely is related to the field name in Graphql backend model filters
   */
  name: string | string[] | any;
  /**
   * Type Object of the filter : Date, Date Range, Graphql Select, Static Select or Boolean ( date" | "date_range" | "select" | "static" | "boolean" )
   */
  properties: InputUnionType | T; // "date" | "date_range" | "select" | "static" | "boolean";
  /**
   * Length of the column in Row: asigned to <Col></Col>
   */
  /**
   * is this field Required while submitting ?
   */
  required?: boolean;
  size?: "large" | "small" | "middle";
  rules?: Rule[];
  span?: number;
  editable?: boolean;
}
