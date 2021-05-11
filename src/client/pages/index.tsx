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
import { useMessagesQuery, usePostMessageMutation } from '../lib/api';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
  },
}));

const Home: NextPage = () => {
  const classes = useStyles();

  const resultMessages = useMessagesQuery();
  const [postMessage, resultPostMessage] = usePostMessageMutation();

  const [text, setText] = React.useState('');

  const onSubmit = React.useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      postMessage({ variables: { messageInput: { text } } });
    },
    [text, postMessage],
  );

  return (
    <div className={classes.root}>
      <Head>
        <title>App</title>
      </Head>
      <Container>
        <List>
          {!resultMessages.loading &&
            resultMessages.data.messages.map((message) => (
              <ListItem>
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
