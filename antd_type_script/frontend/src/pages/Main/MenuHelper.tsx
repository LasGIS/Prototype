/*
 * Copyright (c) 2020. Prototype
 */

import React from "react";
import { DesktopOutlined, HomeOutlined, LaptopOutlined, UserOutlined } from "@ant-design/icons/lib/icons";
import Home from "../Home/Home";
import Optional from "../Optional/Optional";
import OptionalNotArg from "../Optional/OptionalNotArg";

export type SubmenuData = {
  type: 'submenu';
  key: string;
  name: string;
  icon?: React.ReactNode;
  subMenus: MenuData[];
};

export type OptionData = {
  type: 'option';
  key: string;
  name: string;
  pathname: string;
  icon?: React.ReactNode;
  component?: React.ReactNode;
  props?: any;
};

export type MenuData = SubmenuData | OptionData;

export type SelectedMenuData = {
  menu: OptionData;
  breadcrumbs: string[];
};

export const MENU_DATA: MenuData[] = [
  {
    type: 'option', key: "home", name: "Home", icon: <HomeOutlined/>,
    pathname: "/home", component: <Home/>
  }, {
    type: 'submenu', key: "sub1", name: "navigation 1", icon: <DesktopOutlined/>,
    subMenus: [ {
      type: 'option', key: "sub1-1", name: "Option 1", icon: <LaptopOutlined/>,
      pathname: "/sub1-option1", component: <Optional text="SUB1 OPTION1"/>
    }, {
      type: 'option', key: "sub1-2", name: "Option 2", icon: <LaptopOutlined/>,
      pathname: "/sub1-option2", component: <Optional text="SUB1 OPTION2"/>
    } ]
  }, {
    type: 'submenu', key: "sub2", name: "navigation 2", icon: <DesktopOutlined/>,
    subMenus: [ {
      type: 'option', key: "sub2-1", name: "Option 1", icon: <LaptopOutlined/>,
      pathname: "/sub2-option1", component: <Optional text="SUB2 OPTION1"/>
    }, {
      type: 'submenu', key: "sub22", name: "navigation 22", icon: <DesktopOutlined/>,
      subMenus: [ {
        type: 'option', key: "sub22-1", name: "Option 1", icon: <LaptopOutlined/>,
        pathname: "/sub22-option1", component: <Optional text="SUB2 SUB22 OPTION1"/>
      }, {
        type: 'option', key: "sub22-2", name: "Option 2", icon: <LaptopOutlined/>,
        pathname: "/sub22-option2", component: <Optional text="SUB2 SUB22 OPTION2"/>
      } ]
    }, {
      type: 'option', key: "sub2-3", name: "Option 3", icon: <LaptopOutlined/>,
      pathname: "/sub2-option3", component: <Optional text="SUB2 OPTION3"/>
    } ]
  }, {
    type: 'submenu', key: "sub3", name: "navigation 3", icon: <DesktopOutlined/>,
    subMenus: [ {
      type: 'option', key: "sub3-1", name: "Option 1", icon: <LaptopOutlined/>,
      pathname: "/sub3-option1", component: <Optional text="SUB3 OPTION1"/>
    }, {
      type: 'option', key: "sub3-2", name: "Option 2", icon: <LaptopOutlined/>,
      pathname: "/sub3-option2", component: <Optional text="SUB3 OPTION2"/>
    }, {
      type: 'option', key: "sub3-3", name: "OptionalNotArg", icon: <UserOutlined/>,
      pathname: "/sub3-option3", component: <OptionalNotArg/>
    } ]
  }
];

export const findSelectedMenuByPathname = (
  pathname: string, menuData: MenuData[], breadcrumbs?: string[]
): SelectedMenuData | undefined => {
  const selected = menuData.map(menu => {
    switch (menu.type) {
      case "submenu":
        const newBreadcrumbs: string[] = breadcrumbs ? [ ...breadcrumbs ] : [];
        newBreadcrumbs.push(menu.name);
        const selected = findSelectedMenuByPathname(pathname, menu.subMenus, newBreadcrumbs);
        if (selected) {
          return selected
        }
        break;
      case "option":
        if (pathname.startsWith(process.env.PUBLIC_URL + menu.pathname)) {
          const newBreadcrumbs: string[] = breadcrumbs ? breadcrumbs : [];
          newBreadcrumbs.push(menu.name);
          return {
            menu: menu,
            breadcrumbs: newBreadcrumbs
          }
        }
    }
    return undefined;
  }).filter(menu => menu);
  return selected.length ? selected[0] : undefined;
};
