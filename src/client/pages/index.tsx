import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { makeStyles, Container, Grid } from '@material-ui/core';
import { InputMessage } from '../components/InputMessage';
import { SelectRoom } from '../components/SelectRoom';
import { MessageList } from '../components/MessageList';
import {
  Room,
  useRoomsQuery,
  Message,
  useMessagesQuery,
  usePostMessageMutation,
  useMessageAddedSubscription,
} from '../lib/api';

type MessageAction =
  | {
      type: 'add';
      payload: Message;
    }
  | {
      type: 'set';
      payload: Message[];
    };

const reduceMessages: React.Reducer<Message[], MessageAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case 'add':
      return [action.payload, ...state];
    case 'set':
      return [...action.payload].reverse();
    default:
      return state;
  }
};

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 20,
  },
}));

const Home: NextPage = () => {
  const classes = useStyles();

  const [roomId, setRoomId] = React.useState<Room['id']>('');
  const [messages, dispatchMessage] = React.useReducer(reduceMessages, []);

  const resultRooms = useRoomsQuery({ fetchPolicy: 'network-only' });
  const resultMessages = useMessagesQuery({
    fetchPolicy: roomId ? 'network-only' : 'cache-only',
    variables: { roomId },
  });
  const [postMessage, resultPostMessage] = usePostMessageMutation();

  const onSubmit = React.useCallback(
    (text: Message['text']) => {
      postMessage({
        variables: {
          messageInput: {
            text,
            roomId,
          },
        },
      });
    },
    [postMessage, roomId],
  );

  useMessageAddedSubscription({
    variables: { roomId },
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      dispatchMessage({ type: 'add', payload: data.messageAdded });
    },
  });

  React.useEffect(() => {
    if (resultRooms.data) {
      setRoomId(resultRooms.data?.rooms[0]?.id ?? '');
    }
  }, [resultRooms.data]);

  React.useEffect(() => {
    if (resultMessages.data) {
      dispatchMessage({ type: 'set', payload: resultMessages.data.messages });
    }
  }, [resultMessages.data]);

  return (
    <div className={classes.root}>
      <Head>
        <title>GraphQL subscription sandbox</title>
      </Head>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <InputMessage
              onSubmit={onSubmit}
              loading={resultPostMessage.loading}
            />
          </Grid>
          <Grid item xs={4}>
            <SelectRoom
              rooms={resultRooms.data?.rooms ?? []}
              value={roomId}
              onChange={setRoomId}
            />
          </Grid>
          <Grid item xs={12}>
            <MessageList messages={messages} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
