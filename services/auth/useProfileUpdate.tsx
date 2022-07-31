import { useMutation, useQueryClient } from "@tanstack/react-query";

import mutator from "services/mutator";
import queryKeys from "reactQuery/constants";
import { handleSuccess } from "utils/handler/success";

export default function useProfileUpdate() {
  const queryClient = useQueryClient();

  return useMutation((data: any) => mutator("PUT", "/api/auth/profile", data), {
    onSuccess: (data) => {
      handleSuccess(data);
      queryClient.invalidateQueries([queryKeys.auth.profile]);
    },
  });
}
