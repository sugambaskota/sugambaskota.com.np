import { useMutation, useQueryClient } from "@tanstack/react-query";

import mutator from "services/mutator";
import queryKeys from "reactQuery/constants";
import { handleSuccess } from "utils/handler/success";

export default function useContactMessageDelete() {
  const queryClient = useQueryClient();

  return useMutation(
    (id) => mutator("DELETE", `/api/admin/contact-messages/${id}`),
    {
      onSuccess: (data) => {
        handleSuccess(data);
        queryClient.invalidateQueries([queryKeys.admin.contactMessages]);
      },
    }
  );
}
