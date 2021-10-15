import { Box, Button, Grid } from "@material-ui/core";

interface FormActionsProps {
  editar: (event: any) => void;
  salvar: () => void;
  cancelar: () => void;
  isEditing: boolean;
}

export const FormActions = ({
  editar,
  salvar,
  cancelar,
  isEditing,
}: FormActionsProps) => {
  if (!isEditing) {
    return (
      <Box sx={{ padding: 4 }}>
        <Button variant="contained" color="primary" onClick={editar}>
          Editar
        </Button>
      </Box>
    );
  }

  return (
    <Grid container justifyContent="center">
      <Box sx={{ padding: 4 }}>
        <Button type="submit" variant="contained" color="primary">
          Salvar
        </Button>
      </Box>

      <Box sx={{ padding: 4 }}>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          onClick={cancelar}
        >
          Cancelar
        </Button>
      </Box>
    </Grid>
  );
};
