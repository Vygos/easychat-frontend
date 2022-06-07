import * as yup from "yup";
import { UsuarioService } from "../../service/usuario.service";
import { Messages } from "../../shared/messages/validation-messages";

const usuarioService = new UsuarioService();

type ToastState = (state: {
  open: boolean;
  msg: string;
  severity: string;
}) => void;

let validateEmail =
  (setToast: ToastState) =>
  (value: string | undefined): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (typeof value == "string") {
        return usuarioService
          .existsByEmail(value)
          .then((response) => resolve(!response.data))
          .catch((e) =>
            setToast({
              open: true,
              severity: "error",
              msg: "Erro interno do servidor, tente mais tarde !",
            })
          );
      }
      return resolve(true);
    });
  };

export const getSignUpSchema = (setToast: ToastState) =>
  yup.object({
    nome: yup.string().required(Messages.MSG001),
    username: yup.string().required(Messages.MSG001),
    email: yup
      .string()
      .email(Messages.MSG002)
      .required(Messages.MSG001)
      .test("hasEmailExist", Messages.MSG004, validateEmail(setToast)),
    password: yup
      .string()
      .required(Messages.MSG001)
      .test("passwordDiff", Messages.MSG003, (value, { parent }) => {
        return value === parent.confirmPassword;
      }),
    confirmPassword: yup
      .string()
      .required(Messages.MSG001)
      .test("passwordDiff", Messages.MSG003, (value, { parent }) => {
        return value === parent.password;
      }),
  });
