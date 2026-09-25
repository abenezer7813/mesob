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
import DishDetail from './pages/menu/DishDetail'
import ErrorBoundary from './components/ErrorBoundary'

function App() {


  return (

    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/menu" replace />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/menu' element={<ErrorBoundary><Menu /></ErrorBoundary>} />
        <Route path='/menu/:id' element={<DishDetail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path='/order-confirmation' element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
      </Route>
    </Routes>
  )
}

export default App
