import React, { useState, useEffect } from "react"
import clsx from "clsx"

import {
  List,
  Drawer,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu'
import GavelIcon from '@material-ui/icons/Gavel'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"

import { useStyles } from "./assets/style"

export default function Sidebar() {
  const classes = useStyles()
  const [gn, setGn] = useState(false)
  const [gpi, setGpi] = useState(false)
  const [open, setOpen] = useState(false)
  const handleDrawerOpen = () => { setOpen(true) }
  const handleDrawerClose = () => { setOpen(false) }

  useEffect(() => {
    const modulesList = JSON.parse(localStorage.getItem("modulesList"))

    modulesList.forEach(module => {
      if (module.route === "/dashboard") setGpi(true)
      if (module.route === "/compliance") setGn(true)
    })
  })

  return (
    <Drawer
      onMouseMoveCapture={handleDrawerOpen}
      onMouseOut={handleDrawerClose}
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
      <ListItem button component="a" href="/menu">
        <ListItemIcon>
          <MenuIcon />
        </ListItemIcon>
        <ListItemText primary="Menu" />
      </ListItem>

      {gpi &&
        <ListItem button component="a" href="/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      }

      {gn &&
        <ListItem button component="a" href="/compliance">
          <ListItemIcon>
            <GavelIcon />
          </ListItemIcon>
          <ListItemText primary="Normas" />
        </ListItem>
      }

      <ListItem button
        component="a" href="/"
        onClick={() => localStorage.clear()}
      >
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Sair" />
      </ListItem>
      </List>
    </Drawer>
  )
}