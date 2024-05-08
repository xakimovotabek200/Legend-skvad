import { Button, Form, Input, Modal, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostItemController = ({ getData }) => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`/item-types/${id}`);
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
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
      await axios.post("/item-types", {
        name: values.name,
        categoryId: parseInt(id),
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
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item
            label="Nomi"
            name="name"
            rules={[
              {
                required: true,
                message: "Please select a name!",
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
