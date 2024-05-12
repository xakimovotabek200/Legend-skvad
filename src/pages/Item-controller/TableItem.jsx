import React, { useState } from "react";
import { Button, Empty } from "antd";

const TableItem = ({ data, nomi }) => {
  console.log(nomi, "nomi");
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
                <tr key={item?.id}>
                  <td className="border p-3">{index + 1}</td>
                  <td className="border p-3">
                    {item[0]?.id}
                    {/* {nomi?.map?.(
                      (item) => item?.id === item?.itemType && item.name
                    )} */}
                  </td>

                  <td className="border p-3">{item?.userId}</td>
                  <td className="border p-3">{item?.categoryId}</td>
                  <td className="border p-3">{item?.quantity}</td>
                  <td className="border p-3">
                    {" "}
                    {item?.updatedAt.slice(0, 10) +
                      ", " +
                      item.updatedAt.slice(11, 16)}
                  </td>
                  <td className="border p-3">
                    {item?.createdAt.slice(0, 10) +
                      ", " +
                      item.createdAt.slice(11, 16)}
                  </td>
                  <td className="border p-3">
                    <Button type="primary">olish</Button>
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
    </div>
  );
};

export default TableItem;
