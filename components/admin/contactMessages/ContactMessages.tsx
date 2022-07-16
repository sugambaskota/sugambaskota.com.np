import * as React from "react";
import { Table, Input, Space, Modal } from "antd";
import { useRouter } from "next/router";

import useContactMessages from "services/admin/contactMessage/useContactMessages";
import useContactMessageDelete from "services/admin/contactMessage/useContactMessageDelete";
import TableSkeleton from "components/skeleton/TableSkeleton";
import ViewContactMessage from "./ViewContactMessage";

export default function ContactMessages() {
  const [queryParams, setQueryParams] = React.useState({
    page: 1,
    limit: 10,
    search: undefined,
  });
  const [activeContactMessage, setActiveContactMessage] = React.useState(null);
  const [showViewContactMessage, setShowViewContactMessage] =
    React.useState(false);

  const router = useRouter();

  const { isLoading, data } = useContactMessages(queryParams);
  const contactMessageDelete = useContactMessageDelete();

  const hideViewContactMessage = () => {
    setActiveContactMessage(null);
    setShowViewContactMessage(false);
  };

  const handleViewContactMessage = (contactMessage: any) => {
    setActiveContactMessage(contactMessage);
    setShowViewContactMessage(true);
  };

  const handleDeleteContactMessage = (contactMessage: any) =>
    Modal.confirm({
      closable: true,
      title: "Delete Contact Message",
      content: `Are you sure you want to delete the contact message from "${contactMessage?.name}" ?`,
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        await contactMessageDelete.mutateAsync(contactMessage?._id);
      },
    });

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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text: any) => text,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text: any) => text,
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (text: any) => text,
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      render: (text: any) => text,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <span role="button" onClick={() => handleViewContactMessage(record)}>
            View
          </span>
          <span
            role="button"
            onClick={() => handleDeleteContactMessage(record)}
          >
            Delete
          </span>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-3xl font-semibold">Messages</h1>
        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="max-w-sm">
            <Input.Search
              allowClear
              placeholder="Search..."
              onChange={(e) => handleSearchChange(e.target.value)}
              onSearch={(value) => handleSearch(value)}
            />
          </div>
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
              current: data?.data?.pagination?.page || queryParams.page,
              pageSize: data?.data?.pagination?.limit || queryParams.limit,
              total: data?.data?.pagination?.total,
            }}
            onChange={handlePaginationChange}
            scroll={{ x: true }}
          />
        )}
      </div>
      <ViewContactMessage
        visible={showViewContactMessage}
        hideModal={hideViewContactMessage}
        activeContactMessage={activeContactMessage}
      />
    </div>
  );
}
