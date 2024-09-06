import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/UserPages/Home'
import Login from './components/Login'
import MyCollection from './pages/UserPages/MyCollection'
import { useState } from 'react'
import AddBook from './pages/AdminPages/AddBook'

function App() {
  const [role, setRole] = useState('');
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login setRole={setRole} />} />
          <Route path='/user/home' element={<Home role={role} />} />
          <Route path='/user/collection' element={<MyCollection role={role} />} />
          <Route path='/admin/home' element={<Home role={role} />} />
          <Route path='/admin/addBook' element={<AddBook />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
