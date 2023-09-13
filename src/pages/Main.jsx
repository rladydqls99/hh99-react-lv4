import React, { useState, useEffect } from "react";
import { getCookie, removeCookie } from "../cookies/cookies";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Main() {
  const [data, setData] = useState(null);

  // 쿠키값과 일치하는 데이터 불러오기
  const getData = async () => {
    try {
      const accessToken = getCookie("accessToken");
      const response = await axios.get(`http://3.38.191.164/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setData(response);
    } catch (err) {
      console.log("에러메세지", err);

      if (err.response && err.response.status === 401) {
        alert("토큰이 만료되었습니다. 다시 로그인해주세요");
        removeCookie("accessToken");
        navigate("/");
      }
    }
  };

  // 로그아웃 실행
  const navigate = useNavigate();
  const logOut = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      removeCookie("accessToken");
      navigate("/");
    }
  };

  // useEffect로 바로 출력
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <button onClick={logOut}>로그아웃</button>
      {data && (
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Main;
