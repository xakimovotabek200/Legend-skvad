import { Popconfirm, message } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const DeleteItemController = ({ id, getData }) => {
  async function handleDelete() {
    try {
      const res = await axios.delete(`/material-types/${id}`);
      if (res.status === 200) {
        getData();
        toast.info("O'chirildi!");
      }
    } catch (error) {
      toast.error("Nimadadir xatolik ketdi!");
    }
  }

  const confirm = () => {
    handleDelete();
  };

  return (
    <div>
      <Popconfirm
        title="Ogohlantirish siz bunga rozimisz?"
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <span className="fa-solid fa-trash cursor-pointer text-center text-red-500 text-xl" />
      </Popconfirm>
    </div>
  );
};

export default DeleteItemController;
