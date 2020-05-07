import { InputFieldType } from "../types/FilterTypes";

export interface InputsType<T> {
  fieldDef: InputFieldType<T>;
  onChange: (e: any) => void;
  label?: boolean;
  values?: object;
  save?: {
    fields: string[];
    action(value: any): React.Dispatch<React.SetStateAction<{}>>;
  };
}
