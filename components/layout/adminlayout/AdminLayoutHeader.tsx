import * as React from "react";
import { Layout, Grid, Dropdown, Avatar, Menu } from "antd";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { AiOutlineUser } from "react-icons/ai";
import { CgMenuLeft } from "react-icons/cg";
import {
  RiMenuFoldFill,
  RiMenuUnfoldFill,
  RiArrowDownSLine,
} from "react-icons/ri";

export default function AdminLayoutHeader({
  collapsed,
  setCollapsed,
  openMenu,
}: any) {
  const session = useSession();

  const { Header } = Layout;
  const screens = Grid.useBreakpoint();

  const menu = (
    <Menu
      items={[
        {
          key: "profile",
          label: (
            <Link href="/admin/profile">
              <span>My profile</span>
            </Link>
          ),
        },
        {
          key: "change-password",
          label: (
            <Link href="/admin/auth/change-password">
              <span>Change Password</span>
            </Link>
          ),
        },
        {
          key: "logout",
          label: "Logout",
          onClick: () => signOut(),
        },
      ]}
    />
  );

  return (
    <Header
      className="fixed top-0 right-0 z-[999] h-auto bg-neutral-50 p-4 pb-0 transition-all duration-500"
      style={{
        left: screens.lg ? (collapsed ? 80 : 200) : 0,
      }}
    >
      <div className="flex h-[64px] items-center justify-between gap-2 rounded-md border border-neutral-50 bg-white px-4 py-2 shadow-lg">
        {screens.lg ? (
          collapsed ? (
            <RiMenuUnfoldFill
              size={24}
              onClick={() => setCollapsed(false)}
              className="inline-block cursor-pointer"
            />
          ) : (
            <RiMenuFoldFill
              size={24}
              onClick={() => setCollapsed(true)}
              className="inline-block cursor-pointer"
            />
          )
        ) : (
          <CgMenuLeft
            size={24}
            onClick={() => openMenu()}
            className="inline-block cursor-pointer"
          />
        )}
        <Dropdown overlay={menu} trigger={["click"]} placement="bottom">
          <div className="flex items-center justify-center" role="button">
            {session?.data?.user?.image ? (
              <Avatar
                src={session?.data?.user?.image}
                size={40}
                className="border border-neutral-100"
              />
            ) : (
              <Avatar
                icon={<AiOutlineUser />}
                size={36}
                className="inline-flex items-center justify-center"
              />
            )}
            {session?.data?.user?.name && (
              <span className="ml-1 text-base">
                {session?.data?.user?.name?.split(" ")[0]}
              </span>
            )}
            <RiArrowDownSLine size={18} className="inline-block" />
          </div>
        </Dropdown>
      </div>
    </Header>
  );
}
