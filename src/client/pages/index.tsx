import React, { FormEvent } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import {
  makeStyles,
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core';
import { Image } from '@material-ui/icons/';
import {
  Message,
  useMessagesQuery,
  usePostMessageMutation,
  useMessageAddedSubscription,
} from '../lib/api';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
  },
}));

const Home: NextPage = () => {
  const classes = useStyles();

  const resultMessages = useMessagesQuery();
  const resultMessageAdded = useMessageAddedSubscription();
  const [postMessage, resultPostMessage] = usePostMessageMutation();

  const [messages, setMessages] = React.useState([] as Message[]);
  const [text, setText] = React.useState('');

  const onSubmit = React.useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      postMessage({ variables: { messageInput: { text } } });
    },
    [text, postMessage],
  );

  React.useEffect(() => {
    if (resultMessages.data) {
      setMessages(resultMessages.data.messages);
    }
  }, [resultMessages.loading]);

  React.useEffect(() => {
    if (!(resultPostMessage.loading || resultPostMessage.error)) {
      setText('');
    }
  }, [resultPostMessage.loading]);

  React.useEffect(() => {
    if (resultMessageAdded.data) {
      setMessages([...messages, resultMessageAdded.data.messageAdded]);
    }
  }, [resultMessageAdded.data?.messageAdded.id]);

  return (
    <div className={classes.root}>
      <Head>
        <title>App</title>
      </Head>
      <Container>
        <List>
          {messages.map((message) => (
            <ListItem key={message.id}>
              <ListItemAvatar>
                <Avatar>
                  <Image />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={message.text}
                secondary={String(new Date(message.createdAt))}
              />
            </ListItem>
          ))}
        </List>
        <form onSubmit={onSubmit}>
          <TextField
            label="Standard"
            value={text}
            onChange={({ target }) => setText(target.value)}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={resultPostMessage.loading}
          >
            Post
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Home;
