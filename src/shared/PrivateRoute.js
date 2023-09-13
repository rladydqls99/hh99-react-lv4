import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../cookies/cookies";

const PrivateRoute = () => {
  const access = getCookie("accessToken");
  const isLogin = !!access;

  return isLogin ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} {...alert("접근할 수 없는 페이지입니다.")} />
  );
};

const PublicRoute = () => {
  const access = getCookie("accessToken");
  const isLogin = !!access;

  return !isLogin ? (
    <Outlet />
  ) : (
    <Navigate to={"/main/:id"} {...alert("이미 로그인 되어있습니다.")} />
  );
};

export { PrivateRoute, PublicRoute };
