import {
  Grid,
  Typography,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import { Usuario } from "../../model/usuario.model";
import Input from "../../shared/components/Input";
import { ProfilePicture } from "../../shared/components/ProfilePicture";
import { FormActions } from "./FormActions";

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

interface FormProfileProps {
  usuario: Usuario;
  formik;
  handleFile: (event) => Promise<void>;
  editar: (event: any) => void;
  salvar: () => void;
  cancelar: () => void;
  isEditing: boolean;
  base64: string;
  file: string;
}

export const FormProfile = ({
  formik,
  handleFile,
  editar,
  salvar,
  cancelar,
  isEditing,
  base64,
}: FormProfileProps) => {
  const classes = useStyles();

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container direction="row" alignContent="space-around" spacing={6}>
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
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
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
                formik.touched.dataCadastro && Boolean(formik.errors.dtCadastro)
              }
              helperText={formik.touched.dtCadastro && formik.errors.dtCadastro}
              onChange={formik.handleChange}
              formik={formik}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12}>
            <FormActions
              salvar={salvar}
              editar={editar}
              cancelar={cancelar}
              isEditing={isEditing}
            />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
