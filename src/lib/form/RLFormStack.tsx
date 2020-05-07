import React, { ReactElement, useState } from "react";
import { Form, Col, Row, List, Button, Tooltip } from "antd";
import { useMutation } from "@apollo/react-hooks";
import _ from "lodash";
import { ArrowRightOutlined, DeleteOutlined } from "@ant-design/icons";
import { InputFactory } from "../inputs";
import { withRouter, RouteComponentProps } from "react-router";
import { FormInputType } from "./types";
import { Store } from "antd/lib/form/interface";
import { FormInstance } from "antd/lib/form";
import { extractForeignKey } from "./utils";
import RLForm from "./RLForm";

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
interface FormStackProps {
  title: string;
  inputs: FormInputType;
  redirect?: string;
  initialValues?: object;
  onFinishUpdate?: ((values: Store) => void) | undefined;
  buildInput?: () => any;
  history?: RouteComponentProps["history"];
  span?: number;
  form: FormInstance;
  mode?: "update" | "create";
  onFinish: ((values: Store) => void) | undefined;
  label?: boolean;
  showField: string;
  onFinalSubmit?: (e: Store) => void;
  stack: Store[];
  onStackChange: (e: Store[]) => void;
}
export default function RLFormStack({
  inputs,
  span = 12,
  redirect,
  initialValues,
  form,
  history,
  showField = "designation",
  onFinalSubmit,
  stack,
  onStackChange,
}: FormStackProps) {
  const [clear, setClear] = useState(false);
  // const [stack, setStack] = useState<Store[]>([]);
  const [updateMode, setUpdateMode] = useState({ update: false, key: 0 });
  // const [values, setValues] = useState({});
  // const onChange = (value: object) => {
  //   setValues({ ...values, ...value });
  // };
  const onFinish = (values: Store) => {
    if (!updateMode.update) onStackChange([...stack, form.getFieldsValue()]);
    else {
      const new_stack = [...stack];
      new_stack[updateMode.key] = values;
      onStackChange(new_stack);
    }
    form.resetFields();
    return;
  };
  return (
    <div className="createpage">
      <Row gutter={[16, 16]}>
        <Col md={19} xs={24}>
          <RLForm
            mode="create"
            inputs={inputs}
            title="Create Client"
            onFinish={onFinish}
            form={form}
          />
          <Button
            htmlType="submit"
            icon={<ArrowRightOutlined />}
            type="ghost"
            style={{
              marginLeft: "auto",
            }}
            onClick={() => form?.submit()}
          >
            Ajouter au list
          </Button>
        </Col>
        <Col md={5} xs={24}>
          <List
            style={{ backgroundColor: "white" }}
            header="List des operations"
            dataSource={stack}
            renderItem={(item, index: number) => (
              <Tooltip title={_.get(item, showField, "")}>
                <List.Item style={{ padding: "0px 5px" }}>
                  <Button
                    style={{
                      height: "100%",
                      width: "100%",
                      borderWidth: 0,
                      fontSize: 16,
                    }}
                    type="link"
                    onClick={(i) => {
                      setUpdateMode({ update: true, key: index });
                      form.setFieldsValue({ ...item });
                    }}
                  >
                    {_.get(item, showField, "")}
                  </Button>
                  <Button
                    size="small"
                    icon={<DeleteOutlined />}
                    type="danger"
                    //shape="circle"
                    onClick={(e) => {
                      e.stopPropagation();
                      const new_stack = [...stack];

                      new_stack.splice(index, 1);

                      onStackChange(new_stack);
                    }}
                  ></Button>
                </List.Item>
              </Tooltip>
            )}
            bordered
            className="white"
          ></List>
        </Col>
      </Row>
    </div>
  );
}
/*
 i.nested && i.multiple ? (
                      <Col span={24}>
                        <Col span={24}>
                          <Divider />
                        </Col>
                        <FormList
                          unique={i.unique}
                          legend={legend}
                          inputs={i}
                          name={i.graphql || i.field}
                        />
                      </Col>
                    ) : (
                      <Col md={span} xs={24}>
                        {i.query ? (
                          <SelectControl
                            label={i.title}
                            name={i.field}
                            rules={[
                              {
                                required: i.required,
                                message: `${i.title} est obligatoire !`
                              }
                            ]}
                            mode={i.mode}
                            onChange={e => onSelectChange(e, i.field)}
                            variables={i.variables}
                            key={i.field}
                            query={i.query}
                            placeholder={i.title}
                            column={i.show}
                            filter_variables={
                              i.filter_variables
                                ? {
                                    [i.filter_variables.name]: _.get(
                                      selects,
                                      _.get(i.filter_variables, "value"),
                                      0
                                    )
                                  }
                                : {}
                            }
                            get_items={i.get_items}
                          />
                        ) : (
                          <Form.Item
                            name={i.field}
                            label={i.title}
                            valuePropName={
                              i.type == "boolean" ? "checked" : "value"
                            }
                            rules={[
                              {
                                required: i.required,
                                message: `${i.title} est obligatoire !`
                              }
                            ]}
                          >
                            {i.type == "boolean" ? (
                              <Checkbox size="large"></Checkbox>
                            ) : (
                              <Input
                                type={i.type}
                                size="large"
                                placeholder={i.title}
                                name={i.field}
                              />
                            )}
                          </Form.Item>
                        )}
                      </Col>
*/
