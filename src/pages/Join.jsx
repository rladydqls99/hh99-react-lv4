import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Cookies } from 'react-cookie';

function Join() {
  // 네비게이트
  const navigate = useNavigate();

  // id와 pw 상태관리 --------------------------

  const [userID, setUserID] = useState('');
  const [userPW, setUserPW] = useState('');

  // ----------------------------------------

  const postUser = async () => {
    console.log({
      userID,
      userPW,
    });
    const result = await axios.post(`http://3.38.191.164/register`, {
      id: userID,
      password: userPW,
    });
    console.log(result);
  };

  // ----------------------------------------


  const getUserId = (e) => {
    const { value } = e.target;
    setUserID(value);
  };
  const getUserPW = (e) => {
    const { value } = e.target;
    setUserPW(value);
  };

  // 회원가입 : 중복체크 후, db 에 저장
  const onClickButton = () => {
    // const repeatId = data.filter((user) => user.userId === userID);
    // if (repeatId.length > 0) {
    //   alert('중복된 id 입니다. 다른 값으로 입력해주세요.');
    //   return;
    // }
    const newUser = {
      userId: userID,
      userPw: userPW,
    };
    alert('회원가입 성공');
    navigate('/');
  };

  return (
    <>
      <h1>회원가입</h1>
      <div>
        <h3>아이디</h3>
        <input type='text' value={userID} onChange={getUserId} />
        <h3>비밀번호</h3>
        <input type='text' value={userPW} onChange={getUserPW} />
      </div>
      <div>
        <button onClick={postUser}>회원가입</button>
        <button
          onClick={() => {
            navigate('/');
          }}
        >
          로그인 페이지
        </button>
      </div>
    </>
  );
}

export default Join;
