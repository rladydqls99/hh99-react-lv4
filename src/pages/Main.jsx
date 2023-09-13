import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie, removeCookie } from '../cookie/cookie';
import axios from 'axios';
import { isLogin } from '../api/todolist';
import styled from 'styled-components';

function Main() {
  const navigate = useNavigate();

  // 로그아웃 --------------------------------------

  const logoutButton = () => {
    removeCookie('accessToken');
    navigate('/');
  };
  // 유저 인증 확인 ----------------------------------------

  const getData = async () => {
    try {
      const accessToken = getCookie('accessToken');
      console.log('accessToken : ', accessToken);
      const response = await axios.get(`http://3.38.191.164/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data.message);
    } catch (err) {
      if (err.response.status === 401) {
        alert(
          '토큰이 만료되었습니다. 토큰은 60분간 유지됩니다. 재로그인을 해주세요.'
        );
        logoutButton();
      }
      console.log(err.response);
    }
  };
  
  // ------------------------------------------------------------
  if (isLogin()) {
    return (
      <div>
        <h1>Main</h1>
        <Button onClick={getData}>데이터 가져오기</Button>
        <Button onClick={logoutButton}>로그아웃</Button>
      </div>
    );
  } else {
    return (
      <div>
        쿠키가 존재하지 않았습니다.
        <br />
        <br />
        로그인 페이지로 돌아가세요.
      </div>
    );
  }
}

export default Main;

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
