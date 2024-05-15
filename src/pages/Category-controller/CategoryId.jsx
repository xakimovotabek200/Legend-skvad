import { Empty, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DeleteItemController from "../Item-type-controller/DeleteItemController";
import EditItemController from "../Item-type-controller/EditItemController";
import PostId from "./PostId";

const { Search } = Input;

const CategoryId = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const fetchItemTypeCategory = async () => {
    try {
      const response = await axios.get(`/item-types/category/${id}`);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchItemTypeCategory();
  }, []);

  return (
    <div>
      <PostId />
      <div className="grid  sm:grid-cols-3 justify-center gap-4">
        {data?.length > 0 ? (
          data?.map((item) => {
            return (
              <div
                className="bg-white border mt-5 rounded-md shadow-md px-4 flex flex-col-2 items-center p-4 justify-between"
                key={item?.id}
              >
                <Link
                  to={`/item-controller/${item.id}`}
                  className="text-xl font-semibold"
                  state={item}
                >
                  {item?.name}
                </Link>
                <div className="mt-4">
                  <DeleteItemController
                    id={item.id}
                    getData={fetchItemTypeCategory}
                  />
                  <EditItemController
                    data={item}
                    id={item.id}
                    getData={fetchItemTypeCategory}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-3">
            <div className="flex flex-col items-center gap-3">
              <Empty />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryId;
