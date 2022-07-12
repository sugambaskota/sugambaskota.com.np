import { useSession, signOut } from "next-auth/react";

import type { NextPage } from "next";

const Home: NextPage = () => {
  const session = useSession();

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      {session?.data?.user && <button onClick={() => signOut()}>Logout</button>}
    </div>
  );
};

export default Home;
