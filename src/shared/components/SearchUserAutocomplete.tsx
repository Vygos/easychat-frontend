import {
  Avatar,
  Grid,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import { AddCircleOutline, CheckCircleOutline } from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect, useState } from "react";
import { Avisos } from "../../model/avisos.model";
import { TipoAviso } from "../../model/enums/tipo-aviso.enum";
import { Usuario } from "../../model/usuario.model";
import { AvisosService } from "../../service/avisos.service";
import { OauthService } from "../../service/oauth.service";
import { UsuarioService } from "../../service/usuario.service";

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

export const SearchUserAutocomplete = ({
  userPrincipal,
  onAddContato
}: {
  userPrincipal: Usuario,
  onAddContato: () => void
}) => {
  const usuarioService = new UsuarioService();
  const oauthService = new OauthService();
  const avisosService = new AvisosService();

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setLoading(true);
    usuarioService
      .search(e.target.value, oauthService.userFromToken.id)
      .then((response) => {
        setUsuarios(response.data);
      })
      .finally(() => setTimeout(() => setLoading(false), 1000));
  };

  const Contato = ({ option }) => {
    return (
      <>
        <Grid item xs={4}>
          <Avatar className={classes.avatar}>
            <Typography variant="caption">
              {option.dadosPessoais.nome.toUpperCase().substring(0, 2)}
            </Typography>
          </Avatar>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption">
            {option.dadosPessoais.username}
          </Typography>
        </Grid>
        <Grid container justifyContent="flex-end">
          {option.added ? (
            <IconButton disabled={true}>
              <CheckCircleOutline color="primary" />
            </IconButton>
          ) : (
            <AddButton option={option} />
          )}
        </Grid>
      </>
    );
  };

  const AddButton = ({ option }) => {
    return (
      <IconButton
        aria-label="adicionar"
        style={{ color: "#0ced13" }}
        onClick={() => handleAddContato(option)}
      >
        <AddCircleOutline />
      </IconButton>
    );
  };

  const handleAddContato = (option) => {

    const newAvisos = {
      tipo: TipoAviso.PEDIDO_AMIZADE,
      descricao: "Enviou um pedido de amizade",
      visto: false,
      usuario: option,
      contato: userPrincipal,
    } as Avisos;

    avisosService.salvar(newAvisos).then(() => {
      const index = usuarios.findIndex((usuario) => usuario.id === option.id);
      usuarios[index] = { ...option, added: true };
      setUsuarios(usuarios);
      onAddContato();
    });
  };

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.dadosPessoais.username}
      options={usuarios}
      loading={loading}
      renderOption={(option, { selected }) => <Contato option={option} />}
      renderInput={(params) => (
        <TextField
          disabled
          {...params}
          placeholder="Pesquisar"
          variant="outlined"
          onChange={handleChange}
          style={{ backgroundColor: "#be96e3" }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
