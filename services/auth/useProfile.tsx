import { useQuery } from "@tanstack/react-query";

import queryKeys from "reactQuery/constants";
import fetcher from "services/fetcher";

export default function useProfile() {
  return useQuery(
    [queryKeys.auth.profile],
    () => fetcher("/api/auth/profile"),
    {
      staleTime: 60000,
    }
  );
}
