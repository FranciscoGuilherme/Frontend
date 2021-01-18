import React from 'react'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import { AppBar, Toolbar, IconButton, Typography, InputBase } from '@material-ui/core'

import { useStyles } from "./assets/styles"

export default function PrimarySearchAppBar() {
  const classes = useStyles()

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
        >
          <HomeIcon />
        </IconButton>

        <Typography className={classes.title} variant="h6" noWrap>
          Sigo
        </Typography>

        <div className={classes.search}>
          <SearchIcon className={classes.searchIcon} />
          <InputBase
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