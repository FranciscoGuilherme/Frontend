import React, { useState } from "react"
import clsx from "clsx"

import {
  List,
  Drawer,
  Divider,
  IconButton
} from "@material-ui/core"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"

import { useStyles } from "./assets/style"
import { mainListItems } from "~/components/Sidebar/SidebarItens"

export default function Sidebar() {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const handleDrawerOpen = () => { setOpen(true) }
  const handleDrawerClose = () => { setOpen(false) }

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
      <List>{mainListItems}</List>
    </Drawer>
  )
}