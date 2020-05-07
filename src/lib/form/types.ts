import { InputUnionType, InputFieldType } from "../types/FilterTypes";

// type ExcludeFields<T> = T extends { multiple: true }
//   ? FormListFieldType
//   : FormFieldType;

export interface FieldType extends InputFieldType<InputUnionType> {}
export interface FormInputType {
  title: string;
  fields: InputFieldType<InputUnionType>[];
  info?: string;
}
