import React, { useState } from 'react'
import {
  Grid,
  Chip,
  Card,
  Paper,
  Button,
  MenuItem,
  Accordion,
  IconButton,
  CardHeader,
  CardContent,
  ListItemIcon,
  ListItemText,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel
} from '@material-ui/core'

import { CustomMenu } from "./Menu"
import { useStyles } from "./assets/style"
import MenuIcon from "@material-ui/icons/Menu"
import BuildIcon from '@material-ui/icons/Build'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import CustomModal from "~/components/Modal"

const data = [
  {
    data: {
      name: "C1",
      desc: "Descarte de materiais"
    },
    standardsList: [
      {
        code: "CODE1",
        name: "Name",
        desc: "Alguma descrição",
        status: true
      }
    ]
  },
  {
    data: {
      name: "C2",
      desc: "Consumo de produtos"
    },
    standardsList: [
      {
        code: "CODE2",
        name: "Name",
        desc: "Alguma descrição",
        status: true
      },
      {
        code: "CODE2",
        name: "Name",
        desc: "Alguma descrição",
        status: false
      }
    ]
  }
]

export default function Compliance() {
  const classes = useStyles()
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null)
  const [expanded, setExpanded] = useState(false)
  const [compliancesList, setCompliancesList] = useState([])

  const handleModalOpen = () => { setOpen(true) }
  const handleModalClose = () => { setOpen(false) }
  const handleClose = (event) => { setAnchorEl(null) }
  const handleClick = (event) => { setAnchorEl(event.currentTarget) }
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div className={classes.root}>
      <Card>
        <Paper className={classes.paperSecondary}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs zeroMinWidth>
            <CardHeader
              avatar={<BuildIcon color="primary" />}
              
              title="Gerenciar compliances"
            />
            </Grid>
          </Grid>
        </Paper>
        <CardContent>
          {compliancesList.length === 0 && (
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: '20vh' }}
            >
              <Button
                type="button"
                color="primary"
                variant="contained"
                onClick={handleModalOpen}
              >
                Cadastrar primeiro compliance
              </Button>
              
              <CustomModal open={open} handleModalClose={handleModalClose} />
            </Grid>
          )}
          {compliancesList.map((compliance, index) => (
            <Accordion key={index}
              expanded={expanded === compliance}
              onChange={handleChange(compliance)}
              className={classes.accordionGlobal}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div className={classes.heading}>
                  {compliance.data.desc}
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
                <div key={index} className={classes.rootSecondary}>
                  {compliance.standardsList.map((standard, index) => (
                      <Paper className={classes.paper}>
                        <Grid container wrap="nowrap" spacing={2}>
                          <Grid item xs zeroMinWidth>
                          <CardHeader
                            avatar={
                              <Chip
                                color={(standard.status === true) ? "primary" : "secondary" }
                                label={standard.code}
                                size="small"
                              />
                            }
                            action={
                              <FormControlLabel
                                aria-label="Acknowledge"
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                                control={
                                  <>
                                    <IconButton onClick={handleClick}>
                                      <MoreVertIcon />
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
                            }
                            title={standard.name}
                            subheader={standard.desc}
                          />
                          </Grid>
                        </Grid>
                      </Paper>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}