import React, { createContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );

  const [loading, setLoading] = useState(true);

  const loginUser = async e => {
    e.preventDefault();
    // let response = await fetch("http://127.0.0.1:8000/auth/token/", {
    let response = await fetch("http://127.0.0.1:8000/auth/jwt/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });

    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      setLoading(false);
      // window.location.reload(true);
      // navigate("/profile");
    } else {
      alert("Something went wrong while trying to log in.");
    }
  };

  // const updateToken = async () => {
  //   let response = await fetch("http://127.0.0.1:8000/auth/token/refresh/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ refresh: authTokens?.refresh }),
  //   });

  //   let data = await response.json();

  //   if (response.status === 200) {
  //     setAuthTokens(data);
  //     setUser(jwtDecode(data.access));
  //     localStorage.setItem("authTokens", JSON.stringify(data));
  //   } else {
  //     logoutUser();
  //   }
  //   if (loading) {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (localStorage.getItem("authTokens")) {
  //     if (loading) {
  //       updateToken();
  //     }
  //     const fiveMinutes = 1000 * 60 * 5;
  //     let interval = setInterval(() => {
  //       if (authTokens) {
  //         updateToken();
  //       }
  //     }, fiveMinutes);
  //     return () => clearInterval(interval);
  //   } else {
  //     setLoading(false);
  //   }
  // }, [loading, authTokens]);

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    // navigate("/");
  };
  const contextData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
    authTokens: authTokens,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
