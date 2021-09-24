import { Button, TextField, Theme, makeStyles } from "@material-ui/core";
import { Send as SendIcon } from "@material-ui/icons";
import React, { useState } from "react";

import {
  MessageSent,
  TextActionRequest,
  TextActionResponse,
} from "../mui/chat-types";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: "1 1 auto",
    display: "flex",
    "& > *": {
      flex: "1 1 auto",
      minWidth: 0,
    },
    "& > * + *": {
      marginLeft: theme.spacing(1),
    },
    "& :last-child": {
      flex: "0 1 auto",
    },
  },
}));

export function MuiTextInput({
  onSend,
  scroll,
  ...props
}: {
  onSend: (message: MessageSent) => void,
  scroll: () => void
}): React.ReactElement {
  const classes = useStyles();
  const [value, setValue] = useState<string>("");

  const handleKeyDown = (e: any): void => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend({ content: value, date: new Date() });
      setValue("")
    }
  };

  const handleClick = () => {
    onSend({ content: value, date: new Date() });
    setValue("")
  }

  const sendButtonText = "Enviar";

  return (
    <div className={classes.container}>
      <TextField
        placeholder="Digite uma mensagem"
        value={value}
        onChange={(e): void => setValue(e.target.value)}
        autoFocus
        multiline
        inputProps={{ onKeyDown: handleKeyDown }}
        variant="outlined"
        maxRows={10}
      />
      <Button
        type="button"
        onClick={handleClick}
        disabled={!value}
        variant="contained"
        color="primary"
        startIcon={<SendIcon />}
      >
        {sendButtonText}
      </Button>
    </div>
  );
}
