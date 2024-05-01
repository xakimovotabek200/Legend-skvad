import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import axios from "axios";

const EditItemController = ({ data, getData, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [form] = Form.useForm(); // Initialize Form instance

  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue({ name: data?.name }); // Set initial field values
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
      await axios.put(`/material-categories/${id}`, {
        name: values.name,
      });
      setLoading(false);
      setIsModalOpen(false);
      setError(null);
      getData();
      form.resetFields(); // Reset form fields
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
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={{ name: data?.name }}
        >
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
            <Input />
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

export default EditItemController;
