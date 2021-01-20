import React from 'react'
import {
  Checkbox,
  MenuItem,
  Accordion,
  Typography,
  IconButton,
  ListItemIcon,
  ListItemText,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  makeStyles
} from '@material-ui/core'

import MenuIcon from "@material-ui/icons/Menu"
import DeleteIcon from '@material-ui/icons/Delete'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { CustomMenu } from "./Menu"

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    flexBasis: '95%'
  },
  accordionBody: {
    background: theme.palette.background.default
  }
}))

const temp = [1, 2, 3]

export default function Compliance() {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [expanded, setExpanded] = React.useState(false)

  const handleClose = (event) => { setAnchorEl(null) }
  const handleClick = (event) => { setAnchorEl(event.currentTarget) }
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div className={classes.root}>
      {temp.map((item, index) => (
        <Accordion key={index} expanded={expanded === item} onChange={handleChange(item)} className={classes.accordionGlobal}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${item}-content`}
            id={`${item}-header`}
          >
            <div className={classes.heading}>
            <FormControlLabel
              control={<Checkbox />}
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              label="Descarte de materiais"
            />
            </div>

            <FormControlLabel
              aria-label="Acknowledge"
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              control={
                <>
                  <IconButton onClick={handleClick}>
                    <MenuIcon />
                  </IconButton>
                  <CustomMenu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem>
                      <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Excluir" />
                    </MenuItem>
                  </CustomMenu>
                </>
              }
            />
          </AccordionSummary>

          <AccordionDetails className={classes.accordionBody}>
            <Typography>
              
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}