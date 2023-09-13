import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Join from "../pages/Join";
import Main from "../pages/Main";
import { CookiesProvider } from "react-cookie";
import { getCookie } from "../cookies/cookies";
import PrivateRoute from "./PrivateRoute";

function Router() {
  const access = getCookie("accessToken");
  console.log(access);

  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/join" element={<Join />}></Route>
          <Route
            path="/main/:id"
            element={
              <PrivateRoute authenticated={access} component={<Main />} />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default Router;
