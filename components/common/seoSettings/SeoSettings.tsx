import { Form, Input, Select } from "antd";

export default function SeoSettings() {
  return (
    <div>
      <Form.Item label="Meta Title" name="seoTitle">
        <Input placeholder="Enter meta title" />
      </Form.Item>
      <Form.Item label="Meta Description" name="seoDescription">
        <Input.TextArea
          autoSize={{ minRows: 2 }}
          placeholder="Enter meta description"
        />
      </Form.Item>
      <Form.Item label="Meta Robots" name="metaRobots">
        <Select placeholder="Choose meta robots">
          <Select.Option value="noindex,nofollow">
            noindex,nofollow
          </Select.Option>
          <Select.Option value="index,follow">index,follow</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Canonical Link" name="canonical">
        <Input placeholder="Enter canonical link" />
      </Form.Item>
    </div>
  );
}
