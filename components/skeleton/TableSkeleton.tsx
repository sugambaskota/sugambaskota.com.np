import { Space, Skeleton } from "antd";

export default function TableSkeleton() {
  return (
    <Space direction="vertical" size="middle" className="w-full">
      {[1, 2, 3, 4, 5].map((item) => (
        <Skeleton.Button
          key={item}
          active={true}
          block={true}
          className="overflow-hidden rounded-md"
        />
      ))}
    </Space>
  );
}
