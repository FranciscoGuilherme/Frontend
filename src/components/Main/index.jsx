import React from 'react'

import {
  Grid,
  Container,
  makeStyles,
  CssBaseline
} from '@material-ui/core'

import Toolbar from "~/components/Toolbar"
import Sidebar from "~/components/Sidebar"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }
}))

export default function Main({component: Component, name, ...props}) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Toolbar name={name} />
      <Sidebar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Component {...props} />
          </Grid>
        </Container>
      </main>
    </div>
  )
}