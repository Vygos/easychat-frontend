import { FormikConfig, FormikValues, useFormik } from "formik";

const handleClick = (formik: any, name: string) => () => {
    formik.validateField(name);
}



export {handleClick};