import { Button, Layout, Menu, theme } from "antd";
import React, { useLayoutEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { hiddenroutes, routes } from "./routes";

const index = () => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { Header, Sider, Content } = Layout;

  useLayoutEffect(() => {
    window.scroll({ left: 0, top: 0 });
  }, [pathname]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem(
      <Link to={"/"}> Bosh sahifa</Link>,
      "1",
      <span className="fa-solid fa-home" />
    ),
    getItem(
      <Link to={"/category-controller"}>Category-controller</Link>,
      "2",
      <span className="fa-solid fa-cubes" />
    ),
    getItem("material", "sub1", <span className="fa-solid fa-shirt" />, [
      getItem(
        <Link to={"/material-controller"}>material-controller</Link>,
        "3"
      ),
      getItem(
        <Link to={"/material-tranzaction"}>material-tranzaction</Link>,
        "4"
      ),
      getItem(
        <Link to={"/material-type-controller"}>material-type-controller</Link>,
        "5"
      ),
      getItem(<Link to="/mat-cat-controller">mat-cat-controller</Link>, "11"),
      getItem(<Link to="/material-controller">material-controller</Link>, "55"),
    ]),
    getItem("item", "sub2", <span className="fa-solid fa-home" />, [
      getItem(<Link to="/item-controller">item-controller</Link>, "8"),
      getItem(<Link to="/item-tranzaction">item-tranzaction</Link>, "6"),
      getItem(
        <Link to="/item-type-controller">item-type-controller</Link>,
        "85"
      ),
    ]),
    getItem(
      <Link to="/user-controller">user-controller</Link>,
      "9",
      <span className="fa-solid fa-user" />
    ),
  ];

  return (
    <div>
      <Layout className="h-screen">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            className="flex justify-between "
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              icon={
                collapsed ? (
                  <span
                    className="fa-solid fa-indent"
                    style={{ color: "#4299e1" }}
                  />
                ) : (
                  <span
                    className="fa-solid fa-outdent"
                    style={{ color: "#4299e1" }}
                  />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Button
              type="primary"
              danger
              onClick={() => {
                sessionStorage.clear();
                window.location.reload();
              }}
              className="m-3"
            >
              <div className="flex items-center gap-2 ">
                <span className="fa-solid fa-right-from-bracket" />
                <p>Chiqish</p>
              </div>
            </Button>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              {routes?.map((route, ind) => (
                <Route key={ind} path={route.path} element={route.element} />
              ))}
              {hiddenroutes?.map((route, ind) => (
                <Route key={ind} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default index;
