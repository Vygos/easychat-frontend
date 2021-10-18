import { Card, CardContent, Grid, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { DadosPessoais } from "../../model/dados-pessoais.model";
import { Usuario } from "../../model/usuario.model";
import { useAppDispatch } from "../../redux";
import {
  loadUsuario,
  updateUsuario,
  usuarioSelector,
  UsuarioState,
} from "../../redux/slices/usuario/usuarioSlice";
import { OauthService } from "../../service/oauth.service";
import { UsuarioService } from "../../service/usuario.service";
import Navbar from "../../shared/components/Navbar";
import { Spinner } from "../../shared/components/Spinner";
import Toast from "../../shared/components/Toast";
import { Messages } from "../../shared/messages/validation-messages";
import { toBase64 } from "../../shared/utils/fileToBase64";
import { FormProfile } from "./FormProfile";

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    width: theme.spacing(110),
  },
  inputFile: {
    display: "none",
  },
  input: {
    width: theme.spacing(40),
  },
}));

export const Profile = () => {
  const classes = useStyles();
  const oauthService = new OauthService();
  const usuarioService = new UsuarioService();
  const appDispatch = useAppDispatch;

  const [loading, setLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(null);
  const [file, setFile] = useState<any>(null);
  const [base64, setBase64] = useState<string>(null);
  const [toast, setToast] = useState({
    open: false,
    msg: "",
    severity: "success",
  });

  const { usuario } = useSelector(usuarioSelector) as UsuarioState;

  const initialValues = {
    id: usuario ? usuario.id : "",
    nome: usuario ? usuario.dadosPessoais.nome : "",
    username: usuario ? usuario.dadosPessoais.username : "",
    email: usuario ? usuario.email : "",
    dtNascimento:
      usuario && usuario.dadosPessoais.dtNascimento
        ? moment(usuario.dadosPessoais.dtNascimento).format("YYYY-MM-DD")
        : "",
    dtCadastro: usuario
      ? moment(usuario.dadosPessoais.dtCadastro).format("YYYY-MM-DD")
      : "",
  };

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        await appDispatch(loadUsuario(oauthService.userFromToken.id));
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setToast({
          ...toast,
          open: true,
          msg: err.message,
          severity: "error",
        });
      }
    })();
  }, []);

  useEffect(() => {
    setBase64(usuario?.dadosPessoais.foto);
  }, [usuario]);

  const handleSubmit = async (values: any) => {
    setLoading(true);

    const usuarioToUpdate = {
      id: usuario.id,
      email: values.email,
      dadosPessoais: {
        id: usuario.dadosPessoais.id,
        nome: values.nome,
        username: values.username,
        dtNascimento: values.dtNascimento,
      } as DadosPessoais,
    } as Usuario;

    try {
      await uploadFoto(usuario.id, file);
      await appDispatch(updateUsuario(usuarioToUpdate));

      setIsEditing(false);
      setLoading(false);

      setToast({
        ...toast,
        open: true,
        msg: Messages.MSG008,
        severity: "success",
      });
    } catch (err) {
      setLoading(false);
      setToast({
        ...toast,
        open: true,
        msg: err.message,
        severity: "error",
      });
    }
  };

  const schema = yup.object({
    id: yup.number(),
    nome: yup.string().required(Messages.MSG001),
    username: yup.string().required(Messages.MSG001),
    email: yup.string(),
    dtNascimento: yup.date(),
    dtCadastro: yup.date(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  const handleFile = async (event) => {
    const { files } = event.target;
    setFile(files[0]);
    const base64 = (await toBase64(files[0])) as string;
    setBase64(base64);
  };

  const editar = (e) => {
    e.preventDefault();
    setIsEditing(true);
  }

  const cancelar = () => {
    setIsEditing(false);
    formik.setValues(initialValues);

    //cancelFoto

    setBase64(usuario.dadosPessoais.foto);
    setFile(null);
  };

  const uploadFoto = async (id: number, file: any) => {
    if (!file) {
      return;
    }

    await usuarioService.uploadFoto(usuario.id, file)
  }

  return (
    <div style={{ marginTop: 100 }}>
      {loading && <Spinner size={50} />}
      <Toast
        open={toast.open}
        duration={3000}
        position={{ vertical: "top", horizontal: "right" }}
        severity={toast.severity}
        message={toast.msg}
        handleClose={() => setToast({ ...toast, open: false })}
      />

      <Navbar />

      <Grid container justifyContent="center">
        <Card className={classes.card}>
          <CardContent>
            <FormProfile
              formik={formik}
              handleFile={handleFile}
              editar={editar}
              salvar={formik.handleSubmit}
              cancelar={cancelar}
              isEditing={isEditing}
              usuario={usuario}
              base64={base64}
            />
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};
