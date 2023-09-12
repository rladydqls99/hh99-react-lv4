import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function Login() {
  const navigate = useNavigate();

  // id와 pw 상태관리 --------------------------
  const [userID, setUserID] = useState('');
  const [userPw, setUserPw] = useState('');
  const [cookies, setCookies] = useCookies(['accessToken']);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`http://3.38.191.164/login`, {
        id: userID,
        password: userPw,
      });
      console.log(response);
      setCookies('accessToken', response.data.token);
    } catch (err) {
      console.log(err.response.data);
    }
    setUserID('');
    setUserPw('');
  };

  const getData = async () => {
    try {
      const accessToken = cookies.accessToken;
      // console.log('accessToken : ', accessToken);
      const response = await axios.get(`http://3.38.191.164/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data.message);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const getUserId = (e) => {
    const { value } = e.target;
    setUserID(value);
  };
  const getUserPw = (e) => {
    const { value } = e.target;
    setUserPw(value);
  };

  // ----------------------------------------

  return (
    <>
      <h1>로그인 하기</h1>
      <div>
        <h3>아이디</h3>
        <input type='text' value={userID} onChange={getUserId} />
        <h3>비밀번호</h3>
        <input type='password' value={userPw} onChange={getUserPw} />
      </div>
      <div>
        <button onClick={handleLogin}>로그인</button>
        <button
          onClick={() => {
            navigate('/join');
          }}
        >
          회원가입
        </button>
        <button onClick={getData}>데이터 가져오기</button>
      </div>
    </>
  );
}

export default Login;
