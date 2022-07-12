import * as React from "react";
import { Button, Table, Input, Space, Image, Popconfirm, Tag } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";

import useBlogs from "services/admin/blog/useBlogs";
import useBlogDelete from "services/admin/blog/useBlogDelete";
import TableSkeleton from "components/skeleton/TableSkeleton";

export default function Blogs() {
  const [queryParams, setQueryParams] = React.useState({
    page: 1,
    limit: 10,
    search: undefined,
  });

  const router = useRouter();

  const { isLoading, data } = useBlogs(queryParams);
  const blogDelete = useBlogDelete();

  const handlePaginationChange = (paginationData: any) =>
    setQueryParams({
      ...queryParams,
      page: paginationData.current,
      limit: paginationData.pageSize,
    });

  const handleSearchChange = (value: any) => {
    if (value === "") {
      return setQueryParams({
        page: 1,
        limit: 10,
        search: undefined,
      });
    }
  };

  const handleSearch = (value: any) => {
    if (value === "") {
      return setQueryParams({
        page: 1,
        limit: 10,
        search: undefined,
      });
    }

    setQueryParams({
      page: 1,
      limit: 10,
      search: value,
    });
  };

  const handleDeleteBlog = async (blog: any) => {
    try {
      await blogDelete.mutateAsync(blog?._id);
    } catch (error) {
      return;
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (text: any, record: any) => (
        <a
          href={`/blogs/${record?.slug}`}
          target="_blank"
          rel="noreferrer noopener"
          className="text-neutral-600 hover:underline"
        >
          {text}
        </a>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image: any) => <Image src={image} alt="" width={75} />,
    },
    {
      title: "Is Active",
      dataIndex: "status",
      render: (status: boolean) => (
        <Tag color={status ? "green" : "orange"}>
          <span className="capitalize">{status ? "Yes" : "No"}</span>
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <a onClick={() => router.push(`/admin/blogs/${record?._id}/edit`)}>
            Edit
          </a>
          <Popconfirm
            title={`Are you sure you want to delete this blog?`}
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDeleteBlog(record)}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-3xl font-semibold">Blogs</h1>
        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="max-w-sm">
            <Input.Search
              allowClear
              placeholder="Search..."
              onChange={(e) => handleSearchChange(e.target.value)}
              onSearch={(value) => handleSearch(value)}
            />
          </div>
          <Link href="/admin/blogs/create">
            <a>
              <Button type="primary" size="middle">
                Add Blog
              </Button>
            </a>
          </Link>
        </div>
      </div>
      <div className="mt-6">
        {isLoading && <TableSkeleton />}
        {data && (
          <Table
            columns={columns}
            dataSource={data?.data?.data || data?.data || []}
            rowKey="_id"
            pagination={{
              current: data?.data?.page || queryParams.page,
              pageSize: data?.data?.limit || queryParams.limit,
              total: data?.data?.total,
            }}
            onChange={handlePaginationChange}
            scroll={{ x: true }}
          />
        )}
      </div>
    </div>
  );
}
