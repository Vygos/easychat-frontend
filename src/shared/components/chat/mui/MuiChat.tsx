import { Theme, makeStyles } from "@material-ui/core";
import { Message, MessageSent, TypeMessage } from "../mui/chat-types";
import React, { PropsWithChildren, useEffect } from "react";

import {
  ActionRequest,
  AudioActionRequest,
  CustomActionRequest,
  FileActionRequest,
  MultiSelectActionRequest,
  SelectActionRequest,
  TextActionRequest,
} from "../mui/chat-types";

// import { MuiAudioInput } from "./MuiAudioInput";
// import { MuiFileInput } from "./MuiFileInput";
import { MuiMessage } from "./MuiMessage";
// import { MuiMultiSelectInput } from "./MuiMultiSelectInput";
// import { MuiSelectInput } from "./MuiSelectInput";
import { MuiTextInput } from "./MuiTextInput";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: "100%",
    width: "100%",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
    display: "flex",
    flexDirection: "column",
    "& > *": {
      maxWidth: "100%",
    },
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },
  messages: {
    flex: "1 1 0%",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    display: "flex",
    flexDirection: "column",
    "& > *": {
      maxWidth: "100%",
    },
  },
  action: {
    flex: "0 1 auto",
    display: "flex",
    alignContent: "flex-end",
    "& > *": {
      minWidth: 0,
    },
  },
}));

interface MuiChatProps {
  messages: Message[];
  showDateTime: boolean;
  type: TypeMessage;
  onSend: (message: MessageSent) => void;
}

export function MuiChat({
  messages,
  showDateTime,
  type,
  onSend
}: PropsWithChildren<MuiChatProps>): React.ReactElement {
  const classes = useStyles();

  const msgRef = React.useRef<HTMLDivElement>(null);
  const scroll = React.useCallback((): void => {
    if (msgRef.current) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight;
      msgRef.current.scrollIntoView(true);
    }
  }, [msgRef]);

  useEffect(() => {
    scroll();
  }, [messages])
  
  // React.useEffect(() => {
  //   function handleMassagesChanged(): void {
  //     setMessages([...chatCtl.getMessages()]);
  //     scroll();
  //   }
  //   function handleActionChanged(): void {
  //     setActReq(chatCtl.getActionRequest());
  //     scroll();
  //   }
  //   chatCtl.addOnMessagesChanged(handleMassagesChanged);
  //   chatCtl.addOnActionChanged(handleActionChanged);
  // }, [chatCtl, scroll]);

  // type CustomComponentType = React.FC<{
  //   chatController: ChatController;
  //   actionRequest: ActionRequest;
  // }>;
  // const CustomComponent = React.useMemo((): CustomComponentType => {
  //   if (!actReq || actReq.type !== "custom") {
  //     return null as unknown as CustomComponentType;
  //   }
  //   return (actReq as CustomActionRequest)
  //     .Component as unknown as CustomComponentType;
  // }, [actReq]);

  const unknownMsg: Message = {
    type: "text",
    content: "Unknown message.",
    self: false,
  };

  return (
    <div className={classes.container}>
      <div className={classes.messages} ref={msgRef}>
        {messages.map((msg: Message): React.ReactElement => {
          if (msg.type === "text") {
            return (
              <MuiMessage
                key={messages.indexOf(msg)}
                id={`cu-msg-${messages.indexOf(msg) + 1}`}
                message={msg}
                showDateTime={showDateTime}
              />
            );
          }
          return (
            <MuiMessage
              key={messages.indexOf(msg)}
              id={`cu-msg-${messages.indexOf(msg) + 1}`}
              message={unknownMsg}
              showDateTime={showDateTime}
            />
          );
        })}
      </div>
      <div className={classes.action}>
        {type === "text" && <MuiTextInput onSend={onSend} scroll={scroll} />}
        {/* {type === "select" && (
          <MuiSelectInput
            chatController={chatCtl}
            actionRequest={actReq as SelectActionRequest}
          />
        )}
        {type === "multi-select" && (
          <MuiMultiSelectInput
            chatController={chatCtl}
            actionRequest={actReq as MultiSelectActionRequest}
          />
        )}
        {type === "file" && (
          <MuiFileInput
            chatController={chatCtl}
            actionRequest={actReq as FileActionRequest}
          />
        )}
        {type === "audio" && (
          <MuiAudioInput
            chatController={chatCtl}
            actionRequest={actReq as AudioActionRequest}
          />
        )}
        {type === "custom" && (
          <CustomComponent
            chatController={chatCtl}
            actionRequest={actReq as CustomActionRequest}
          />
        )} */}
      </div>
    </div>
  );
}
