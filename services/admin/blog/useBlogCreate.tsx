import { useMutation, useQueryClient } from "react-query";

import mutator from "services/mutator";
import queryKeys from "reactQuery/constants";
import { handleSuccess } from "utils/handler/success";

export default function useBlogCreate() {
  const queryClient = useQueryClient();

  return useMutation((data) => mutator("POST", "/api/admin/blogs", data), {
    onSuccess: (data) => {
      handleSuccess(data);
      queryClient.invalidateQueries(queryKeys.admin.blogs);
    },
  });
}
