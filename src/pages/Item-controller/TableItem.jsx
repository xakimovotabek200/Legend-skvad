import React, { useState } from "react";
import { Button, Empty, Form, Input, Modal } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

const TableItem = ({ data, nomi, fetchData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (values) => {
    const deleteData = {
      itemType: modalData?.itemType,
      categoryId: modalData?.categoryId,
      description: modalData?.description,
      quantity: parseInt(values.delete),
      adminId: modalData?.userId,
    };
    await axios
      .delete("/items", deleteData)
      .then((response) => {
        fetchData();
        toast.success("Yuborish muvaffaqiyatli amalga oshirildi");
      })
      .catch((error) => {
        toast.error("Xatolik yuz berdi:", error);
      });
  };

  return (
    <div className="mt-5">
      <table className="w-full bg-white border text-black">
        <thead>
          <tr className="border">
            <th className="border p-3">#</th>
            <th className="border p-3">itemType</th>
            <th className="border p-3">userId</th>
            <th className="border p-3">categoryId</th>
            <th className="border p-3">quantity</th>
            <th className="border p-3">updatedAt</th>
            <th className="border p-3">createdAt</th>
            <th className="border p-3">
              <span className="fa-solid fa-info" />
            </th>
          </tr>
        </thead>

        <tbody>
          {data?.length > 0 ? (
            data?.map((item, index) => {
              return (
                <tr key={item?.id} className="text-center">
                  <td className="border p-3">{index + 1}</td>
                  <td className="border p-3">
                    {nomi?.map?.(
                      (name) => name?.id === item?.itemType && name.name
                    )}
                  </td>

                  <td className="border p-3">{item?.userId}</td>
                  <td className="border p-3">
                    {
                      nomi?.find?.(
                        (name) => name?.category?.id === item?.categoryId
                      )?.category?.name
                    }
                  </td>
                  <td className="border p-3">{item?.quantity}</td>
                  <td className="border p-3">
                    {" "}
                    {item?.updatedAt?.slice?.(0, 10) +
                      ", " +
                      item.updatedAt?.slice?.(11, 16)}
                  </td>
                  <td className="border p-3">
                    {item?.createdAt?.slice?.(0, 10) +
                      ", " +
                      item.createdAt?.slice?.(11, 16)}
                  </td>
                  <td className="border p-3">
                    <Button
                      danger
                      type="primary"
                      onClick={() => {
                        showModal(), setModalData(item);
                      }}
                    >
                      Olish
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7}>
                <div className="flex flex-col items-center gap-3">
                  <Empty />
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Modal
        title="Maxsulot turini yaratish"
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Form onFinish={handleDelete}>
          <Form.Item
            name="delete"
            label="Miqdorni kiriting"
            rules={[{ required: true, message: "miqdorni kriting!!!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full"
              size="large"
              type="primary"
            >
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TableItem;
