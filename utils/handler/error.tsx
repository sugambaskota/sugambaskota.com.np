import { notification } from "antd";
import { signOut } from "next-auth/react";

const notifyError = (error: any) =>
  notification.error({
    message: error?.response?.data?.title || "Something went wrong",
    description: error?.response?.data?.message || "",
  });

export const handleError = (error: any) => {
  if (error?.response?.status === 404) {
    return;
  }

  if (error?.response?.status === 401) {
    notifyError(error);
    return signOut();
  }

  notifyError(error);
};
