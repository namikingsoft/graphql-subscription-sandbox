import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { makeStyles, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
  },
}));

const Home: NextPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Head>
        <title>App</title>
      </Head>
      <Container>Hello</Container>
    </div>
  );
};

export default Home;
