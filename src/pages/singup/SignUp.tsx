import { Button, Card, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import _ from "lodash";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { UsuarioService } from "../service/usuario.service";
import Input from "../shared/components/Input";
import Toast from "../shared/components/Toast";
import { Messages } from "../shared/messages/validation-messages";
import "./SignUp.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(3),
      width: 300,
    },
  },
  card: {
    marginTop: "5%",
    width: "40%",
    margin: "5% 0 5%",
  },
  button: {
    margin: theme.spacing(),
    width: 200,
  },
}));

const usuarioService = new UsuarioService();

export default function SignUp() {

  const [toast, setToast] = useState({ open: false, msg: "", severity: "" });

  let validateEmail = (value: string | undefined): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (typeof value == "string") {
        return usuarioService
          .existsByEmail(value)
          .then((response) => resolve(!response.data))
          .catch((e) => setToast({open: true, severity: 'error', msg: 'Erro interno do servidor, tente mais tarde !'}));
      }
      return resolve(true);
    });
  };

  const schema = yup.object({
    nome: yup.string().required(Messages.MSG001),
    username: yup.string().required(Messages.MSG001),
    email: yup
      .string()
      .email(Messages.MSG002)
      .required(Messages.MSG001)
      .test("hasEmailExist", Messages.MSG004, validateEmail),
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

  const handleSubmit = (values: any) => {
    console.log("values", values);
    setToast({
      ...toast,
      open: true,
      msg: Messages.MSG005,
      severity: "success",
    });
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      nome: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  const classes = useStyles();

  return (
    <div className="background">
      <Toast
        open={toast.open}
        duration={3000}
        position={{ vertical: "top", horizontal: "right" }}
        severity={toast.severity}
        message={toast.msg}
        handleClose={() => setToast({ ...toast, open: false })}
      />
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Card className={classes.card}>
          <Container style={{ marginTop: "10%" }}>
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <Grid container justifyContent="center">
                <h2>Easychat</h2>
              </Grid>
              <form className={classes.root} onSubmit={formik.handleSubmit}>
                <Grid item xs={12}>
                  <Input
                    id="nome"
                    label="Nome"
                    variant="outlined"
                    value={formik.values.nome}
                    error={formik.touched.nome && Boolean(formik.errors.nome)}
                    helperText={formik.touched.nome && formik.errors.nome}
                    onChange={formik.handleChange}
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={formik.values.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    onChange={formik.handleChange}
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    id="password"
                    label="Senha"
                    type="password"
                    variant="outlined"
                    value={formik.values.password}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    onChange={formik.handleChange}
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    id="confirmPassword"
                    label="Confirmar Senha"
                    type="password"
                    variant="outlined"
                    value={formik.values.confirmPassword}
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                    onChange={formik.handleChange}
                    formik={formik}
                  />
                </Grid>
                <Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    type="submit"
                  >
                    CADASTRAR
                  </Button>
                  <Typography>
                    <Link to="/login">Já cadastrado ? Acessar</Link>
                  </Typography>
                </Grid>
              </form>
            </Grid>
          </Container>
        </Card>
      </Grid>
    </div>
  );
}