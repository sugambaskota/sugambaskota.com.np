import { useQuery } from "@tanstack/react-query";

import queryKeys from "reactQuery/constants";
import fetcher from "services/fetcher";

export default function useContactMessages(queryParams: any) {
  const query = new URLSearchParams(
    JSON.parse(JSON.stringify(queryParams))
  ).toString();

  return useQuery([queryKeys.admin.contactMessages, queryParams], () =>
    fetcher(`/api/admin/contact-messages?${query}`)
  );
}
