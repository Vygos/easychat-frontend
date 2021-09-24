import { Avatar, Box, Grid, Grow, Typography } from "@material-ui/core";
import React, { PropsWithChildren } from "react";
import { Message, MessageContent } from "../mui/chat-types";
import moment from "moment";
import 'moment/locale/pt-br';

moment.locale("pt-br");

export interface MuiMessageProps {
  id: string;
  message: Message;
  showDateTime: boolean;
}

export function MuiMessage({
  id,
  message,
  showDateTime,
}: PropsWithChildren<MuiMessageProps>): React.ReactElement {
  if (message.deletedAt) {
    return <div id={id} />;
  }

  const dispDate = message.updatedAt ? message.updatedAt : message.createdAt;

  const ChatAvator = (
    <Box
      minWidth={0}
      flexShrink={0}
      ml={message.self ? 1 : 0}
      mr={message.self ? 0 : 1}
    >
      <Avatar alt={message.username} src={message.avatar} />
    </Box>
  );

  const ChatUsername = (
    <Box maxWidth="100%" mx={1}>
      <Typography variant="body2" align={message.self ? "right" : "left"}>
        {message.username}
      </Typography>
    </Box>
  );

  const ChatDate = (
    <Grid container justifyContent={message.self ? "flex-end" : "flex-start"}>
      <Box maxWidth="100%" mx={1}>
        <Typography
          variant="caption"
          align={message.self ? "right" : "left"}
          color="textSecondary"
        >
          {dispDate && moment(dispDate).format("DD/MM/YYYY h:mm")}
        </Typography>
      </Box>
    </Grid>
  );

  return (
    <Grow in>
      <Box
        id={id}
        maxWidth="100%"
        flex="0 1 auto"
        my={1}
        pl={message.self ? "20%" : 0}
        pr={message.self ? 0 : "20%"}
        display="flex"
        justifyContent={message.self ? "flex-end" : "flex-start"}
        style={{ overflowWrap: "break-word" }}
      >
        {message.avatar && !message.self && ChatAvator}
        <Box minWidth={0} display="flex" flexDirection="column">
          {message.username && ChatUsername}
          <Box
            maxWidth="100%"
            py={1}
            px={2}
            bgcolor={message.self ? "primary.main" : "background.paper"}
            color={message.self ? "primary.contrastText" : "text.primary"}
            borderRadius={16}
            boxShadow={2}
          >
            {message.type === "text" && (
              <Typography variant="body1" style={{ whiteSpace: "pre-wrap" }}>
                {message.content}
              </Typography>
            )}
          </Box>
          {showDateTime && ChatDate}
        </Box>
        {message.avatar && message.self && ChatAvator}
      </Box>
    </Grow>
  );
}
