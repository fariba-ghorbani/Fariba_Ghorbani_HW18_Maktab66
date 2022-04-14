import * as Yup from 'yup'

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .required('لطفا نام خود را وارد کنید'),
    lastName: Yup.string()
        .required('لطفا نام خود را وارد کنید'),
    province: Yup.string()
        .required('لطفا استان و شهر محل زندگی خود را انتخاب کنید'),
    city: Yup.string()
        .required('لطفا استان و شهر محل زندگی خود را انتخاب کنید'),
    email: Yup.string()
        .email('آدرس پست الکترونیکی نامعتبر است')
        .required('لطفا آدرس پست الکترونیکی را وارد کنید'),
    password: Yup.string()
        .min(6, 'کلمه عبور باید حداقل دارای 6 کاراکتر باشد')
        .required('لطفا کلمه عبور را وارد کنید'),
    eduPlace: Yup.string()
    .when("education", (education) => {
        if (education) 
            return Yup.string().required('لطفا محل تحصیل خود را وارد کنید')
    })
});

export default SignupSchema;