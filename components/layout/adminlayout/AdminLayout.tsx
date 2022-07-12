import * as React from "react";
import { Layout, Grid } from "antd";

import AdminLayoutHeader from "./AdminLayoutHeader";
import AdminLayoutSider from "./AdminLayoutSider";
import AdminBreadcrumb from "components/common/breadcrumb/AdminBreadcrumb";

export default function AdminLayout({ children }: any) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { Content, Sider } = Layout;
  const screens = Grid.useBreakpoint();

  const openMenu = () => (!isMenuOpen ? setIsMenuOpen(true) : null);
  const closeMenu = () => (isMenuOpen ? setIsMenuOpen(false) : null);

  return (
    <Layout>
      {screens.lg && (
        <Sider
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="fixed top-0 bottom-0 left-0 overflow-auto border-r transition-all duration-500 ease-in-out"
        >
          <AdminLayoutSider closeMenu={closeMenu} />
        </Sider>
      )}
      <Layout
        className="bg-neutral-50 transition-all duration-500"
        style={{
          marginLeft: screens.lg ? (collapsed ? 80 : 200) : 0,
        }}
      >
        <AdminLayoutHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          openMenu={openMenu}
        />

        {/* Mobile menu overlay start */}
        <div
          onClick={closeMenu}
          className="fixed inset-0 z-[999] cursor-pointer bg-[rgba(0,0,0,0.5)] transition-all duration-500"
          style={{
            opacity: isMenuOpen ? 1 : 0,
            visibility: isMenuOpen ? "visible" : "hidden",
          }}
        />
        {/* Mobile menu overlay end */}

        {/* Mobile menu start */}
        <div
          className="fixed inset-0 z-[999] overflow-hidden bg-white transition-all duration-500"
          style={{
            width: isMenuOpen ? 200 : 0,
          }}
        >
          <div className="h-full w-full overflow-auto whitespace-nowrap text-stone-700">
            <AdminLayoutSider closeMenu={closeMenu} />
          </div>
        </div>
        {/* Mobile menu end */}

        <Content className="mt-[80px] flex flex-col p-4">
          <div className="px-2 pb-3">
            <AdminBreadcrumb />
          </div>
          <div className="flex-1 rounded-md border border-neutral-50 bg-white p-4 shadow-lg">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
