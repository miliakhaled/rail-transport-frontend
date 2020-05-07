import React from "react";
import { routes } from "../../routes";
import { Layout } from "antd";
import { Switch, Route } from "react-router-dom";

export default function Content() {
  return (
    <Layout.Content
      style={{
        margin: "24px 16px",
        padding: 24,
        background: "",
        minHeight: 280,
      }}
    >
      <Switch>
        {routes.map((r) => (
          <Route path={r.path} component={r.component} exact></Route>
        ))}
      </Switch>
    </Layout.Content>
  );
}
