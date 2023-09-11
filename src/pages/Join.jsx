import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTodo, getUsers } from '../api/todolist';
import { useMutation, useQueryClient, useQuery } from 'react-query';

function Join() {
  // 네비게이트
  const navigate = useNavigate();

  // id와 pw 상태관리 --------------------------

  const [userID, setUserID] = useState('');
  const [userPW, setUserPW] = useState('');

  // ----------------------------------------

  // 리액트 쿼리 관련 코드
  const queryClient = useQueryClient();
  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('');
      console.log('성공했습니다.');
    },
  });

  // 회원정보
  const { isLoading, data } = useQuery('users', getUsers);
  if (isLoading) {
    return <h1>로딩중입니다..</h1>;
  }

  const usersInfo = data.data;
  console.log(usersInfo);

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
    const repeatId = usersInfo.filter((user) => user.userId === userID);
    if (repeatId.length > 0) {
      alert('중복된 id 입니다. 다른 값으로 입력해주세요.');
      return;
    }
    const newTodo = {
      userId: userID,
      userPw: userPW,
    };
    mutation.mutate(newTodo);
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
        <button onClick={onClickButton}>회원가입</button>
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
