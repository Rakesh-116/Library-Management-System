import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/UserPages/Home'
import Login from './components/Login'
import { useState } from 'react'

function App() {
   const [role,setRole]=useState('');
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setRole={setRole} />} />
          <Route path='/user' element={<Home role={role} />} />
          <Route path='/admin' element={<Home role={role} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
