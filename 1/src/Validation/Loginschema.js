import * as Yup from 'yup'

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('آدرس پست الکترونیکی نامعتبر است')
        .required('لطفا پست الکترونیکی خود را وارد کنید'),
    password: Yup.string()
        .min(6, 'کلمه عبور باید حداقل دارای 6 کاراکتر باشد')
        .required('لطفا کلمه عبور را وارد کنید'),
});

export default LoginSchema;