import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { setCookie } from "../cookies/cookies";

function Login() {
  const navigate = useNavigate();

  // id와 pw 상태관리 --------------------------
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  const getUserId = (e) => {
    const { value } = e.target;
    setUserId(value);
  };
  const getUserPw = (e) => {
    const { value } = e.target;
    setUserPw(value);
  };

  // 로그인하기
  const loginButtonHandler = async () => {
    try {
      const response = await axios.post(`http://3.38.191.164/login`, {
        id: userId,
        password: userPw,
      });
      if (response.data.token) {
        setCookie("accessToken", response.data.token);
      }
      alert("로그인이 완료되었습니다.");
      navigate(`/main/${userId}`);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <>
      <h1>로그인 하기</h1>
      <div>
        <h3>아이디</h3>
        <input type="text" value={userId} onChange={getUserId} />
        <h3>비밀번호</h3>
        <input type="password" value={userPw} onChange={getUserPw} />
        <div>
          <button onClick={loginButtonHandler}>로그인</button>
          <button
            onClick={() => {
              navigate("/join");
            }}
          >
            회원가입
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
