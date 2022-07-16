import { useState, useEffect } from "react";
import { Form, Input, Button, Switch } from "antd";

import useProfile from "services/auth/useProfile";
import useProfileUpdate from "services/auth/useProfileUpdate";

export default function ProfileForm() {
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();

  const { isLoading, data } = useProfile();
  const profileUpdate = useProfileUpdate();

  useEffect(() => {
    const initialFormValues = {
      name: data?.data?.name || "",
      image: data?.data?.image || "",
    };

    form.setFieldsValue(initialFormValues);
  }, [form, data]);

  const handleSubmit = async (values: object) => {
    try {
      await profileUpdate.mutateAsync(values);
      setEditMode(false);
    } catch (error) {
      return;
    }
  };

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-semibold lg:text-3xl">Profile</h1>
          <div className="flex items-center gap-1.5">
            <label htmlFor="profile_update" className="text-neutral-600">
              Edit
            </label>
            <Switch
              id="profile_update"
              checked={editMode}
              disabled={isLoading}
              onChange={(checked) => setEditMode(checked)}
            />
          </div>
        </div>
        <div className="mt-4">
          <Form.Item
            label="Full Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter your full name",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter your full name"
              disabled={!editMode}
            />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: "Please enter your profile image link",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter your profile image link"
              disabled={!editMode}
            />
          </Form.Item>

          {editMode && (
            <div className="flex justify-end">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={profileUpdate.isLoading}
              >
                <span className="text-base font-medium">Update</span>
              </Button>
            </div>
          )}
        </div>
      </Form>
    </div>
  );
}
