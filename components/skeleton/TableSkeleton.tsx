import { Space, Skeleton } from "antd";

export default function TableSkeleton() {
  return (
    <Space direction="vertical" size="middle" className="w-full">
      <Skeleton.Button active={true} block={true} />
      <Skeleton.Button active={true} block={true} />
      <Skeleton.Button active={true} block={true} />
      <Skeleton.Button active={true} block={true} />
      <Skeleton.Button active={true} block={true} />
    </Space>
  );
}
