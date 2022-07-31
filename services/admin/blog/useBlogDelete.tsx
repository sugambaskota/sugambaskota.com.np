import { useMutation, useQueryClient } from "@tanstack/react-query";

import mutator from "services/mutator";
import queryKeys from "reactQuery/constants";
import { handleSuccess } from "utils/handler/success";

export default function useBlogDelete() {
  const queryClient = useQueryClient();

  return useMutation((id) => mutator("DELETE", `/api/admin/blogs/${id}`), {
    onSuccess: (data) => {
      handleSuccess(data);
      queryClient.invalidateQueries([queryKeys.admin.blogs]);
    },
  });
}
