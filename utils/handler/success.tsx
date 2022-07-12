import { notification } from "antd";

export const handleSuccess = (data: any) => {
  if (data?.title || data?.message) {
    return notification.success({
      message: data?.title || "",
      description: data?.message || "",
    });
  }

  notification.success({
    message: "Success",
    description: "",
  });
};
