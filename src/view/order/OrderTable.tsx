import { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Space, Table, Tag, Typography, notification } from "antd";

import { findOneOrder } from "../../api/order";

const { Text } = Typography;
const { Column } = Table;
const { useNotification } = notification;

const OrderTable = () => {
  const { id } = useParams();
  const [api, contextHolder] = useNotification();

  function showNotification(description: string) {
    api.error({
      message: "Error",
      description,
    });
  }

  const { error, isLoading, isSuccess, data } = useQuery({
    queryKey: ["Order", { id }],
    queryFn: () => findOneOrder(id || ""),
  });

  useEffect(() => {
    if (error) {
      showNotification(error.message);
    }
  }, [error]);
  return (
    <>
      {contextHolder}
      <Table
        loading={isLoading}
        dataSource={isSuccess ? data.data.products : []}
        pagination={false}
        rowKey={(record) => record._id}
      >
        <Column
          title="Product"
          dataIndex="productId"
          key="product"
          render={({ name, images }: { name: string; images: string[] }) => (
            <Space>
              <Avatar src={images[0]} shape="square" />
              <Text>{name}</Text>
            </Space>
          )}
        />
        <Column
          title="Category"
          dataIndex="productId"
          key="category"
          render={({ category }: { category: string }) => (
            <Text>{category}</Text>
          )}
        />
        <Column
          title="Color"
          dataIndex="color"
          key="color"
          render={(text: string) => <Tag color={text}>{text}</Tag>}
        />
        <Column
          title="Price"
          dataIndex="productId"
          key="price"
          render={({ price }: { price: number }) => <Text>{price} ETB</Text>}
        />
        <Column
          title="Quantity"
          dataIndex="quantity"
          key="quantity"
          render={(text: string) => <Text>{text}</Text>}
        />
        <Column
          title="Sub-Total Price"
          key="subTotal"
          render={(
            _,
            record: { quantity: number; productId: { price: number } }
          ) => <Tag color="green">{record.quantity * record.productId.price} ETB</Tag>}
        />
      </Table>
    </>
  );
};

export default OrderTable;
