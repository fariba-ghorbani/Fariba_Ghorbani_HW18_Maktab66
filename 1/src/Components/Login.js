import React, { useState, useContext } from 'react'
import { BiHide, BiShow } from 'react-icons/bi'
import { useFormik } from "formik";
import LoginSchema from '../Validation/Loginschema';
import { Authentication } from '../Context/authentication';

const Login = () => {
    const [passwordBool, setPasswordBool] = useState(true)
    const [message, setMessage] = useState("")
    const { accounts, changeCurrentUser } = useContext(Authentication)

    const changeIcon = () => {
        setPasswordBool(prev => !prev)
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: LoginSchema,

        onSubmit: (values, { setSubmitting, resetForm }) => {
            let idx = accounts.findIndex(user => user.email === values.email && user.password === values.password)
            if (idx >= 0) {
                changeCurrentUser(accounts[idx])
                setMessage("")
                resetForm()
            } else {
                setMessage("پست الکترونیکی یا کلمه عبور وارد شده اشتباه است")
            }
            setSubmitting(false);
        }
    })

    return (
        <>
            <h2 className='title text-center my-4'>خوش آمدید</h2>
            <form onSubmit={formik.handleSubmit}>

                <div className="field mb-3">
                    <input 
                    placeholder="پست الکترونیک"
                    type="text" 
                    name="email" 
                    value={formik.values.email} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email && <p className='error mt-2'>{formik.errors.email}</p>}
                </div>
                
                <div className="field mb-3">
                    <div className="wrapper">
                        <input 
                        placeholder="کلمه عبور" 
                        type={passwordBool? "password":"text"} 
                        name="password" 
                        value={formik.values.password} 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />

                        <span>{passwordBool? 
                        <BiHide className="icon" onClick={changeIcon}/> : <BiShow className="icon" onClick={changeIcon}/>}</span>
                    </div>

                    {formik.errors.password && formik.touched.password && <p className='error mt-2'>{formik.errors.password}</p>}
                </div>

                {<p className="log-error error mt-2 mb-0">{message}</p>}
                <button className="submit mt-3" type='submit' disabled={formik.isSubmitting}>ورود</button>
            </form>
        </>
    )
}

export default Login;
