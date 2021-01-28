import React from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  MenuItem,
  Accordion,
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

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const temp = [1, 2, 3]
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableBody>
                  {rows.map(row => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}