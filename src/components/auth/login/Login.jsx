import React from 'react'
import { FaArrowRight, FaLock } from 'react-icons/fa'
import { FiArrowRight, FiEye, FiLock, FiMail, FiSmartphone, FiVoicemail } from 'react-icons/fi'
import { MdEmail, MdSmartphone } from 'react-icons/md'
function Login() {
  return (
    <div>
        <div>
      <form className='signup-form' >
        <div className='reg-method'>
          <div> <FiSmartphone /> Ethiopian Mobile(+251)</div>
          <div><FiMail /> Email Address</div>
        </div>
        <div>
          <div><span>Mobile Number</span>
          <span>Ethio Telecom /Safaricom</span>
          </div>
          <div>
            <select >
              <option value="+251">+251</option>
            </select>
            <input/>
          </div>
          <div><span>Secret Password/PIN</span>
          </div>
          <div>
            <FiLock color='black' />
            <input type="text" />
            <FiEye/>
          </div>
          <div>
            <span><input type='checkbox' /> Remember me on this phone </span>
            <span>Forgot PIN?</span>

          </div>
          <div>
            <button>Sign In to Mesob House <FiArrowRight/></button>
          </div>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Login