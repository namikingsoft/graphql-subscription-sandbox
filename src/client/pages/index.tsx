import React, { FormEvent } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import {
  makeStyles,
  Container,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core';
import { Image } from '@material-ui/icons/';
import {
  Room,
  useRoomsQuery,
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

  const [roomId, setRoomId] = React.useState<Room['id']>('');
  const [messages, setMessages] = React.useState([] as Message[]);
  const [text, setText] = React.useState('');

  const resultRooms = useRoomsQuery({ fetchPolicy: 'network-only' });
  const resultMessages = useMessagesQuery({
    fetchPolicy: roomId ? 'network-only' : 'cache-only',
    variables: { roomId },
  });
  const resultMessageAdded = useMessageAddedSubscription({
    fetchPolicy: roomId ? 'network-only' : 'cache-only',
    variables: { roomId },
  });
  const [postMessage, resultPostMessage] = usePostMessageMutation();

  const onSubmit = React.useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      postMessage({
        variables: {
          messageInput: {
            text,
            roomId,
          },
        },
      });
    },
    [text, postMessage],
  );

  React.useEffect(() => {
    if (resultRooms.data) {
      setRoomId(resultRooms.data?.rooms[0]?.id ?? '');
    }
  }, [resultRooms.data]);

  React.useEffect(() => {
    if (resultMessages.data) {
      setMessages([...resultMessages.data.messages].reverse());
    }
  }, [resultMessages.data]);

  React.useEffect(() => {
    if (!(resultPostMessage.loading || resultPostMessage.error)) {
      setText('');
    }
  }, [resultPostMessage.loading]);

  React.useEffect(() => {
    if (resultMessageAdded.data) {
      setMessages([resultMessageAdded.data.messageAdded, ...messages]);
    }
  }, [resultMessageAdded.data?.messageAdded.id]);

  return (
    <div className={classes.root}>
      <Head>
        <title>App</title>
      </Head>
      <Container>
        <FormControl>
          <InputLabel shrink>Room</InputLabel>
          <Select
            value={roomId}
            onChange={({ target }) => setRoomId(target.value as string)}
          >
            {(resultRooms.data?.rooms ?? []).map((room) => (
              <MenuItem value={room.id}>{room.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
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
            label="Message"
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
