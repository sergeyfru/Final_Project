// import {useState} from 'react'
import './App.css'
import Header from './components/Header.tsx'
import Game from './features/games/Game.tsx'
import { Route, Routes } from 'react-router-dom'
import Registration from './features/users/Registration.tsx'
import Login from './features/users/Login.tsx'
import Home from './components/Home.tsx'
import MyCollection from './features/games/MyCollection.tsx'
import Auth from './auth/Auth.tsx'





function App() {

  return (
<>
      <Header />
      <Routes>
        {/* <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login page={'Login'}/>} />
        <Route path='/register' element={<Registration page={'Registration'}/>} />
        <Route path='/allgames' element={<Game />} />
        <Route path='/mygames' element={<MyCollection />} /> */}
        
        <Route path='/' element={<Auth><Home /></Auth>} />
        <Route path='/home' element={<Auth><Home /></Auth>} />
        <Route path='/login' element={<Login page={'Login'}/>} />
        <Route path='/register' element={<Registration page={'Registration'}/>} />
        <Route path='/allgames' element={<Auth><Game /></Auth>} />
        <Route path='/mygames' element={<Auth><MyCollection /></Auth>} />
      </Routes>
</>

  )
}

export default App
