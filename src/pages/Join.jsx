import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Join() {
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

  // 서버통신 로그인
  const joinButtonHandler = async () => {
    try {
      const response = await axios.post(`http://3.38.191.164/register`, {
        id: userId,
        password: userPw,
      });
      alert("회원가입이 완료되었습니다.");
      navigate("/");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <>
      <h1>회원가입</h1>
      <div>
        <h3>아이디</h3>
        <input type="text" value={userId} onChange={getUserId} />
        <h3>비밀번호</h3>
        <input type="text" value={userPw} onChange={getUserPw} />
        <div>
          <button onClick={joinButtonHandler}>회원가입</button>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            로그인
          </button>
        </div>
      </div>
    </>
  );
}

export default Join;
