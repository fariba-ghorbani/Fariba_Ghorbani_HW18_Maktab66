import React, {useState, useEffect, useRef, useContext} from 'react'
import Signup from './Signup'
import Login from './Login'
import { Authentication } from '../Context/authentication'

function ManageForms() {
    const [formstatus, setStatus] = useState(true)
    const { currentUser } = useContext(Authentication)
    
    console.log("manage form")

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
            {currentUser? "hello": "bye"}
        </div>
    )
}

export default ManageForms;
