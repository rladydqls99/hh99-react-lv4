import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie, removeCookie } from '../cookie/cookie';
import axios from 'axios';
import { isLogin } from '../api/todolist';
import styled from 'styled-components';

function Main() {
  const paramsId = useParams().id;

  const { isLoading, data } = useQuery('todos', getTodos);

  if (isLoading) {
    return <h1>로딩중입니다..</h1>;
  }
  return (
    <div>
      <h1>Main</h1>
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
