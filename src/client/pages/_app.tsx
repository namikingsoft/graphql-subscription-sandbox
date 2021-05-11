import React from 'react';
import App from 'next/app';
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({});

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
