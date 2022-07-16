import ProfileForm from "components/auth/profileForm/ProfileForm";
import { ADMIN_LAYOUT } from "constants/layout";
import { ADMIN } from "constants/role";

export default function AdminProfilePage() {
  return (
    <div>
      <ProfileForm />
    </div>
  );
}

AdminProfilePage.config = {
  protected: true,
  role: ADMIN,
  layout: ADMIN_LAYOUT,
};
