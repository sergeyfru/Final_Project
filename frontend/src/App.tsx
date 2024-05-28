// import { useState } from 'react'
import './App.css'
import Users from './feattures/users/Users'
import { Route,Routes } from 'react-router-dom'



function App() {
  // const [count, setCount] = useState(0)

  return (
    <>

    <Routes>
<Route path='/' element={<Users />}/>
   
    </Routes>
    </>
  )
}

export default App
