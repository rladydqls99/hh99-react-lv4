import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// 회원가입
const addUser = async (userInfo) => {
  const result = await axios.post(`http://3.38.191.164/register`, userInfo);
  console.log(result);
};

// 로그인
const getUsers = async () => {
  const response = await axios.post(`http://3.38.191.164/login`);
  return response.data;
};

// 유저 인증 확인
const getTodos = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user`);
  return response.data;
};

//
const getData = async () => {
  const accessToken = cookies.get('accessToken');
  console.log('accessToken : ', accessToken);
  const response = await axios.get('http://3.38.191.164/user', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log('response : ', response);
};
export { getUsers, getTodos, addUser, getData };
