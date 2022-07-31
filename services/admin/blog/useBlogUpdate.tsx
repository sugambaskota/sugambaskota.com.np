import { useMutation, useQueryClient } from "@tanstack/react-query";

import mutator from "services/mutator";
import queryKeys from "reactQuery/constants";
import { handleSuccess } from "utils/handler/success";

export default function useBlogUpdate() {
  const queryClient = useQueryClient();

  return useMutation(
    (data: any) => mutator("PUT", `/api/admin/blogs/${data.id}`, data.payload),
    {
      onSuccess: (data) => {
        handleSuccess(data);
        queryClient.invalidateQueries([queryKeys.admin.blogs]);
      },
    }
  );
}
