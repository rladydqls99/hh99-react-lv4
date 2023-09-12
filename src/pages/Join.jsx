import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { isLogin } from '../api/todolist';
import styled from 'styled-components';

function Join() {
  // 네비게이트
  const navigate = useNavigate();

  // id와 pw 상태관리 --------------------------

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const getUserId = (e) => {
    const { value } = e.target;
    setId(value);
  };
  const getUserPW = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  // 회원가입 ----------------------------------------

  const postUser = async () => {
    try {
      const result = await axios.post(`http://3.38.191.164/register`, {
        id,
        password,
      });
      console.log(result);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  // ----------------------------------------

  if (!isLogin()) {
    return (
      <Wrap>
        <h1>회원가입</h1>
        <LoginBox>
          <h3>아이디</h3>
          <Input type='text' value={id} onChange={getUserId} />
          <h3>비밀번호</h3>
          <Input type='text' value={password} onChange={getUserPW} />

          <Button onClick={postUser}>회원가입</Button>
          <Button
            onClick={() => {
              navigate('/');
            }}
          >
            로그인 페이지
          </Button>
        </LoginBox>
      </Wrap>
    );
  } else {
    return <div>로그아웃 후, 다시 방문해주세요.</div>;
  }
}

export default Join;

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
