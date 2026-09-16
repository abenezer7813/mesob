import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Menu from './pages/menu/Menu'

function App() {


  return (

    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path='/register' element={<Register />} />
      <Route path='/menu' element={<ProtectedRoute>
        <Menu />
      </ProtectedRoute>}></Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App
