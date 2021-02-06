import React, { useState, useEffect, useContext } from 'react'
import {
  Fab,
  Menu,
  Grid,
  Chip,
  Card,
  Paper,
  Button,
  Tooltip,
  MenuItem,
  Accordion,
  withStyles,
  IconButton,
  CardHeader,
  CardContent,
  ListItemIcon,
  ListItemText,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel
} from '@material-ui/core'

import { useStyles } from "./assets/style"
import AddIcon from '@material-ui/icons/Add'
import SaveIcon from '@material-ui/icons/Save'
import BuildIcon from '@material-ui/icons/Build'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'

import LoaderContext from "~/contexts/LoaderContext"

import CustomModal from "~/components/Modal"
import StandardsForm from "~/components/StandardsForm"
import CompliancesForm from "~/components/CompliancesForm"
import CompliancesService from "~/services/CompliancesService"


const data = [
  {
    name: "C1",
    description: "Descarte de materiais",
    compliance_id: 78,
    standardsList: [
      {
        code: "CC",
        compliance: 78,
        description: "TESTE",
        name: "Name",
        standard_id: 7,
        status: true
      },
      {
        code: "CC",
        compliance: 78,
        description: "TESTE",
        name: "Name",
        standard_id: 3,
        status: true
      }
    ]
  },
  {
    name: "C1",
    description: "Descarte de materiais",
    compliance_id: 79,
    standardsList: [
      {
        code: "CC",
        compliance: 79,
        description: "TESTE",
        name: "Name",
        standard_id: 8,
        status: true
      }
    ]
  },
  {
    name: "C1",
    description: "Descarte de materiais",
    compliance_id: 90,
    standardsList: [
      {
        code: "CC",
        compliance: 90,
        description: "TESTE",
        name: "Name",
        standard_id: 9,
        status: true
      }
    ]
  }
]

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function Compliance() {
  const classes = useStyles()
  const loader = useContext(LoaderContext)
  const [expanded, setExpanded] = useState(false)
  const [compliancesList, setCompliancesList] = useState([])
  const [newComplianceList, setNewComplianceList] = useState([])
  const [updateCompliances, setUpdateCompliances] = useState([])

  const [open, setOpen] = useState(false)
  const [openStandard, setOpenStandard] = useState(false)
  const handleModalOpen = () => { setOpen(true) }
  const handleModalClose = () => { setOpen(false) }
  const handleModalOpenStandard = () => { setOpenStandard(true) }
  const handleModalCloseStandard = () => { setOpenStandard(false) }
  const forceUpdate = useForceUpdate()
  const [value, setValue] = useState(0)
  function useForceUpdate() {
    return () => setValue(value => value + 1)
  }
  
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClose = (event) => { setAnchorEl(null) }
  const handleClick = (event) => { setAnchorEl(event.currentTarget) }
  const handleStatusStandardClick = (event, index, index2) => {
    console.log(newComplianceList[index], index)
    compliancesList[index].standardsList[index2].status =
        !compliancesList[index].standardsList[index2].status
    if (!newComplianceList[index]) {
      let item = updateCompliances.find(element =>
        element.id === compliancesList[index].compliance_id &&
        element.data.standard_id === compliancesList[index].standardsList[index2].standard_id
      )

      if (!item) {
        updateCompliances.push({
          id: compliancesList[index].compliance_id,
          name: compliancesList[index].name,
          desc: compliancesList[index].description,
          data: {
            id: compliancesList[index].standardsList[index2].standard_id,
            code: compliancesList[index].standardsList[index2].code,
            name: compliancesList[index].standardsList[index2].name,
            desc: compliancesList[index].standardsList[index2].description,
            status: compliancesList[index].standardsList[index2].status
          }
        })
      }

      if (item) updateCompliances.splice(updateCompliances.indexOf(item), 1)

      setUpdateCompliances(updateCompliances)
    }

    forceUpdate()
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const complianceUtils = {
    closeModal: handleModalClose,
    setCompliance: (compliance) => {
      const newCompliance = {
        name: compliance.name,
        description: compliance.desc,
        standardsList: []
      }
  
      data.push(newCompliance)
      newComplianceList[compliancesList.length - 1] = newCompliance
  
      handleModalClose()
      setCompliancesList(data)
      setNewComplianceList(newComplianceList)
    }
  }

  const standardUtils = {
    closeModal: handleModalCloseStandard,
    setStandard: (identifier, standards) => {
      console.log(identifier, standards)

      standards.forEach(element => {
        newComplianceList[identifier].standardsList.push({
          code: element.code,
          compliance: identifier,
          description: element.desc,
          name: element.name,
          standard_id: 0,
          status: true
        })
      })

      setNewComplianceList(newComplianceList)
      handleModalCloseStandard()
    }
  }

  const complianceCreateListFiltered = () => {
    let complianceListFiltered = []
    newComplianceList.forEach(element => {
      if (element) {
        let list = []
        element.standardsList.forEach(data => {
          list.push({
            code: data.code,
            name: data.name,
            desc: data.description,
            status: data.status
          })
        })

        complianceListFiltered.push({
          data: {
            name: element.name,
            desc: element.description
          },
          standardsList: list
        })
      }
    })

    return {compliances: complianceListFiltered}
  }

  const complianceUpdateListFiltered = () => {
    let updateCompliancesFiltered = []
    updateCompliances.forEach(element => {
      updateCompliancesFiltered.push({
        compliance: {
          data: {
              id: element.id,
              name: element.name,
              desc: element.desc
          },
          standardsList: [element.data]
        }
      })
    })
    return updateCompliancesFiltered
  }

  const saveCompliances = () => {
    loader(true)

    const createList = complianceCreateListFiltered()
    const updateList = complianceUpdateListFiltered()

    if (createList.compliances.length) {
      CompliancesService.post(createList)
        .then((response) => {
          loader(false)
          console.log(response)
        })
        .catch((error) => {
          loader(false)
          console.log(error)
        })
    }

    if (updateList.length) {
      updateList.forEach(data => {
        CompliancesService.put(data)
        .then((response) => {
          loader(false)
          console.log(response)
        })
        .catch((error) => {
          loader(false)
          console.log(error)
        })
      })
    }
  }

  useEffect(() => {
    loader(true)
    CompliancesService.get()
      .then((response) => {
        loader(false)
        setCompliancesList(response)
      })
      .catch((error) => {
        loader(false)
        console.log(error)
      })
  }, [])

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

              <CustomModal
                open={open}
                component={CompliancesForm}
                handleModalClose={handleModalClose}
                method={complianceUtils}
              />
            </Grid>
          )}
          {compliancesList.map((compliance, index) => (
            <Accordion key={index}
              expanded={expanded === index}
              onChange={handleChange(index)}
              className={classes.accordionGlobal}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div className={classes.heading}>
                  {compliance.description}
                </div>

                <FormControlLabel
                  aria-label="Acknowledge"
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  control={
                    <>
                      <IconButton onClick={handleClick}>
                        <MoreVertIcon />
                      </IconButton>
                      <StyledMenu
                        id="customized-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <StyledMenuItem onClick={handleClose}>
                          <ListItemIcon>
                            <DeleteIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Excluir" />
                        </StyledMenuItem>
                      </StyledMenu>
                    </>
                  }
                />
              </AccordionSummary>

              <AccordionDetails className={classes.accordionBody}>
                <div className={classes.rootSecondary}>
                  {compliance.standardsList.length === 0 && (
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
                        onClick={handleModalOpenStandard}
                      >
                        Cadastrar primeira norma
                      </Button>

                      <CustomModal
                        open={openStandard}
                        component={StandardsForm}
                        handleModalClose={handleModalCloseStandard}
                        identifier={index}
                        method={standardUtils}
                      />
                    </Grid>
                  )}
                  {compliance.standardsList.map((standard, index2) => (
                    <Paper key={index2} className={classes.paper}>
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
                              control={<></>}
                            />
                          }
                          title={standard.name}
                          subheader={standard.description}
                        />
                        </Grid>
                      </Grid>
                      <CardContent>
                        <Button
                          color={(standard.status === true) ? "primary" : "secondary" }
                          onClick={(event) => handleStatusStandardClick(event, index, index2)}
                          className={classes.buttonRight}
                          variant="contained"
                          size="small"
                        >
                          {(standard.status) ? "Desativar" : "Ativar" }
                        </Button>
                      </CardContent>
                    </Paper>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          ))}

          <Tooltip
            title="Salvar alterações"
            onClick={saveCompliances}
          >
            <Fab color="primary" className={classes.button}>
              <SaveIcon />
            </Fab>
          </Tooltip>

          <Tooltip
            title="Adicionar compliance"
            onClick={handleModalOpen}
          >
            <Fab color="primary" className={classes.button}>
              <AddIcon />
            </Fab>
          </Tooltip>

          <CustomModal
            open={open}
            component={CompliancesForm}
            handleModalClose={handleModalClose}
            method={complianceUtils}
          />
        </CardContent>
      </Card>
    </div>
  )
}