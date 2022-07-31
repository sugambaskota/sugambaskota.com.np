import { useQuery } from "@tanstack/react-query";

import queryKeys from "reactQuery/constants";
import fetcher from "services/fetcher";

export default function useBlog(data: any) {
  const id = data?.id;

  return useQuery(
    [queryKeys.admin.blogById, id],
    () => fetcher(`/api/admin/blogs/${id}`),
    {
      enabled: !!id,
    }
  );
}
