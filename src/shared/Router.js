import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Join from "../pages/Join";
import Main from "../pages/Main";
import { CookiesProvider } from "react-cookie";
import { getCookie } from "../cookies/cookies";
import { PrivateRoute, PublicRoute } from "./PrivateRoute";

function Router() {
  const access = getCookie("accessToken");
  console.log(!!access);

  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Login />}></Route>
            <Route path="/join" element={<Join />}></Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/main/:id" element={<Main />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default Router;
