import { Empty } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import UsersControllerDelete from "./UsersControllerDelete";
import PostCategory from "./UsersControllerPost";

const Index = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function getData() {
    await axios
      .get("/users")
      .then((response) => {
        setData(response.data);
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
      <PostCategory getData={getData} />
      <table className="w-full bg-white text-black">
        <thead>
          <tr className="border">
            <th className="border p-3">#</th>
            <th className="border p-3">username</th>
            <th className="border p-3">password</th>
            <th className="border p-3">
              <span className="fa-solid fa-info text-black" />
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data?.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td className="border p-3">{index + 1}</td>
                  <td className="border p-3">{item?.username}</td>
                  <td className="border text-center p-3">***************</td>
                  <td className="border text-center p-3">
                    <UsersControllerDelete id={item.id} getData={getData} />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={11}>
                <div className="flex flex-col items-center gap-3">
                  <Empty />
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
