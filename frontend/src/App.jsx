
import { useState } from 'react'

import './App.css'
import SignUp from './SignUp'
import { CssBaseline, Typography } from '@mui/material'
import SignIn from './SignIn'
import {BrowserRouter, Routes, Route, useLocation, Navigate} from 'react-router-dom'
import Navbar from './components/navbar'
import Palette from './components/palette'
import Messages from './messages/Messages'
import Profile from './profile/Profile'
import Dashboard from './Dashboard'
import Explore from './Explore'
import Settings from './settings/Settings'
import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'

function App() {

  const {data: authUser, isLoading} = useQuery({
    queryKey: ['authUser'],
    queryFn: async() => {
      try {
        const res = await fetch("/api/auth/me")
        const data = await res.json()

        if(data.error) return null

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong")
        }
        console.log("authUser is here:", data)
        return data

      } catch (error) {
        throw new Error(error)
      }
    },
    retry: false
  })

  // MAKE LOADING SCREEN
  if (isLoading) {
    return (
      <Typography> LOADING SCREEN </Typography>
    )
  }

  return (
    <>
    <CssBaseline/>
    {authUser && <Navbar/>}
      <Routes>
        <Route path='/' element={authUser ? <Dashboard/> : <Navigate to='/signin'/>}/>
        <Route path='/signup' element={!authUser ? <SignUp/> : <Navigate to='/'/>}></Route>
        <Route path='/signin' element={!authUser ? <SignIn/> : <Navigate to='/'/>}></Route>
        <Route path='/messages' element={authUser ? <Messages/> : <Navigate to='/signin'/>}></Route>
        <Route path='/profile' element={authUser ? <Profile/> : <Navigate to='/signin'/>}></Route>
        <Route path='/explore' element={authUser ? <Explore/> : <Navigate to='/signin'/>}></Route>
        <Route path='/settings' element={authUser ? <Settings/> : <Navigate to='/signin'/>}></Route>
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
