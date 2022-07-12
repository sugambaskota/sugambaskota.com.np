import * as React from "react";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AdminBreadcrumb() {
  const [currentCrumb, setCurrentCrumb] = React.useState<any>({});
  const router = useRouter();

  React.useEffect(() => {
    if (router?.isReady) {
      const theCrumb = CRUMBS[router.pathname];

      if (theCrumb) {
        setCurrentCrumb(theCrumb);
      }
    }
  }, [router]);

  const crumbItems = Object.keys(currentCrumb).map((item, index) => {
    if (Object.keys(currentCrumb).length === index + 1) {
      return <Breadcrumb.Item key="item">{item}</Breadcrumb.Item>;
    } else {
      return (
        <Breadcrumb.Item key={item}>
          <Link href={currentCrumb[item]}>
            <span role="button">{item}</span>
          </Link>
        </Breadcrumb.Item>
      );
    }
  });

  return (
    <Breadcrumb separator=">" className="text-lg">
      {crumbItems}
    </Breadcrumb>
  );
}

const CRUMBS: any = {
  "/admin": {
    Home: "/admin",
  },
  "/admin/blogs": {
    Home: "/admin",
    Blogs: "",
  },
  "/admin/blogs/create": {
    Home: "/admin",
    Blogs: "/admin/blogs",
    Create: "",
  },
  "/admin/blogs/[id]/edit": {
    Home: "/admin",
    Blogs: "/admin/blogs",
    Update: "",
  },
};
