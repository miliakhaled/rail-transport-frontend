import React, { ReactElement, useState } from "react";
import { FormInputType } from "./types";
import { DocumentNode } from "graphql";
import { Store } from "antd/lib/form/interface";
import { RouteComponentProps } from "react-router-dom";
import { FormInstance } from "antd/lib/form";
import RLFormStack from "./RLFormStack";
import { useForm } from "antd/lib/form/util";
import { Button } from "antd";
import { useMutation } from "@apollo/react-hooks";

interface Props {
  title: string;
  inputs: FormInputType;
  mutation: DocumentNode;
  redirect?: string;
  initialValues?: object;
  onFinishUpdate?: ((values: Store) => void) | undefined;
  buildInput?: (e: Store) => any;
  history?: RouteComponentProps["history"];
  span?: number;
  mode: "update" | "create";
  onFinish: ((values: Store) => void) | undefined;
  label?: boolean;
  resultName?: string;
  checkResponse?: (response: object) => boolean;
  showField: string;
}

export default function GraphQLFormStack({
  inputs,
  title,
  buildInput,
  onFinish,
  span,
  checkResponse,
  mode,
  mutation,
  history,
  initialValues,
  label,
  onFinishUpdate,
  redirect,
  resultName,
  showField,
}: Props): ReactElement {
  const [form] = useForm();
  const [stack, setStack] = useState<Store[]>([]);
  const [doMutation] = useMutation(mutation);

  return (
    <div>
      <Button onClick={() => console.log(stack)}>submit</Button>
      <RLFormStack
        stack={stack}
        onStackChange={setStack}
        form={form}
        inputs={inputs}
        onFinish={(e) => {}}
        showField={showField}
        title={title}
      />
    </div>
  );
}
