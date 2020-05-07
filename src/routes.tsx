import React, { ReactElement } from "react";
import { RouteComponentProps } from "react-router-dom";
import { ClientList, ClientCreate } from "./apps/clients";
import { contactList, contactCreate } from "./apps/clients/contact";

interface RouteProps {
  path: string;
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

export const routes: RouteProps[] = [
  {
    component: ClientList,
    path: "/clients/list",
  },
  {
    component: ClientCreate,
    path: "/clients/new",
  },
  {
    path: "/clients/contacts/list",
    component: contactList,
  },
  {
    path: "/clients/contacts/new",
    component: contactCreate,
  },
];
