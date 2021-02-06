import React from 'react'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'

import MenuIcon from '@material-ui/icons/Menu'
import GavelIcon from '@material-ui/icons/Gavel'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

export const mainListItems = (
  <div>
    <ListItem button component="a" href="/menu">
      <ListItemIcon>
        <MenuIcon />
      </ListItemIcon>
      <ListItemText primary="Menu" />
    </ListItem>

    <ListItem button component="a" href="/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>

    <ListItem button component="a" href="/compliance">
      <ListItemIcon>
        <GavelIcon />
      </ListItemIcon>
      <ListItemText primary="Normas" />
    </ListItem>

    <ListItem button component="a" href="/login">
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItem>
  </div>
)

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Configurações</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItem>
  </div>
)