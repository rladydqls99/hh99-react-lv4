import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getTodos } from '../api/todolist';

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
        {data &&
          data.map(
            (item) =>
              item.id === parseInt(paramsId) && (
                <div key={item.id}>{item.todo}</div>
              )
          )}
      </div>
    </div>
  );
}

export default Main;
