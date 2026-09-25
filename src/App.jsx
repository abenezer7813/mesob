import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/layout/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import { lazy, Suspense } from 'react'

const Register=lazy(()=>import ('./pages/register/Register'))
const Checkout = lazy(() => import('./pages/checkout/Checkout'))
const OrderConfirmation = lazy(() => import('./pages/order-confirmation/OrderConfirmation'))
const DishDetail = lazy(() => import('./pages/menu/DishDetail'))
const Cart =lazy(()=> import  ( './pages/cart/Cart'))
const Menu=lazy( ()=>import ('./pages/menu/Menu'))
const Login=lazy(()=>import ( './pages/login/Login'))

function App() {


  return (
<Suspense fallback={ <div style={{ padding: '80px', textAlign: 'center' }}>Loading...</div>}>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/menu" replace />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/menu' element={<Suspense fallback={ <div style={{ padding: '80px', textAlign: 'center' }}>Loading...</div>}><ErrorBoundary><Menu /></ErrorBoundary></Suspense>} />
        <Route path='/menu/:id' element={<Suspense fallback={ <div style={{ padding: '80px', textAlign: 'center' }}>Loading...</div>}><DishDetail /></Suspense>} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path='/order-confirmation' element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
      </Route>
    </Routes>
    </Suspense>
  )
}

export default App
