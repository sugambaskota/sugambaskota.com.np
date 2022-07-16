import { Form, Input, Button } from "antd";

import useChangePassword from "services/auth/useChangePassword";

export default function ChangePassword() {
  const [form] = Form.useForm();

  const changePassword = useChangePassword();

  const handleSubmit = async (values: object) => {
    try {
      await changePassword.mutateAsync(values);

      form.resetFields();
    } catch (error) {
      return;
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold lg:text-3xl">Change Password</h1>
      </div>
      <div className="mt-4">
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[
              {
                required: true,
                message: "Please enter your current password",
              },
            ]}
          >
            <Input.Password placeholder="Enter current password" size="large" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              {
                required: true,
                message: "Please enter your new password",
              },
            ]}
          >
            <Input.Password placeholder="Enter new password" size="large" />
          </Form.Item>
          <Form.Item
            name="newPasswordConfirmation"
            label="Confirm Password"
            dependencies={["newPassword"]}
            rules={[
              {
                required: true,
                message: "Please enter your new password again",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Enter confirm password" size="large" />
          </Form.Item>
          <div className="flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={changePassword.isLoading}
            >
              <span className="text-base font-medium">Change Password</span>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
