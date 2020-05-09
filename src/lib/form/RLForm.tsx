import React, { ReactElement, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Form, Row, Col, Divider, Card, Button } from "antd";
import { InputFactory } from "../inputs";
import { useForm, FormInstance } from "antd/lib/form/util";
import { Store } from "antd/lib/form/interface";
import { FormInputType } from "./types";
import { extractForeignKey } from "./utils";
import FormList from "./FormList";
import Info from "../utils/Info";

interface RLFormProps {
  title: string;
  inputs: FormInputType;
  redirect?: string;
  initialValues?: object;
  onFinishUpdate?: ((values: Store) => void) | undefined;
  buildInput?: () => any;
  history?: RouteComponentProps["history"];
  span?: number;
  form?: FormInstance;
  mode?: "update" | "create";
  onFinish: ((values: Store) => void) | undefined;
  label?: boolean;
  card?: boolean;
}

export default function RLForm({
  inputs,
  onFinishUpdate,
  title,
  initialValues,
  span = 12,
  form,
  onFinish,
  label = false,
  card = true,
}: RLFormProps): ReactElement {
  const [internalForm] = useForm();
  const [values, setValues] = useState({});
  const onChange = (value: any) => {
    setValues({ ...values, ...value });
  };
  console.log(label);

  return (
    <div>
      <Card
        title={
          card ? (
            <div style={{ display: "flex" }}>
              {inputs.title} {inputs.info && <Info info={inputs.info} />}
            </div>
          ) : null
        }
        style={{ marginBottom: 16 }}
        // actions={[
        //   <Row gutter={16} justify="end">
        //     <Col span={3}>
        //       <Button
        //         //onClick={() => form.resetFields()}
        //         style={{ width: "100%" }}
        //         type="default"
        //       >
        //         clear
        //       </Button>
        //     </Col>
        //     <Col span={3}>
        //       <Button
        //         onClick={() => {
        //           form?.submit();
        //         }}
        //         style={{ width: "100%" }}
        //         type="primary"
        //       >
        //         submit
        //       </Button>
        //     </Col>
        //   </Row>,
        // ]}
      >
        <Form
          initialValues={
            initialValues ? extractForeignKey(inputs.fields, initialValues) : {}
          }
          {...{
            labelCol: { span: 24 },
            wrapperCol: { span: 24 },
          }}
          form={form || internalForm}
          name="form"
          onFinish={onFinish}
        >
          <div className="form">
            <div
              title={inputs.title}
              //   info={inputs.info}
            >
              <Row gutter={[20, 0]}>
                {inputs.fields.map((i) =>
                  i.properties.type === "multiple" ? (
                    <Col span={24}>
                      {/* <Col span={24}>
                        <Divider />
                      </Col> */}
                      <FormList
                        // unique={i.unique}
                        // legend={legend}
                        inputs={i}
                        //name={i.graphql || i.field}
                      />
                    </Col>
                  ) : (
                    <Col md={span} xs={24}>
                      <InputFactory
                        fieldDef={i}
                        label={label}
                        onChange={onChange}
                        values={values}
                      />
                    </Col>
                  )
                )}
              </Row>
            </div>
          </div>
        </Form>
      </Card>
    </div>
  );
}
