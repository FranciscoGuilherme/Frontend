import React from "react"
import { Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  footer: {
    left: 0,
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    padding: theme.spacing(6),
    backgroundColor: theme.palette.background.paper
  }
}))

export default function Footer() {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <Typography
        variant="h6"
        align="center"
        gutterBottom
      >
          IndTexBr
      </Typography>

      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
          Sigo Application
      </Typography>
    </footer>
  )
}