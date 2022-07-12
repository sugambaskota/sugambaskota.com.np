import BlogForm from "components/admin/blog/form/BlogForm";
import { ADMIN_LAYOUT } from "constants/layout";
import { ADMIN } from "constants/role";

export default function AdminBlogEditPage() {
  return (
    <div>
      <BlogForm mode="edit" />
    </div>
  );
}

AdminBlogEditPage.config = {
  protected: true,
  role: ADMIN,
  layout: ADMIN_LAYOUT,
};
