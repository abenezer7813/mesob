import { useState } from 'react'
import './Register.css'
import { FiArrowRight } from 'react-icons/fi'
import { registerUser } from '../../services/authService'

function Register() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState({})

    function handleSubmit(e) {
        e.preventDefault()
           const validationErrors = validate(form)
        if (Object.keys(errors).length === 0) {
            try {
                registerUser({
                    name: form.name,
                    email: form.email,
                    password: form.password,
                })
                setErrors({})


            } catch (err) {
                setErrors({ email: err.message })
            }
        } else {
            setErrors(validationErrors)
        }
    }
    function validate(form) {
        const errors = {}

        if (!form.name) errors.name = "Name cannot be empty"

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

        if (!form.confirmPassword) {
            errors.confirmPassword = "Please confirm your password"
        } else if (form.password !== form.confirmPassword) {
            errors.confirmPassword = "Passwords do not match"
        }

        return errors
    }

    return (
        <div className='register-page'>
            <div>
                <h1>Create Your Mesob HJouse Account</h1>
                <p>Join our culinary circle in less than  a minute</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Full Name</label>
                    <input type="text" name='name' id='name'
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        value={form.name} />
                </div>
                <p>{errors.name}</p>
                <div>
                    <label htmlFor="email">
                        Email Address
                    </label>
                    <input type='email' name="email" id="email"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        value={form.email} />
                </div>
                <p>{errors.email}</p>
                <div>
                    <div>
                        <label htmlFor="pass">Password</label>
                        <input type='password' id='pass' name='pass'
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            value={form.password} />
                        <p>{errors.password}</p>
                    </div>
                    <div>
                        <label htmlFor="confirm">Confirm Password</label>
                        <input
                            type='password' id='confirm'
                            name='confirm'
                            value={form.confirmPassword}
                            onChange={(e) => {
                                setForm({ ...form, confirmPassword: e.target.value })
                            }} />
                        <p>{errors.confirmPassword}</p>
                    </div>
                </div>

                <div>
                    <button type='submit'>
                        Create Account <FiArrowRight />
                    </button>
                </div>

            </form>
        </div>
    )
}

export default Register