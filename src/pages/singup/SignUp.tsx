import {
  Button,
  Card,
  Container,
  Grid, Typography
} from "@material-ui/core";
import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Usuario } from "../../model/usuario.model";
import { OauthService } from "../../service/oauth.service";
import { UsuarioService } from "../../service/usuario.service";
import Input from "../../shared/components/Input";
import Toast from "../../shared/components/Toast";
import { Messages } from "../../shared/messages/validation-messages";
import { getSignUpSchema } from "./form-state";
import signUpStyle from "./signUp-style";
import "./SignUp.css";

export function SignUp() {
  const classes = signUpStyle();
  const oauthService = new OauthService();
  const usuarioService = new UsuarioService();

  const [toast, setToast] = useState({ open: false, msg: "", severity: "" });

  const handleSubmit = async (values: any) => {
    const sistema = {
      email: "sistema@easychat.com",
      password: "sistema@123",
    } as Usuario;

    const newUsuario = {
      email: values.email,
      password: values.password,
      dadosPessoais: {
        nome: values.nome,
        username: values.username,
      },
    } as Usuario;

    try {
      const { data } = await oauthService.getToken(sistema);

      const header = { Authorization: `Bearer ${data.access_token}` };

      console.log("header", header);

      await usuarioService.cadastrar(newUsuario, header);

      formik.resetForm();

      setToast({
        ...toast,
        open: true,
        msg: Messages.MSG005,
        severity: "success",
      });

    } catch (e) {
      setToast({
        ...toast,
        open: true,
        msg: Messages.MSG007,
        severity: "error",
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      nome: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: getSignUpSchema(setToast),
    onSubmit: handleSubmit,
  });

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
