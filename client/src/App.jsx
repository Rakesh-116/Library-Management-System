import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/UserPages/Home'
import Login from './components/Login'
import MyCollection from './pages/UserPages/MyCollection'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<MyCollection />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
