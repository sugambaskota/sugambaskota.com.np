import { useSession } from "next-auth/react";

export default function Dashboard() {
  const session = useSession();

  return (
    <div className="text-xl capitalize">
      Hello, {session?.data?.user?.name}!
    </div>
  );
}
