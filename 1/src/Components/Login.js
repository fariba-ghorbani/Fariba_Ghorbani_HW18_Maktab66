import React, { useState } from 'react'
import { BiHide, BiShow } from 'react-icons/bi'
import { useFormik } from "formik";
import * as Yup from 'yup'

const Login = () => {
    const [passwordBool, setPasswordBool] = useState(true)

    const changeIcon = () => {
        setPasswordBool(prev => !prev)
    }

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email('آدرس پست الکترونیکی نامعتبر است')
            .required('لطفا پست الکترونیکی خود را وارد کنید'),
        password: Yup.string()
            .min(6, 'کلمه عبور باید حداقل دارای 6 کاراکتر باشد')
            .required('لطفا کلمه عبور را وارد کنید'),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        validationSchema: LoginSchema,

        onSubmit: (values, { setSubmitting }) => {
            // console.log(values);
            // setSubmitting(false);
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

                {/* {formErrors.ultimateMSG? <p className='log-error error mt-2'>{formErrors.ultimateMSG}</p>: null} */}
                <button className="submit mt-3" type='submit' disabled={formik.isSubmitting}>ورود</button>
            </form>
        </>
    )
}

export default Login;
