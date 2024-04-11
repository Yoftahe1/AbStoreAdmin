import { useState } from "react";

import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Typography, notification } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteDriver } from "../../api/driver";

const { Text } = Typography;
const { useNotification } = notification;

const DeleteModal = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const [api, contextHolder] = useNotification();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteDriver,
    onSuccess: () => {
      hideModal();
      queryClient.invalidateQueries({
        queryKey: ["Drivers"],
      });
    },
    onError: (error) => {
      showNotification(error.message);
    },
  });

  function showNotification(description: string) {
    api.error({
      message: "Error",
      description,
    });
  }

  function handleDelete() {
    mutate({ id });
  }

  function showModal() {
    setIsOpen(true);
  }
  function hideModal() {
    setIsOpen(false);
  }

  return (
    <>
      {contextHolder}
      <Button danger icon={<DeleteOutlined />} onClick={showModal} />
      <Modal
        title="Delete Driver"
        open={isOpen}
        onOk={handleDelete}
        onCancel={hideModal}
        okText="Delete"
        okButtonProps={{
          danger: true,
          disabled: isPending,
          loading: isPending,
        }}
      >
        <Text>This action can't be undone </Text>
        <br />
        <Text>Are you sure you want to delete this driver ?</Text>
      </Modal>
    </>
  );
};

export default DeleteModal;
