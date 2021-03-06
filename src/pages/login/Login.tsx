import { Button, Card, Container, Grid, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Usuario } from "../../model/usuario.model";
import { OauthService } from "../../service/oauth.service";
import Input from "../../shared/components/Input";
import { Spinner } from "../../shared/components/Spinner";
import Toast from "../../shared/components/Toast";
import { getFormYup } from "./form-state";
import loginStyle from "./login-style";
import "./Login.css";

function Login() {
  const classes = loginStyle();
  const oauthService = new OauthService();
  const history = useHistory();

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    severity: "success",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (values: any) => {
    setLoading(true);
    efetuarLogin(values);
  };

  const efetuarLogin = (usuario: Usuario) => {
    oauthService
      .getToken(usuario)
      .then((response) => {
        oauthService.setToken(response.data);
        history.push("/home");
      })
      .catch((e) => {
        setToast({
          ...toast,
          open: true,
          msg: "Email/Senha não conferem",
          severity: "error",
        });
      })
      .finally(() => setLoading(false));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: getFormYup,
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
      {loading && <Spinner size={50} />}
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
                <Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    type="submit"
                  >
                    Entrar
                  </Button>
                </Grid>
                <Grid>
                  <Typography color="primary">
                    <Link to="/signin">Não possui conta ? Cadastre-se</Link>
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

export default Login;
