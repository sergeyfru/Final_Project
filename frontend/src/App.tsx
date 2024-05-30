// import {useState} from 'react'
import './App.css'
import Header from './components/Header.tsx'
import Game from './components/Game.tsx'
import { Route, Routes } from 'react-router-dom'
import LoginRegistration from './features/users/LoginRegistration.tsx'



function App() {

  return (
    <>

      <Header />
      <Routes>
        <Route path='/' element={<h2>Home</h2>} />
        <Route path='/home' element={<h2>Home</h2>} />
        <Route path='/login' element={<LoginRegistration page={'Login'}/>} />
        <Route path='/register' element={<LoginRegistration page={'Registration'}/>} />
        <Route path='/allgames' element={<Game />} />
        <Route path='/mygames' element={<h2>My Games</h2>} />
      </Routes>



    </>
  )
}

export default App
