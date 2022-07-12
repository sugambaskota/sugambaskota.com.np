import BlogForm from "components/admin/blog/form/BlogForm";
import { ADMIN_LAYOUT } from "constants/layout";
import { ADMIN } from "constants/role";

export default function AdminBlogCreatePage() {
  return (
    <div>
      <BlogForm mode="create" />
    </div>
  );
}

AdminBlogCreatePage.config = {
  protected: true,
  role: ADMIN,
  layout: ADMIN_LAYOUT,
};
