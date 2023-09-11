import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Join from '../pages/Join';
import Main from '../pages/Main';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/join' element={<Join />}></Route>
        <Route path='/main/:id' element={<Main />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default Router;
