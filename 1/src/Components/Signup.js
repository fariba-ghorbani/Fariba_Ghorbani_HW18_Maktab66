import React, { useEffect, useState } from "react";
import Province from "./Province";
import { BiHide, BiShow } from 'react-icons/bi'
import { useFormik } from "formik";
import * as Yup from 'yup'

const Signup = () => {
    const [passwordBool, setPasswordBool] = useState(true)
    const [provinceData, setProvinceData] = useState("");

    const changeIcon = () => {
        setPasswordBool(prev => !prev)
    }

    // fetching data
    useEffect(() => {
        fetch('/iranstates.json')
            .then(res => res.json())
            .then(data => {
                setProvinceData(data)
            })
    }, [])

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .required('لطفا نام خود را وارد کنید'),
        lastName: Yup.string()
            .required('لطفا نام خود را وارد کنید'),
        email: Yup.string()
            .email('آدرس پست الکترونیکی نامعتبر است')
            .required('لطفا آدرس پست الکترونیکی را وارد کنید'),
        password: Yup.string()
            .min(6, 'کلمه عبور باید حداقل دارای 6 کاراکتر باشد')
            .required('لطفا کلمه عبور را وارد کنید'),
        education: Yup.string(),

        eduPlace: Yup.string().when("education", {
            is: education => education !== "",
            then: Yup.string().required('لطفا محل تحصیل خود را وارد کنید'),
            otherwise: Yup.string(),
        })
    });

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

        onSubmit: (values , { setSubmitting }) => {
            setSubmitting(false);
        }
    })


    useEffect(() => {
        formik.values.city = ""
    }, [formik.values.province])

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

                        {/* {formErrors.name? <p className="error mt-2 mb-0">{formErrors.name}</p>: null} */}
                    </div>
                    
                    <div className="field flex-fill">
                        <input 
                        placeholder="نام خانوادگی" 
                        type="text" 
                        name="lastName" 
                        value={formik.values.lastName} 
                        onChange={formik.handleChange}/>
                        {/* {formErrors.lastName? <p className="error mt-2 mb-0">{formErrors.lastName}</p>: null} */}
                    </div>
                </div>

                {/* the city and province */}
                <div className="field mb-3">
                    <Province handleChange={formik.handleChange} 
                    handleBlur={formik.handleBlur}
                    provinceData={provinceData}
                    values={formik.values}
                    />
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

                    {/* {formErrors.eduPlace? <p className="error mt-2 mb-0">{formErrors.eduPlace}</p>: null} */}
                </div>

                {/* email */}
                <div className="field mb-3">
                    <input placeholder="پست الکترونیک" 
                    type="text" 
                    name="email" 
                    value={formik.values.email} 
                    onChange={formik.handleChange}/>
                    {/* {formErrors.email? <p className="error mt-2 mb-0">{formErrors.email}</p>: null} */}
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
                {/* {formErrors.password? <p className="error mt-2 mb-0">{formErrors.password}</p>: null} */}
                </div>

                {/* submit */}
                <button className="submit mt-3" type="submit">ثبت نام</button>
            </form>
        </>
    )
}

export default Signup;
