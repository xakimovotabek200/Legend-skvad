import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Login = ({ setIsLoggedIn }) => {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { email, password } = e.target;
      const response = await axios.post("auth/authenticate", {
        email: email.value,
        password: password.value,
      });
      if (response.data.access_token) {
        sessionStorage.setItem("token", response.data.access_token);
        sessionStorage.setItem("user_id", response.data?.id);
        window.location.reload();
        setIsLoggedIn(true);
      } else {
        toast.error("Hisobga kirishda xato.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Mavjud bo'lmagan hisob.");
      } else {
        toast.error("Hisobga kirishda xato.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-purple-700">
            O'zKOJ
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="label">
                <span className="text-base ">Foydalanuvchi nomi</span>
              </label>
              <input
                type="text"
                placeholder="Foydalanuvchi nomi"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
                name="email"
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base">Parol</span>
              </label>
              <input
                type="password"
                placeholder="Parolni kiriting *******"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
                name="password"
              />
            </div>

            <div>
              <button
                className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full focus:outline-none "
                disabled={loading}
              >
                {loading ? "Kirilmoqda..." : "Kirish"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
