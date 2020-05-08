// import Location from "./icons/deal.png";
import React from "react";

import {
  PieChartFilled as Dashboard,
  FolderAddFilled as Location,
} from "@ant-design/icons";

interface LinkTypeBase {
  title: string;
  href: string;
  icon?: any;
}
export interface SingleLinkType extends LinkTypeBase {
  type: "signle";
}
export interface MultipleLinkType extends Omit<LinkTypeBase, "href"> {
  type: "multiple";
  pages: LinkTypeBase[];
}

export type LinkType = MultipleLinkType | SingleLinkType;

export const links: LinkType[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    type: "signle",
    icon: <Dashboard />,
  },
  {
    title: "Clients",
    type: "multiple",
    icon: <Location />,
    pages: [
      {
        title: "List des clients",
        href: "/clients/list",
      },
      {
        title: "Nouveau Client",
        href: "/clients/new",
      },
      {
        title: "contacts",
        href: "/clients/contacts/list",
      },
    ],
  },
  {
    title: "Park",
    type: "multiple",
    pages: [
      {
        href: "/park/vehicules/list",
        title: "List",
      },
      {
        href: "/park/vehicules/create",
        title: "Nouveau Véhicule",
      },
    ],
  },
];
