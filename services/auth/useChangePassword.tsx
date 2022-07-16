import { useMutation } from "react-query";
import { signOut } from "next-auth/react";

import mutator from "services/mutator";
import { handleSuccess } from "utils/handler/success";

export default function useChangePassword() {
  return useMutation(
    (data: any) => mutator("PUT", "/api/auth/change-password", data),
    {
      onSuccess: (data) => {
        handleSuccess(data);
        signOut();
      },
    }
  );
}
