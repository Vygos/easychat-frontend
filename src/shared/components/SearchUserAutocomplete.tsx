import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import _ from "lodash";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Avisos } from "../../model/avisos.model";
import { TipoAviso } from "../../model/enums/tipo-aviso.enum";
import { Usuario } from "../../model/usuario.model";
import { usuarioSelector } from "../../redux/slices/usuario/usuarioSlice";
import { AvisosService } from "../../service/avisos.service";
import { OauthService } from "../../service/oauth.service";
import { UsuarioService } from "../../service/usuario.service";
import ContatoOnSearch from "./ContatoOnSearch";

export const SearchUserAutocomplete = ({
  onAddContato,
}: {
  onAddContato: () => void;
}) => {
  const usuarioService = new UsuarioService();
  const oauthService = new OauthService();
  const avisosService = new AvisosService();

  const [open, setOpen] = useState(false);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);

  const userPrincipal = useSelector(usuarioSelector);

  const handleAddContato = (option: Usuario) => {

    console.log("user", userPrincipal)
    console.log("user", option)
    const newAvisos = {
      tipo: TipoAviso.PEDIDO_AMIZADE,
      descricao: "Enviou um pedido de amizade",
      visto: false,
      usuario: option,
      contato: userPrincipal.usuario,
    } as Avisos;

    avisosService.salvar(newAvisos).then(() => {
      const index = usuarios.findIndex((usuario) => usuario.id === option.id);
      usuarios[index] = { ...option, added: true };
      setUsuarios(usuarios);
      onAddContato();
    });
  };

  const handleChange = (e: any) => {
    setLoading(true);
    usuarioService
      .search(e.target.value, oauthService.userFromToken.id)
      .then((response) => {
        setUsuarios(response.data);
      })
      .finally(() => setTimeout(() => setLoading(false), 1000));
  };

  const debounceHandleChange = _.debounce(handleChange, 500);

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
      renderOption={(option) => (
        <ContatoOnSearch option={option} handleAddContato={handleAddContato} />
      )}
      renderInput={(params) => (
        <TextField
          disabled
          {...params}
          placeholder="Pesquisar"
          variant="outlined"
          onChange={debounceHandleChange}
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
