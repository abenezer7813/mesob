import React, { useState } from 'react'
import { FaArrowRight, FaLock } from 'react-icons/fa'
import { FiArrowRight, FiEye, FiLock, FiMail, FiSmartphone } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'
import { login } from '../../services/authService'
import { useAuth } from '../../hooks/useAuth'
import styles from './Login.module.css'
function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const userContext = useAuth()
  const location = useLocation()

  function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate(form)
    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = login(form)
        userContext.loginUser(res)
        const redirectTo = location.state?.from?.pathname || '/menu'
        navigate(redirectTo, { replace: true })
        setErrors([])

      } catch (error) {
        console.log(error.message)
        setErrors({ login: error.message })

      }
    } else {

      setErrors(validationErrors)
    }

  }
  function validate(form) {
    const errors = {}
    if (!form.email) {
      errors.email = "Email cannot be empty"
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Enter a valid email address"
    }

    if (!form.password) {
      errors.password = "Password cannot be empty"
    } else if (form.password.length < 8) {
      errors.password = "Password must be at least 8 characters"
    }
    return errors

  }
  const navigate = useNavigate()
  return (

    <div className={styles.loginPage}>

      <h1>Welcome TO Mesob Table </h1>
      <p>Sign in to manage your feast ,Telebirr rewards ,and reserved dinning mesobs</p>

      <form onSubmit={handleSubmit}>
        <div className={styles.regMethod}>
          <div className={styles.active}><FiMail /> Email Address</div>
          <div> <FiSmartphone /> Ethiopian Mobile(+251)</div>
        </div>
        <div >
          <div >
            <label htmlFor='email'>Email</label>
            <div className={styles.inputs}>
              < FiMail size={20} />
              <input type='email' id='email' name='email'
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                value={form.email}
                placeholder='example@gmail.com' />
            </div>
          </div>
          <div className={styles.errors}><p>{errors.email}</p></div>

          <div >
            <label htmlFor='pass'>Password</label>
            <div className={styles.inputs}>
              <FiLock size={20} color='black' />
              <input type="text" id='pass' name='pass'
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                value={form.password}
                placeholder='*******' />
              <FiEye size={20} />
            </div>
          </div>
          <div className={styles.errors}><p>{errors.password}</p></div>
          <div className={styles.errors}><p>{errors.login}</p></div>
          <div className={styles.forgot}>
            <span><input className={styles.checkbox} type='checkbox' /> Remember me on this phone </span>
            <span className={styles.forgotPin}>Forgot PIN ?</span>

          </div>
          <div className={styles.signBtn}>
            <button type='submit'>Sign In to Mesob House <FiArrowRight /></button>
          </div>
        </div>
      </form>
      <div className={styles.line}></div>
      <div className={styles.register}>
        <p>New to our dining family?</p>
        <p className={styles.regLink} onClick={() => navigate('/register')}>Join the Mesob Table & Register </p>
      </div>
    </div>
  )
}

export default Login