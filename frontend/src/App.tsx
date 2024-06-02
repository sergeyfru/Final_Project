// import {useState} from 'react'
import './App.css'
import Header from './components/Header.tsx'
import Game from './features/games/Game.tsx'
import { Route, Routes } from 'react-router-dom'
import Registration from './features/users/Registration.tsx'
import Login from './features/users/Login.tsx'
import Home from './components/Home.tsx'
import MyCollection from './features/games/MyCollection.tsx'
import { createContext, useContext, useState } from 'react'
import { AuthContextType, ProviderProps } from './types/type.ts'
import Auth from './auth/Auth.tsx'


export const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider = ({ children }: ProviderProps) => {
  const [token, setToken] = useState<string |number | null>(null)
  const [refreshToken, setRefreshToken] = useState<string |number | null>(null)
  return (
    <AuthContext.Provider value={{ token,refreshToken,setToken,setRefreshToken, }}>
      {children}
    </AuthContext.Provider>
  )
}
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}


function App() {

  return (
    <AuthProvider>

      <Header />
      <Routes>
        <Route path='/' element={<Auth><Home /></Auth>} />
        <Route path='/home' element={<Auth><Home /></Auth>} />
        <Route path='/login' element={<Login page={'Login'}/>} />
        <Route path='/register' element={<Registration page={'Registration'}/>} />
        <Route path='/allgames' element={<Auth><Game /></Auth>} />
        <Route path='/mygames' element={<Auth><MyCollection /></Auth>} />
      </Routes>



    </AuthProvider>
  )
}

export default App
