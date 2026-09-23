import { useState } from 'react'
import styles from './Register.module.css'
import { FiArrowRight, FiEye, FiLock, FiMail } from 'react-icons/fi'
import { registerUser } from '../../services/authService'
import { data, useNavigate } from 'react-router-dom'
import { BsFilePerson } from 'react-icons/bs'
import { email, z } from "zod"

function Register() {
    const registerSchema = z.object({
        name: z.string().min(1,'Name can not be empty').min(2, 'Name too short'),
        email: z.email('Invalid email'),
        password: z.string("password cannot be empty").min(6, 'Password must be at least 6 characters'),
        confirmPassword:z.string().min(1, 'Please confirm your password')
    }).refine((data)=>data.password===data.confirmPassword,{
        message:'Passwords do not match',
        path:['confirmPassword']
    });
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState({})

    function handleSubmit(e) {
        e.preventDefault()
        const result = registerSchema.safeParse(form)
        console.log(result);
        const validationErrors = {}
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                validationErrors[issue.path[0]] = issue.message
            })
        }
        if (Object.keys(validationErrors).length === 0) {
            try {
                registerUser({
                    name: result.data.name,
                    email: result.data.email,
                    password: result.data.password,
                })
                setErrors({})
                navigate('/login')


            } catch (err) {
                setErrors({ email: err.message })
            }
        } else {
            setErrors(validationErrors)
        }
    }
   

    return (
        <div className={styles.registerPage}>
            <div>
                <h1>Create Your Mesob House Account</h1>
                <p>Join our culinary circle in less than  a minute</p>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                    <label htmlFor="name">Full Name</label>
                    <div className={styles.inputs}>
                        <BsFilePerson />
                        <input type="text" name='name' id='name' placeholder='Abenezer Tariku'
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            value={form.name} />
                    </div>
                </div>
                <p className={styles.errors}>{errors.name}</p>
                <div>
                    <label htmlFor="email">
                        Email Address
                    </label>
                    <div className={styles.inputs}>
                        <FiMail />
                        <input type='email' name="email" id="email" placeholder='example@gmail.com'
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            value={form.email} />
                    </div>
                </div>
                <p className={styles.errors}>{errors.email}</p>
                <div className={styles.passwordInputs}>
                    <div>
                        <label htmlFor="pass">Password</label>
                        <div className={styles.inputs}>
                            <FiLock />
                            <input type='password' id='pass' name='pass'
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                value={form.password} />
                            <FiEye />

                        </div>
                        <p className={styles.errors}>{errors.password}</p>
                    </div>
                    <div>
                        <label htmlFor="confirm">Confirm Password</label>
                        <div className={styles.inputs}>
                            <FiLock />
                            <input
                                type='password' id='confirm'
                                name='confirm'
                                value={form.confirmPassword}
                                onChange={(e) => {
                                    setForm({ ...form, confirmPassword: e.target.value })
                                }} />
                            <FiEye />
                        </div>
                        <p className={styles.errors}>{errors.confirmPassword}</p>
                    </div>
                </div>

                <div className={styles.createBtn}>
                    <button type='submit'>
                        Create Account <FiArrowRight />
                    </button>
                </div>

            </form>
            <div className={styles.line}></div>
            <div>
                <p>Already par tof our dinning family? </p>
                <p className={styles.login} onClick={() => navigate('/login')}>Sign in here</p>
            </div>
        </div>
    )
}

export default Register