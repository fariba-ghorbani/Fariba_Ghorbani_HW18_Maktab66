import React, { useContext, useEffect, useState } from "react";
import Province from "./Province";
import { BiHide, BiShow } from 'react-icons/bi'
import { useFormik } from "formik";
import SignupSchema from "../Validation/Signupschema";
import { Authentication } from "../Context/authentication";
import axios from "axios";

const Signup = () => {
    const [passwordBool, setPasswordBool] = useState(true)
    const [provinceData, setProvinceData] = useState("");
    const [message, setMessage] = useState("")
    const { accounts, changeCurrentUser, addUser} = useContext(Authentication)

    // get province data
    useEffect(() => {
        axios.get('/iranstates.json')
            .then(res => setProvinceData(res.data))
            .catch(err => console.log(err))
    }, [])

    const formik = useFormik({
        initialValues: {
            name: "",
            lastName: "",
            email: "",
            password: "",
            province: "",
            city: "",
            education: "",
            eduPlace: "",
        },
        validationSchema : SignupSchema,

        onSubmit: (values , { setSubmitting, resetForm }) => {
            setSubmitting(false);
            if (accounts.some(user => user.email === values.email)) {
                setMessage("یک حساب کاربری با این ایمیل قبلا ساخته شده است")
            } else {
                let newUser = ({...values, "id": ""+(accounts.length + 1)})
                addUser(newUser)
                changeCurrentUser(newUser)
                setMessage("")
                resetForm()
            }
        }
    })

    useEffect(() => {
        formik.values.city = ""
    }, [formik.values.province])

    const changeIcon = () => {
        setPasswordBool(prev => !prev)
    }

    return (
        <>
        <h2 className="title text-center my-4">رایگان ثبت نام کنید</h2>
            <form onSubmit={formik.handleSubmit}>
                {/* name and last name */}
                <div className="d-flex flex-column flex-sm-row mb-3 name">
                    <div className="field flex-fill">
                        <input 
                        placeholder="نام" 
                        type="text" 
                        name="name" 
                        value={formik.values.name} 
                        onChange={formik.handleChange}/>

                        {formik.errors.name && formik.touched.name && <p className="error mt-2 mb-0">{formik.errors.name}</p>}
                    </div>
                    
                    <div className="field flex-fill">
                        <input 
                        placeholder="نام خانوادگی" 
                        type="text" 
                        name="lastName" 
                        value={formik.values.lastName} 
                        onChange={formik.handleChange}/>

                        {formik.errors.lastName && formik.touched.lastName && <p className="error mt-2 mb-0">{formik.errors.lastName}</p>}
                    </div>
                </div>

                {/* the city and province */}
                <div className="field mb-3">
                    <Province 
                    formik={formik}
                    provinceData={provinceData}
                    />
                    {(formik.errors.province||formik.errors.city)  && (formik.touched.province || formik.touched.city) && <p className="error mt-2 mb-0">{formik.errors.province || formik.errors.city}</p>}
                </div>

                {/*education and place  */}
                <div className="edu d-flex flex-column mb-3">
                    <input className="w-100" 
                    placeholder="تحصیلات" 
                    type="text" 
                    name="education" 
                    value={formik.values.education} 
                    onChange={formik.handleChange}
                    />

                    {formik.values.education?
                        <input className="w-100" 
                        placeholder="محل تحصیل"
                        type="text"
                        name="eduPlace" 
                        value={formik.values.eduPlace} 
                        onChange={formik.handleChange}
                        /> : null
                    }
                    {formik.errors.eduPlace && formik.touched.eduPlace && <p className="error mt-2 mb-0">{formik.errors.eduPlace}</p>}
                </div>

                {/* email */}
                <div className="field mb-3">
                    <input placeholder="پست الکترونیک" 
                    type="text" 
                    name="email" 
                    value={formik.values.email} 
                    onChange={formik.handleChange}/>

                    {formik.errors.email && formik.touched.email && <p className="error mt-2 mb-0">{formik.errors.email}</p>}
                </div>

                {/* password */}
                <div className="field mb-3 w-100">
                    <div className="wrapper">
                        <input 
                        placeholder="کلمه عبور" 
                        type={passwordBool? "password":"text"} 
                        name="password" 
                        value={formik.values.password} 
                        onChange={formik.handleChange}/>

                        <span>{passwordBool? 
                        <BiHide className="icon" onClick={changeIcon}/> : <BiShow className="icon" onClick={changeIcon}/>}</span>
                    </div>
                    {formik.errors.password && formik.touched.password && <p className="error mt-2 mb-0">{formik.errors.password}</p>}
                </div>
                
                {<p className="log-error error mt-2 mb-0">{message}</p>}

                {/* submit */}
                <button className="submit mt-3" type="submit">ثبت نام</button>
            </form>
        </>
    )
}

export default Signup;
