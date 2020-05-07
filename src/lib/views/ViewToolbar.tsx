import React, { ReactElement } from "react";
import { Row, Col } from "antd";
import { InputFactory } from "../inputs";
import Form, { FormInstance } from "antd/lib/form";
import { InputFieldType, InputUnionType } from "../types/FilterTypes";
import { FieldType } from "../form/types";

interface ViewToolbarProps {
  filters?: FieldType[];
  variables?: any[];
  onVariablesChange: (e: any) => void;
  form?: FormInstance;
}

export default function ViewToolbar({
  filters,
  variables,
  onVariablesChange,
  form,
}: ViewToolbarProps): ReactElement {
  return (
    <Form form={form}>
      <Row gutter={[16, 16]}>
        {filters?.map((f, index: number) => (
          <Col span={4}>
            <InputFactory
              key={index}
              fieldDef={f}
              label={false}
              onChange={onVariablesChange}
            />
          </Col>
        ))}
      </Row>
    </Form>
  );
}
