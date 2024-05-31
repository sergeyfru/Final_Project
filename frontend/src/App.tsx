// import {useState} from 'react'
import './App.css'
import Header from './components/Header.tsx'
import Game from './components/Game.tsx'
import { Route, Routes } from 'react-router-dom'
import Registration from './features/users/Registration.tsx'
import Login from './features/users/Login.tsx'
import Home from './components/Home.tsx'



function App() {

  return (
    <>

      <Header />
      <Routes>
        <Route path='/' element={<h2>Home</h2>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/login' element={<Login page={'Login'}/>} />
        <Route path='/register' element={<Registration page={'Registration'}/>} />
        <Route path='/allgames' element={<Game />} />
        <Route path='/mygames' element={<h2>My Games</h2>} />
      </Routes>



    </>
  )
}

export default App
