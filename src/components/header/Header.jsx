import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import styles from './Header.module.css'
import { useCart } from '../../hooks/useCart'

function Header() {
  const { user, logOutUser } = useAuth()
  const {cartCount,cartTotal}=useCart()
  const navigate = useNavigate()

  function handleLogout() {
    logOutUser()
    navigate('/login')
  }

  return (
    <div className={styles.header}>
      <Link to='/menu' className={styles.logo}>Mesob Habesha House</Link>

      {user ? (
        <div className={styles.navCart} >
          <nav className={styles.authenticatedNav}>
            <NavLink className={({ isActive }) => isActive ? styles.active : ''} to='/menu'>Menu</NavLink>
            <NavLink className={({ isActive }) => isActive ? styles.active : ''} to='/'>Featured Dish</NavLink>
            <NavLink className={({ isActive }) => isActive ? styles.active : ''} to='/'>Order & Cart</NavLink>
            <NavLink className={({ isActive }) => isActive ? styles.active : ''} to='/'>Delivery & Checkout</NavLink>
             <div className={styles.cart}>
              <div>{cartCount()} Items</div>
              <div className={styles.total}>{cartTotal()}</div>
            </div>
            <span>Hi, {user.name}</span>
           
            <button className={styles.logout} onClick={handleLogout}>Logout</button>
          </nav>

        </div>


      ) : (
        <nav className={styles.guest}>
          <NavLink  to='/login' className={({ isActive }) => isActive ? styles.signin && styles.active : styles.signin}>Sign In</NavLink>
          <NavLink to='/register' className={({ isActive }) => isActive ? styles.active : styles.signin}>Register</NavLink>
        </nav>
      )}
    </div>
  )
}

export default Header