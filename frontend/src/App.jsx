
import { useState } from 'react'

import './App.css'
import SignUp from './SignUp'
import { Typography } from '@mui/material'
import SignIn from './SignIn'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/signin' element={<SignIn/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
