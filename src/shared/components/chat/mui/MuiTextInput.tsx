import {
  Button,
  makeStyles,
  Menu,
  MenuItem,
  TextField,
  Theme,
} from "@material-ui/core";
import { EmojiEmotionsOutlined, Send as SendIcon } from "@material-ui/icons";
import React, { useRef, useState } from "react";
import { MessageSent } from "../mui/chat-types";
import { EmojiPicker } from "./EmojiPicker";

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
  emoji: {
    maxWidth: theme.spacing(8),
  },
}));

export function MuiTextInput({
  onSend,
  scroll,
  ...props
}: {
  onSend: (message: MessageSent) => void;
  scroll: () => void;
}): React.ReactElement {
  const classes = useStyles();
  const [value, setValue] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement>(null);
  const ref = useRef(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleKeyDown = (e: any): void => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend({ content: value, date: new Date() });
      setValue("");
    }
  };

  const handleClick = () => {
    onSend({ content: value, date: new Date() });
    setValue("");
  };

  const handleMenuOpen = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);

    setTimeout(() => {
      ref.current.focus();
    }, 500);
  };

  const sendButtonText = "Enviar";

  return (
    <div className={classes.container}>
      <TextField
        ref={ref}
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
        aria-haspopup="true"
        className={classes.emoji}
        variant="contained"
        color="primary"
        onClick={handleMenuOpen}
      >
        <EmojiEmotionsOutlined />
      </Button>
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
