import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const isValidToken = !!token;

        if (isValidToken) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);
  return (
    <div>
      {" "}
      <h1 className="text-3xl  font-bold underline">Hello world!</h1>
      {/* <div>
          {isLoggedIn ? <Router /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        </div> */}
    </div>
  );
};

export default App;
