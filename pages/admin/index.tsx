import Dashboard from "components/admin/dashboard/Dashboard";
import { ADMIN_LAYOUT } from "constants/layout";
import { ADMIN } from "constants/role";

export default function AdminDashboardPage() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}

AdminDashboardPage.config = {
  protected: true,
  role: ADMIN,
  layout: ADMIN_LAYOUT,
};
