import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './component/Home';
import Header from './component/Header';
import Login from './component/Login';
import Registration from './component/Registration';
import Profile from './component/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <>
    <ToastContainer/>
      <Router>
      <Header />
        <Routes> 
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Registration/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
