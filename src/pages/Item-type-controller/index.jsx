import { Empty } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteItemController from "./DeleteItemController";
import EditItemController from "./EditItemController";
import PostItemController from "./PostItemController";
import { Link } from "react-router-dom";

const Index = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function getData() {
    await axios
      .get("/item-types")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="">
      <PostItemController getData={getData} />
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
                >
                  {item?.name}
                </Link>
                <div className="mt-4">
                  <DeleteItemController id={item.id} getData={getData} />
                  <EditItemController
                    data={item}
                    id={item.id}
                    getData={getData}
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

export default Index;
