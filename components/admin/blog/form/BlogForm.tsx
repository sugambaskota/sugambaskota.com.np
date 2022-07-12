import * as React from "react";
import { Form, Input, Checkbox, Select, Button } from "antd";
import { useRouter } from "next/router";

import useBlog from "services/admin/blog/useBlog";
import useBlogCreate from "services/admin/blog/useBlogCreate";
import useBlogUpdate from "services/admin/blog/useBlogUpdate";
import Editor from "components/common/form/editor/Editor";
import SeoSettings from "components/common/seoSettings/SeoSettings";
import TableSkeleton from "components/skeleton/TableSkeleton";

export default function BlogForm({ mode }: any) {
  const [form] = Form.useForm();
  const router = useRouter();

  const { isLoading, data } = useBlog({
    id: router?.query?.id,
  });

  React.useEffect(() => {
    const initialFormValues = {
      title: data?.data?.title || "",
      image: data?.data?.image || "",
      shortDescription: data?.data?.shortDescription || "",
      tags: data?.data?.tags?.length > 0 ? data?.data?.tags : [],
      status: data ? (data?.data?.status === true ? true : false) : true,
      description: data?.data?.description || "",
      seoTitle: data?.data?.seoTitle || "",
      seoDescription: data?.data?.seoDescription || "",
      metaRobots: data?.data?.metaRobots || undefined,
      canonical: data?.data?.canonical || "",
    };

    form.setFieldsValue(initialFormValues);
  }, [form, data]);

  const blogCreate = useBlogCreate();
  const blogUpdate = useBlogUpdate();

  const onSubmit = async (values: any) => {
    if (mode === "create") {
      try {
        await blogCreate.mutateAsync(values);
        form.resetFields();
      } catch (error) {
        return;
      }
    }

    if (mode === "edit") {
      try {
        await blogUpdate.mutateAsync({
          id: data?.data?._id,
          payload: values,
        });
        form.resetFields();
      } catch (error) {
        return;
      }
    }

    return router.push("/admin/blogs");
  };

  return (
    <div>
      <div className="text-3xl font-semibold">
        {mode === "create" ? "Create" : "Update"} Blog
      </div>
      <div className="mt-4">
        {isLoading && <TableSkeleton />}
        <Form
          layout="vertical"
          form={form}
          onFinish={onSubmit}
          hidden={isLoading}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please enter blog title",
              },
            ]}
          >
            <Input size="large" placeholder="Enter blog title" />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: "Please enter an image link",
              },
            ]}
          >
            <Input size="large" placeholder="Enter image link" />
          </Form.Item>
          <Form.Item name="status" valuePropName="checked">
            <Checkbox>Is Active</Checkbox>
          </Form.Item>
          <Form.Item
            label="Tags"
            name="tags"
            rules={[
              {
                required: true,
                message: "Please enter at least one tag",
              },
            ]}
          >
            <Select
              mode="tags"
              size="large"
              placeholder="Type each tag and hit enter"
              dropdownStyle={{ display: "none" }}
            />
          </Form.Item>
          <Form.Item
            label="Short Description"
            name="shortDescription"
            rules={[
              {
                required: true,
                message: "Please enter short description",
              },
            ]}
          >
            <Input.TextArea
              size="large"
              autoSize={{ minRows: 2 }}
              placeholder="Enter short description"
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            valuePropName="setContents"
            rules={[
              {
                required: true,
                message: "Please enter blog description",
              },
              {
                validator: async (_, value) => {
                  if (value === "<p><br></p>") {
                    return Promise.reject("Please enter blog description");
                  }
                },
              },
            ]}
          >
            <Editor placeholder="Type blog description here..." />
          </Form.Item>
          <div>
            <div className="my-2 border-b border-neutral-200 pb-1">
              SEO Settings
            </div>
            <SeoSettings />
          </div>
          <div className="flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={blogCreate.isLoading || blogUpdate.isLoading}
            >
              <span className="text-base font-medium">
                {mode === "create" ? "Create" : "Update"} Blog
              </span>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
