import ContactMessages from "components/admin/contactMessages/ContactMessages";
import { ADMIN_LAYOUT } from "constants/layout";
import { ADMIN } from "constants/role";

export default function AdminContactMessagesPage() {
  return (
    <div>
      <ContactMessages />
    </div>
  );
}

AdminContactMessagesPage.config = {
  protected: true,
  role: ADMIN,
  layout: ADMIN_LAYOUT,
};
