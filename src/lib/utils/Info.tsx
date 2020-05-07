import React, { ReactElement } from "react";
import { Popover, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
interface Props {
  info: string;
}

export default function Info({ info = "dsdsd" }: Props): ReactElement {
  return (
    <div>
      <Popover
        content={
          <div style={{ width: 200 }}>
            <Typography.Text>{info}</Typography.Text>
          </div>
        }
        placement="right"
      >
        <InfoCircleOutlined
          style={{ fontSize: 12, color: "#888888", marginLeft: 8 }}
        />
      </Popover>
    </div>
  );
}
