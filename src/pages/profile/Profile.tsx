import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Theme,
  Typography,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
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
import Input from "../../shared/components/Input";
import Navbar from "../../shared/components/Navbar";
import { ProfilePicture } from "../../shared/components/ProfilePicture";
import { Spinner } from "../../shared/components/Spinner";
import Toast from "../../shared/components/Toast";
import { Messages } from "../../shared/messages/validation-messages";
import { toBase64 } from "../../shared/utils/fileToBase64";

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

  btnCancelar: {
    // color: '#ff2a00'
  },
}));

export const Profile = () => {
  const classes = useStyles();
  const oauthService = new OauthService();
  const usuarioService = new UsuarioService();
  const appDispatch = useAppDispatch;

  const [loading, setLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(null);
  const [file, setFile] = useState<string>("");
  const [base64, setBase64] = useState<string>(null);
  const [toast, setToast] = useState({
    open: false,
    msg: "",
    severity: "success",
  });

  const { usuario } = useSelector(usuarioSelector) as UsuarioState;

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

  const schema = yup.object({
    id: yup.number(),
    nome: yup.string().required(Messages.MSG001),
    username: yup.string().required(Messages.MSG001),
    email: yup.string(),
    dtNascimento: yup.date(),
    dtCadastro: yup.date(),
  });

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
      await usuarioService.uploadFoto(usuario.id, file);
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

  const editar = (
    <Button
      variant="contained"
      color="primary"
      onClick={() => setIsEditing(true)}
    >
      Editar
    </Button>
  );

  const salvar = (
    <Button type="submit" variant="contained" color="primary">
      Salvar
    </Button>
  );

  const cancelar = (
    <Button
      className={classes.btnCancelar}
      type="submit"
      variant="outlined"
      color="primary"
      onClick={() => {
        setIsEditing(false);
        formik.setValues(initialValues);
      }}
    >
      Cancelar
    </Button>
  );

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
            <form onSubmit={formik.handleSubmit}>
              <Grid
                container
                direction="row"
                alignContent="space-around"
                spacing={6}
              >
                <Grid item xs={12}>
                  <Typography variant="h5">DADOS PESSOAIS</Typography>
                </Grid>
                <Grid item xs={12}>
                  <ProfilePicture base64={base64} />
                  <input
                    accept="image/*"
                    className={classes.inputFile}
                    id="btn-file"
                    type="file"
                    onChange={handleFile}
                  />
                  <label htmlFor="btn-file">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      disabled={!isEditing}
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </Grid>
                <Grid item xs={6}>
                  <Input
                    className={classes.input}
                    id="nome"
                    label="Nome"
                    variant="outlined"
                    value={formik.values.nome}
                    error={formik.touched.nome && Boolean(formik.errors.nome)}
                    helperText={formik.touched.nome && formik.errors.nome}
                    onChange={formik.handleChange}
                    formik={formik}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    className={classes.input}
                    id="username"
                    label="Username"
                    variant="outlined"
                    value={formik.values.username}
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                    onChange={formik.handleChange}
                    formik={formik}
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    className={classes.input}
                    id="email"
                    label="email"
                    variant="outlined"
                    value={formik.values.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    onChange={formik.handleChange}
                    formik={formik}
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    className={classes.input}
                    id="dtNascimento"
                    type="date"
                    label="Data de Nascimento"
                    variant="outlined"
                    value={formik.values.dtNascimento}
                    InputLabelProps={{ shrink: true }}
                    error={
                      formik.touched.dtNascimento &&
                      Boolean(formik.errors.dtNascimento)
                    }
                    helperText={
                      formik.touched.dtNascimento && formik.errors.dtNascimento
                    }
                    onChange={formik.handleChange}
                    formik={formik}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    className={classes.input}
                    id="dataCadastro"
                    type="date"
                    label="Data de Cadastro"
                    variant="outlined"
                    value={formik.values.dtCadastro}
                    InputLabelProps={{ shrink: true }}
                    error={
                      formik.touched.dataCadastro &&
                      Boolean(formik.errors.dtCadastro)
                    }
                    helperText={
                      formik.touched.dtCadastro && formik.errors.dtCadastro
                    }
                    onChange={formik.handleChange}
                    formik={formik}
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  {!isEditing ? (
                    editar
                  ) : (
                    <div>
                      {salvar} {cancelar}
                    </div>
                  )}
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};
