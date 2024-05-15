import { Button, Form, Input, Modal, Select, Table, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TableItem from "../Item-controller/TableItem";

const IdItem = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [data, setData] = useState([]);
  const [nomi, setNomi] = useState([]);
  const [qidir, setQidir] = useState([]);
  const [miqdori, setMiqdori] = useState("");
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { Search } = Input;
  const user_id = sessionStorage.getItem("user_id");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await add();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const search = async (inputValue) => {
    try {
      const response = await axios.get(`/items/search?name=${inputValue}`);
      setQidir(response.data?.data);
      // setMaterial(response.data);

      console.log(response.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    search();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/items");
      setData(response.data?.data?.filter((item) => item.itemType === +id));
    } catch (error) {
      toast.error("Ma'lumotlarni olishda xatolik yuz berdi");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const productData = async () => {
      try {
        const response = await axios.get("/item-types");
        setNomi(response.data.data);
      } catch (error) {
        toast.error("Mahsulotlar ma'lumotlarini olishda xatolik yuz berdi");
      }
    };

    productData();
  }, []);

  const add = async (e) => {
    try {
      const sendData = {
        itemType: parseInt(id),
        description: description,
        quantity: parseInt(miqdori),
        adminId: +user_id,
        categoryId: parseInt(state?.category?.id),
      };
      const response = await axios.post("/items", sendData);
      if (response.status === 200) {
        fetchData();
        e.target.reset();
        toast.success("Ma'lumot muvaffaqiyatli qo'shildi");
      } else {
        toast.error(
          "Ma'lumot qo'shishda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring."
        );
      }
    } catch (error) {
      toast.error("Xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.");
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <Button onClick={() => navigate(-1)} size="large">
          Orqaga
        </Button>
        <Search
          placeholder="Qidiruv matnini kiriting"
          allowClear
          enterButton="Qidirish"
          size="large"
          onChange={(e) => search(e.target.value)} // Change here
          className="w-[500px] bg-blue-500 rounded-md"
        />
        <Button
          className="bg-blue-500"
          type="primary"
          onClick={showModal}
          size="large"
        >
          Qo'shish
        </Button>
        <Modal
          title="Asosiy Modal"
          open={isModalOpen}
          onOk={handleOk}
          okButtonProps={{ className: "bg-blue-500" }}
          onCancel={handleCancel}
        >
          <Form onFinish={handleOk}>
            <div className="w-full flex flex-col gap-4">
              {/* <Select
                className="w-full"
                placeholder="Mahsulot"
                onChange={(value) => setNomiId(value)}
              >
                {nomi.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select> */}
              <Input
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tavsif"
              />
              <Input
                placeholder="Miqdor"
                type="number"
                onChange={(e) => setMiqdori(e.target.value)}
              />
            </div>
            <Button type="primary" htmlType="submit" className="w-full mt-5">
              Jo'natish
            </Button>
          </Form>
        </Modal>
      </div>
      <TableItem data={data} nomi={nomi} fetchData={fetchData} />
    </div>
  );
};

export default IdItem;
