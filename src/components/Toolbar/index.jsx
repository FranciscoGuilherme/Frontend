import React from "react"
import clsx from "clsx"

import {
  Badge,
  AppBar,
  Toolbar,
  Typography
} from "@material-ui/core"

import ArrowBack from "@material-ui/icons/ArrowBack"
import IconButton from "@material-ui/core/IconButton"
import NotificationsIcon from "@material-ui/icons/Notifications"

import { useStyles } from "./assets/style"

export default function Menu({ name, ...props }) {
  const open = false
  const classes = useStyles()
  const handleDrawerOpen = () => {
    props.history.push("/menu")
  }

  return (
    <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <ArrowBack />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          { name }
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}