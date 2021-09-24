import { Snackbar, SnackbarOrigin } from "@material-ui/core";
import Alert, { Color } from "@material-ui/lab/Alert";
import { PropsWithChildren } from "react";

interface ToastProps {
  message: string;
  open: boolean;
  duration: number;
  handleClose?: () => void;
  position: SnackbarOrigin;
  severity: any
}

export default function Toast({
  message,
  open,
  duration,
  handleClose,
  position,
  severity
}: PropsWithChildren<ToastProps>) {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        anchorOrigin={position}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
