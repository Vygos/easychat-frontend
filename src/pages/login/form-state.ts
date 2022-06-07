import * as yup from "yup";

export const getFormYup = yup.object({
  email: yup
    .string()
    .email("Deve possuir email válido")
    .required("Campo obrigatório"),
  password: yup.string().required("Campo obrigatório"),
});
