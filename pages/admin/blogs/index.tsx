import Blogs from "components/admin/blog/Blogs";
import { ADMIN_LAYOUT } from "constants/layout";
import { ADMIN } from "constants/role";

export default function AdminBlogsPage() {
  return (
    <div>
      <Blogs />
    </div>
  );
}

AdminBlogsPage.config = {
  protected: true,
  role: ADMIN,
  layout: ADMIN_LAYOUT,
};
