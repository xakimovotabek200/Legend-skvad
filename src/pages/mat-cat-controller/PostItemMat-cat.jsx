import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import axios from "axios";

const PostItemController = ({ getData }) => {
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
      await axios.post("/material-categories", {
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
      <Button type="primary" onClick={showModal}>
        + Turi Yaratish
      </Button>
      <Modal
        title="Maxsulot turini yaratish"
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
            label="Categoriya Nomis"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input category name!",
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
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default PostItemController;
