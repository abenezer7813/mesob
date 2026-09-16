import React, { useState } from 'react'
import { FaArrowRight, FaLock } from 'react-icons/fa'
import { FiArrowRight, FiEye, FiLock, FiMail, FiSmartphone } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/authService'
import { useAuth } from '../../hooks/useAuth'
function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const userContext=useAuth()
  function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate(form)
    if(Object.keys(validationErrors).length===0){
      try {
        const res=login(form)
        userContext.loginUser(res)
        navigate('/menu')
        setErrors([])
        
      } catch (error) {
        console.log(error.message)
        setErrors({login:error.message})
        
      }
    }else{

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

    <div className='login-page'>
      <form onSubmit={handleSubmit}>
        <div className='reg-method'>
          <div> <FiSmartphone /> Ethiopian Mobile(+251)</div>
          <div> Email Address</div>
        </div>
        <div>
          <div>
            <label htmlFor='email'>Email</label>
            <div>
              < FiMail /><input type='email' id='email' name='email'
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                value={form.email} />
            </div>
          </div>
          <div><p>{errors.email}</p></div>

          <div>
            <label htmlFor='pass'>Password</label>
            <div>
              <FiLock color='black' />
              <input type="text" id='pass' name='pass'
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                value={form.password} />
              <FiEye />
            </div>
          </div>
          <div><p>{errors.password}</p></div>
           <div><p>{errors.login}</p></div>
          <div>
            <span><input type='checkbox' /> Remember me on this phone </span>
            <span>Forgot PIN?</span>

          </div>
          <div>
            <button type='submit'>Sign In to Mesob House <FiArrowRight /></button>
          </div>
        </div>
      </form>
      <div><span>New to our dining family?</span>
        <p onClick={() => navigate('/register')}>Join the Mesob Table & Register </p></div>
    </div>
  )
}

export default Login