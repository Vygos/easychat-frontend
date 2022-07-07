import { IconButton } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";
import { Usuario } from "../../model/usuario.model";

const AddContatoButton: React.FC<{
  option: Usuario;
  handleAddContato: (usuario: Usuario) => void;
}> = ({ option, handleAddContato }) => {
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

export default AddContatoButton;
