import React from 'react'
import ExitToApp from '@material-ui/icons/ExitToApp'
import SearchIcon from '@material-ui/icons/Search'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase
} from '@material-ui/core'

import { useStyles } from "./assets/styles"

export default function SearchAppBar({ updateInput, ...props }) {
  const classes = useStyles()
  const exitApp = () => {
    props.history.push("/")
    localStorage.clear()
  }

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          onClick={exitApp}
        >
          <ExitToApp />
        </IconButton>

        <Typography className={classes.title} variant="h6" noWrap>
          Sigo
        </Typography>

        <div className={classes.search}>
          <SearchIcon className={classes.searchIcon} />
          <InputBase
            onChange={updateInput}
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </Toolbar>
    </AppBar>
  )
}