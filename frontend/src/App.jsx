
import { useState } from 'react'

import './App.css'
import SignUp from './SignUp'
import { CssBaseline, Typography } from '@mui/material'
import SignIn from './SignIn'
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import Home from './Home'
import Navbar from './components/navbar'
import Palette from './components/palette'
import Messages from './messages/Messages'
import Profile from './profile/Profile'
import Dashboard from './Dashboard'
import Explore from './Explore'

function App() {

  return (
    <>
    <CssBaseline/>
    <BrowserRouter>
    <ConditionalNavbar/>
      <Routes>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/signin' element={<SignIn/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/messages' element={<Messages/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/explore' element={<Explore/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

function ConditionalNavbar() {
  const location = useLocation();
  // Define paths where Navbar should not be displayed
  const hideNavbarPaths = ['/signup', '/signin'];

  // If the current path is in the hideNavbarPaths array, don't render the Navbar
  if (hideNavbarPaths.includes(location.pathname)) {
    return null;
  }

  return <Navbar />;
}

export default App
