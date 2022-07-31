import { Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineArticle } from "react-icons/md";
import { BiMessageAltDetail } from "react-icons/bi";

const determineDefaultOpenKeys = (router: any) => {
  return [];
};

export default function AdminLayoutSider({ closeMenu }: any) {
  const router = useRouter();

  return (
    <div>
      <div className="flex h-[80px] items-center justify-center pt-4">
        <a href="/" target="_blank">
          <img src="/logo_dark.png" alt="" className="w-[64px]" />
        </a>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[router?.pathname]}
        defaultOpenKeys={determineDefaultOpenKeys(router)}
        items={[
          {
            key: "/admin",
            label: <Link href="/admin">Dashboard</Link>,
            icon: <AiOutlineDashboard />,
            onClick: () => closeMenu(),
          },
          {
            key: "/admin/blogs",
            label: <Link href="/admin/blogs">Blogs</Link>,
            icon: <MdOutlineArticle />,
            onClick: () => closeMenu(),
          },
          {
            key: "/admin/contact-messages",
            label: <Link href="/admin/contact-messages">Messages</Link>,
            icon: <BiMessageAltDetail />,
            onClick: () => closeMenu(),
          },
        ]}
      />
    </div>
  );
}
