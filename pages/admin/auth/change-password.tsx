import ChangePassword from "components/auth/changePassword/ChangePassword";
import { ADMIN_LAYOUT } from "constants/layout";
import { ADMIN } from "constants/role";

export default function AdminChangePasswordPage() {
  return (
    <div>
      <ChangePassword />
    </div>
  );
}

AdminChangePasswordPage.config = {
  protected: true,
  role: ADMIN,
  layout: ADMIN_LAYOUT,
};
