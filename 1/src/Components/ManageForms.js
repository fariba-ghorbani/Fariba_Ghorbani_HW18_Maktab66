import React, { useState } from 'react'
import Signup from './Signup'
import Login from './Login'
import HigherOrderComponent from './HigherOrderComponent'


function ManageForms() {
    const [formstatus, setStatus] = useState(false)
    
    const toggleForms = (e) => {
        e.target.id==="login"? setStatus(false): setStatus(true)
    }

    return (
        <div className='form-container'>
            <div className='toggle-form d-flex text-center'>
                <div id="login" className={`toggle-form__box flex-fill ${!formstatus? "selected":""}`} onClick={toggleForms}>ورود</div>
                <div id="signup" className={`toggle-form__box flex-fill ${formstatus? "selected":""}`} onClick={toggleForms}>ثبت نام</div>
            </div>
            {formstatus? <Signup />:<Login />}
        </div>
    )
}

export default HigherOrderComponent(ManageForms);
