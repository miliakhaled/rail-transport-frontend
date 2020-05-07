import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Layout, Button, Row, Col } from "antd";
import Sidebar from "./layouts/sidebar/sidebar";
import Content from "./layouts/content";
import { Router as BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "./graphql";
import Title from "antd/lib/typography/Title";
import { createBrowserHistory } from "history";
import { UserOutlined } from "@ant-design/icons";
import { browserHistory } from "./config";
import { links } from "./links";

export const TitleContext = React.createContext({});

function App() {
  const [title, setValue] = useState("SGME");
  return (
    <TitleContext.Provider value={{ title, setValue }}>
      <ApolloProvider client={client}>
        <BrowserRouter history={browserHistory}>
          <Layout style={{ height: "100%" }}>
            <Sidebar color="dark" links={links}></Sidebar>

            <Layout>
              <Layout.Header
                style={{
                  // boxShadow: "1px 1px 2px 1px gray",
                  backgroundColor: "white",
                  padding: 0,
                }}
              >
                <Row
                  justify="space-between"
                  align="middle"
                  style={{ width: "100%" }}
                >
                  <Col span={20} style={{ textAlign: "left" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        paddingLeft: 50,
                        lineHeight: 0,
                      }}
                    >
                      {/* <Button
                        shape="circle"
                        style={{
                          border: "none",
                          marginRight: 10,
                          marginLeft: 6
                        }}
                        onClick={() => {
                          browserHistory.goBack();
                        }}
                      >
                        <MenuIcon />
                      </Button> */}

                      <Title
                        level={3}
                        //style={{ fontFamily: "Arial", lineHeight: 0 }}
                      >
                        {title}
                      </Title>
                    </div>
                  </Col>
                  <Col span={1} style={{ textAlign: "center" }}>
                    <Button
                      icon={<UserOutlined />}
                      style={{ marginLeft: "auto" }}
                    />
                  </Col>
                </Row>
              </Layout.Header>
              <Content />
            </Layout>
          </Layout>
        </BrowserRouter>
      </ApolloProvider>
    </TitleContext.Provider>
  );
}

export default App;
