import React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DatePage from './pages/DatePage';
import TimePage from './pages/TimePage';
import SongPage from './pages/SongPage';
import DonatePage from './pages/DonatePage';
import FinalPage from './pages/FinalPage';
import ComponentPage from './pages/CommentPage';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<HomePage/>}></Route>
        <Route path='/datepage' element = {<DatePage/>}></Route>
        <Route path='/timepage' element = {<TimePage/>}></Route>
        <Route path='/songpage' element = {<SongPage/>}></Route>
        <Route path='/donatepage' element = {<DonatePage/>}></Route>
        <Route path='/commentpage' element = {<ComponentPage/>}></Route>
        <Route path = '/finalpage' element = {<FinalPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;