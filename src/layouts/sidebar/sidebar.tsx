import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { LinkType } from "../../links";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import _ from "lodash";
import { browserHistory } from "../../config";

interface SidebarProps {
  color?: "dark" | "light" | undefined;
  links: LinkType[];
}

export default function Sidebar({ color = "dark", links }: SidebarProps) {
  const [collapse, setCollapse] = useState(false);
  return (
    <Layout.Sider
      collapsible
      breakpoint="md"
      width="250"
      style={{ paddingTop: 64 }}
      collapsed={collapse}
      onCollapse={(e) => setCollapse(!collapse)}
    >
      <Profile />
      <Menu
        theme={color}
        mode="inline"
        defaultSelectedKeys={[browserHistory.location.pathname]}
        defaultOpenKeys={links
          .filter((l) =>
            l.type === "multiple"
              ? l.pages.findIndex(
                  (p) => p.href === browserHistory.location.pathname
                ) !== -1
              : false
          )
          .map((p) => p.title)}
      >
        {links.map((link, index) => {
          if (link.type === "signle") {
            return (
              <Menu.Item key={link.href} className="customclass">
                <>
                  {link.icon}
                  <span> {link.title}</span>
                  <Link to={link.href} />
                </>
              </Menu.Item>
            );
          } else {
            return (
              <Menu.SubMenu
                key={link.title}
                title={
                  <span>
                    {link.icon}
                    {/* <Icon type={link.icon} /> */}
                    <span>{link.title}</span>
                  </span>
                }
              >
                {link.pages.map((p, index2) => (
                  <Menu.Item key={p.href}>
                    <strong> {p.title}</strong>
                    <Link to={p.href} />
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            );
          }
        })}
      </Menu>
    </Layout.Sider>
  );
}
