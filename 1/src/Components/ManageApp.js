import React, {useState, useEffect, useRef} from 'react'
import Signup from './Signup'
import Login from './Login'

function ManageRegistration() {
    const [formstatus, setStatus] = useState(true)
    

    const toggleForms = (e) => {
        e.target.id==="login"? setStatus(false): setStatus(true)
    }

    return (
        <div className='form-container'>
            <div className='toggle-form d-flex text-center'>
                <div id="login" className={`toggle-form__box flex-fill ${!formstatus? "selected":""}`} onClick={toggleForms}>ورود</div>
                <div id="signup" className={`toggle-form__box flex-fill ${formstatus? "selected":""}`} onClick={toggleForms}>ثبت نام</div>
            </div>
            <Login />
            <Signup />
        </div>
    )
}

export default ManageRegistration;
