import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getUsers } from '../api/todolist';
import { useQuery } from 'react-query';

function Login() {
  const navigate = useNavigate();

  // id와 pw 상태관리 --------------------------
  const [userID, setUserID] = useState('');
  const [userPw, setUserPw] = useState('');

  const { isLoading, data } = useQuery('users', getUsers);
  if (isLoading) {
    return <h1>로딩중입니다..</h1>;
  }


  const login = () => {
    let matchId = data.filter((user) => user.userId === userID);
    let matchPw = data.filter((user) => user.userPw === userPw);
    if (matchId.length > 0) {
      if (matchPw.length > 0) {
        navigate(`/main/${matchId[0].id}`);
      } else {
        alert('일치하는 비밀번호가 없습니다.');
      }
    } else {
      alert('일치하는 아이디가 없습니다.');
    }
    console.log(matchId, matchPw);
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
        <button onClick={login}>로그인</button>
        <button
          onClick={() => {
            navigate('/join');
          }}
        >
          회원가입
        </button>
      </div>
    </>
  );
}

export default Login;
