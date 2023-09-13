import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { setCookie, removeCookie } from '../cookie/cookie';
import styled from 'styled-components';
import { isLogin } from '../api/todolist';

function Login() {
  const navigate = useNavigate();

  // id와 pw 상태관리 --------------------------

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  
  const getUserId = (e) => {
    const { value } = e.target;
    setId(value);
  };
  const getUserPw = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  // 로그인 ---------------------------------------------
  const handleLogin = async () => {
    try {
      const response = await axios.post(`http://3.38.191.164/login`, {
        id,
        password,
      });
      console.log(response);

      // 쿠키 저장
      setCookie('accessToken', response.data.token, {
        path: '/',
        secure: true,
        maxAge: 3000,
      });
      alert(`반갑습니다. ${id}회원님`);
      navigate(`/main/${id}`);
    } catch (err) {
      alert(err.response.data.message);
    }
    setId('');
    setPassword('');
  };

  // ----------------------------------------
  if (!isLogin()) {
    return (
      <Wrap>
        <div style={{ fontSize: 40 }} className='title'>
          로그인 하기
        </div>
        <LoginBox>
          <h3>아이디</h3>
          <Input type='text' value={id} onChange={getUserId} />
          <h3>비밀번호</h3>
          <Input type='password' value={password} onChange={getUserPw} />

          <Button onClick={handleLogin}>로그인</Button>
          <Button
            onClick={() => {
              navigate('/join');
            }}
          >
            회원가입
          </Button>
        </LoginBox>
      </Wrap>
    );
  } else {
    return <div>로그아웃 후, 다시 방문해주세요.</div>;
  }
}

export default Login;

const Wrap = styled.div`
  width: 90%;
  height: 80%;
  margin: auto;
  display: flex;
  padding: 12px;
  flex-direction: column;

  .title {
    margin-bottom: 70px;
  }
`;

const LoginBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  box-sizing: border-box;
  height: 46px;
  width: 100%;
  outline: none;
  border-radius: 8px;
  padding: 0px 12px;
  font-size: 14px;
  border: 1px solid rgb(238, 238, 238);
`;

const Button = styled.button`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  flex-direction: row;
  flex-shrink: 0;
  border: 1px solid rgb(238, 238, 238);
  color: rgb(255, 255, 255);
  height: 46px;
  border-radius: 8px;
  background-color: rgb(254, 83, 31);
  cursor: pointer;
  width: 100%;
`;
