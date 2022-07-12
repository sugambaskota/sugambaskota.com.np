import * as React from "react";
import { Form, Input, Button } from "antd";
import { useRouter } from "next/router";

export default function LoginForm({ isLoading, onSubmit }: any) {
  const [form] = Form.useForm();
  const router = useRouter();

  React.useEffect(() => {
    if (router?.query?.email) {
      form.setFieldsValue({
        email: router?.query?.email,
      });
    }
  }, [form, router]);

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit} autoComplete="off">
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please enter your email",
          },
          {
            type: "email",
            message: "Please enter a valid email",
          },
        ]}
      >
        <Input size="large" placeholder="Enter email" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please enter your password",
          },
        ]}
      >
        <Input.Password size="large" placeholder="Enter password" />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={isLoading}
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}
