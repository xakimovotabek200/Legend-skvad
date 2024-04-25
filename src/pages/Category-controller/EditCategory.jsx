import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import axios from "axios";

const EditCategory = ({ data, getData, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await axios.put(`/categories/${id}`, {
        name: values.name,
      });
      setLoading(false);
      setIsModalOpen(false);
      setError(null);
      getData();
      values.target.reset();
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div>
      <span
        className="fa-solid fa-edit text-xl cursor-pointer text-blue-800"
        type="primary"
        onClick={showModal}
      />
      <Modal
        title="Maxsulot turini Taxrirlash"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
        name="basic"
        onFinish={handleSubmit}
        autoComplete="on"
      >
        <Form onFinish={handleSubmit}>
          <Form.Item
            label="Categoriya Nomi"
            name="name"
            rules={[
              {
                required: true,
                message: "Iltimos biron narsa yozing!",
              },
            ]}
          >
            <Input defaultValue={data?.name} />
          </Form.Item>
          {error && <p style={{ color: "red" }}>{error}</p>}{" "}
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full"
          >
            Taxrirlash
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default EditCategory;
