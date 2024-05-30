// import {useState} from 'react'
import './App.css'
import Header from './components/Header.tsx'
import Game from './components/Game.tsx'
import { Route, Routes } from 'react-router-dom'


function App() {

  return (
    <>

      <Header />
      <Routes>
        <Route path='/' element={<h2>Home</h2>} />
        <Route path='/home' element={<h2>Home</h2>} />
        <Route path='/login' element={<h2>Login</h2>} />
        <Route path='/register' element={<h2>Register</h2>} />
        <Route path='/allgames' element={<Game />} />
        <Route path='/mygames' element={<h2>My Games</h2>} />
      </Routes>



    </>
  )
}

export default App
