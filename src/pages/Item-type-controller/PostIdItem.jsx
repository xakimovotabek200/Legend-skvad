import { Button, Form, Input, Modal, Select } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";

const { Option } = Select;

const PostItemController = ({ getData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  // Retrieve adminId from sessionStorage
  const adminId = sessionStorage.getItem("user_id");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/categories");
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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
      await axios.post("/items", {
        itemType: values.name,
        description: values.description,
        quantity: parseInt(values.quantity),
        adminId: parseInt(adminId),
        categoryId: parseInt(selectedCategoryId),
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
      <Button type="primary" onClick={showModal}>
        + Turi Yaratish
      </Button>
      <Modal
        title="Maxsulot turini yaratish"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item
            label="Categoriya Nomis"
            name="categoryId"
            rules={[
              {
                required: true,
                message: "Please select a category!",
              },
            ]}
          >
            <Select
              placeholder="Select a category"
              onChange={setSelectedCategoryId}
            >
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Tavsif"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input description!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input description!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Miqdori"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Please input quantity!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full"
          >
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default PostItemController;
