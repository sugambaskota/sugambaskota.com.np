import { useQuery } from "react-query";

import queryKeys from "reactQuery/constants";
import fetcher from "services/fetcher";

export default function useBlogs(queryParams: any) {
  const query = new URLSearchParams(
    JSON.parse(JSON.stringify(queryParams))
  ).toString();

  return useQuery([queryKeys.admin.blogs, queryParams], () =>
    fetcher(`/api/admin/blogs?${query}`)
  );
}
