import React, { ReactElement, useState } from "react";
import { FormInputType } from "./types";
import { Form, Input, Button, Row, Col, Empty, Divider, Card } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import { InputFactory } from "../inputs";
import {
  MultipleType,
  InputFieldType,
  InputUnionType,
} from "../types/FilterTypes";
import { FormInstance } from "antd/lib/form";
import Info from "../utils/Info";

interface AntFormFieldsProps {
  fields: InputFieldType<InputUnionType>[];
  index: number;
  unique?: string[];
  form?: FormInstance;
}
export function AntFormFields({
  fields,
  index,
  unique,
  form,
}: AntFormFieldsProps): ReactElement {
  const [values, setValues] = useState({});
  const onChange = (value: object) => {
    setValues({ ...values, ...value });
  };

  return (
    <Row gutter={16} align="middle">
      {fields.map((i, index2) => (
        <Col
          xs={24}
          md={Math.floor(24 / fields.length)}
          style={{ alignSelf: "center" }}
        >
          <InputFactory
            fieldDef={{
              ...i,
              name: index !== undefined ? [index, i.name] : i.name,
            }}
            onChange={onChange}
            label={false}
          />
        </Col>
      ))}
    </Row>
  );
}

interface Props {
  inputs: Omit<InputFieldType<InputUnionType>, "required" | "rules" | "size">;
}
const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
export default function FormList({ inputs }: Props): ReactElement {
  return (
    <Form.List name={inputs.name}>
      {(fields, { add, remove }) => {
        return (
          <Card
            title={
              <Row justify="space-between">
                <Col style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ display: "flex" }}>
                    {inputs.title} {inputs.info && <Info info={inputs.info} />}
                  </div>
                </Col>
                <Col style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    type="primary"
                    shape="circle"
                    onClick={() => {
                      add();
                    }}
                  >
                    <PlusOutlined />
                  </Button>
                </Col>
              </Row>
            }
          >
            {fields.length === 0 ? (
              <Empty description="aucun élément n'a encore été ajouté!"></Empty>
            ) : null}
            {fields.map((field, index) => (
              <Row
                gutter={[16, 2]}
                style={{ display: "flex", alignItems: "start" }}
              >
                <Col span={23}>
                  <Form.Item key={field.key}>
                    <AntFormFields
                      //form={form}
                      //unique={unique}
                      fields={(inputs.properties as MultipleType).fields}
                      index={index}
                    />
                  </Form.Item>
                </Col>

                {fields.length > 0 ? (
                  <Col span={1}>
                    <Button
                      size="small"
                      className="dynamic-delete-button"
                      icon={<DeleteOutlined />}
                      type="danger"
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </Col>
                ) : null}
              </Row>
            ))}
          </Card>
          //   <Legend
          //     legend={legend}
          //     title={inputs.title}
          //     info={inputs.info}
          //     action={
          //       <Button
          //         type="primary"
          //         size="middle"
          //         onClick={() => {
          //           add();
          //         }}
          //       >
          //         <Add />
          //       </Button>
          //     }
          //   >
          //     <br />
          //     <br />

          //   </Legend>
        );
      }}
    </Form.List>
  );
}
