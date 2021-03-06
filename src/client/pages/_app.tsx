import React from 'react';
import App from 'next/app';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { deriveWebSocketPathToAbsolute } from '../lib/utils';

const theme = createMuiTheme({});

const graphqlPath = '/graphql';

const httpLink = new HttpLink({
  uri: graphqlPath,
});

const wsLink =
  // NOTE: implement websocket only client
  process.browser &&
  new WebSocketLink({
    uri: deriveWebSocketPathToAbsolute(graphqlPath),
    options: {
      reconnect: true,
    },
  });

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink || httpLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}
