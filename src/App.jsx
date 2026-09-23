import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Menu from './pages/menu/Menu'
import Layout from './components/layout/Layout'
import Cart from './pages/cart/Cart'
import Checkout from './pages/checkout/Checkout'
import OrderConfirmation from './pages/order-confirmation/OrderConfirmation'

function App() {


  return (

    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path='/register' element={<Register />} />
        <Route path='/menu' element={<ProtectedRoute>
          <Menu />

        </ProtectedRoute>}>
        </Route>
        <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>}>
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/checkout' element={<Checkout/>}></Route>
        <Route path='/order-confirmation' element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
      </Route>
    </Routes>
  )
}

export default App
