import { Empty } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const Index = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function getData() {
    await axios
      .get("/transactions")
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
    <div>
      <table className="w-full bg-white border text-black">
        <thead>
          <tr className="border">
            <th className="border p-3">#</th>
            <th className="border p-3">itemTypeId</th>
            <th className="border p-3">userId</th>
            <th className="border p-3">categoryId</th>
            <th className="border p-3">quantity</th>
            <th className="border p-3">actionDate</th>
            <th className="border p-3">actionType</th>
          </tr>
        </thead>

        <tbody>
          {data?.length > 0 ? (
            data?.map((item, index) => {
              return (
                <tr key={item?.id}>
                  <td className="border p-3">{index + 1}</td>
                  <td className="border p-3">{item?.itemTypeId}</td>
                  <td className="border p-3">{item?.userId}</td>
                  <td className="border p-3">{item?.categoryId}</td>
                  <td className="border p-3">{item?.quantity}</td>
                  <td className="border p-3">{item?.actionDate}</td>
                  <td className="border p-3">{item?.actionType}</td>
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
