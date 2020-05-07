import React, { ReactElement, useState } from "react";
import { FormInputType } from "./types";
import { Store } from "antd/lib/form/interface";
import { RouteComponentProps } from "react-router-dom";
import { FormInstance } from "antd/lib/form";
import RLForm from "./RLForm";
import { useMutation } from "@apollo/react-hooks";
import { DocumentNode } from "graphql";
import { useForm } from "antd/lib/form/util";
import { Row, Col, Button, message } from "antd";
import _ from "lodash";
interface Props {
  title?: string;
  inputs: FormInputType;
  mutation: DocumentNode;
  redirect?: string;
  initialValues?: object;
  onFinishUpdate?: ((values: Store) => void) | undefined;
  buildInput?: (e: Store) => any;
  history?: RouteComponentProps["history"];
  span?: number;
  updateForm?: FormInstance;
  mode?: "update" | "create";
  onFinish?: ((values: Store) => void) | undefined;
  label?: boolean;
  resultName?: string;
  checkResponse?: (response: object) => boolean;
}

export default function GraphQLForm({
  resultName = "response",
  history,
  mutation,
  buildInput = (e) => e,
  inputs,
  onFinishUpdate,
  redirect = "",
  title,
  initialValues = {},
  span = 12,
  updateForm,
  onFinish,
  label = false,
  checkResponse = (d) => _.get(d, `data.${resultName}.ok`, false),
}: Props): ReactElement {
  const [doMutation] = useMutation(mutation);
  const [form] = useForm();
  const [clear, setClear] = useState(false);
  const handleOnFinish = (values: Store) => {
    const newInput = buildInput(values);
    doMutation({ variables: { input: newInput } })
      .then((d) => {
        if (checkResponse && checkResponse(d)) {
          // if (!clear) history && history.push(redirect);
          // else {
          form.resetFields();
          // }
          message.success("Élément créé avec succès");
        }
        // if (_.get(d, `data.${resultName}.ok`, false)) {

        // }
        else {
          if (_.get(d, `data.${resultName}.errors`, false))
            message.error(
              `Une erreur est survenue dans les champs suivant : ${_.get(
                d,
                `data.${resultName}.errors`,
                []
              ).reduce((acc: any, curr: any) => `${acc}  ${curr.field}`, "")}`
            );
          console.log(_.get(d, `data.${resultName}.errors`));
        }
      })
      .catch((e) => {
        message.error(`Une erreur est survenue`);
        console.log(e);
      });
  };
  return (
    <div>
      <RLForm
        title="Create Person"
        form={form}
        //action={() => console.log("dz")}
        mode="create"
        span={span}
        label={label}
        inputs={inputs}
        onFinish={(e) => handleOnFinish(e)}
        initialValues={initialValues}
      />
      <Row gutter={16} justify="end">
        <Col span={3}>
          <Button
            onClick={() => {
              form.resetFields();
              //setClear(true);
              //form.submit();
            }}
            htmlType="button"
            style={{ width: "100%" }}
            type="default"
          >
            supprimer
          </Button>
        </Col>
        <Col span={3}>
          <Button
            onClick={() => {
              // setClear(false);
              form.submit();
            }}
            style={{ width: "100%" }}
            type="primary"
          >
            engregistrer
          </Button>
        </Col>
      </Row>
    </div>
  );
}
