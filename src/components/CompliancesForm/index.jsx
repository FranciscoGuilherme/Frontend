import React, { useState } from 'react'
import {
  Button,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    float: "right",
    marginBottom: "30px"
  },
  title: {
    marginBottom: "10px"
  }
}))

export default function CompliancesForm({ method }) {
  const classes= useStyles()
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")

  const sendData = () => {
    method.setCompliance({
      name: name,
      desc: desc
    })
  }

  return (
    <form className={classes.modalPaper}
      onSubmit={event => {
        event.preventDefault()
      }}
    >
      <Typography
        component="h1"
        variant="h5"
        align="center"
        className={classes.title}
      >
        Cadastrar novo complicance
      </Typography>

      <TextField
        id="complianceName"
        name="complianceName"
        label="Compliance Name"
        type="text"
        value={name}
        required
        variant="outlined"
        margin="normal"
        fullWidth
        onChange={event => setName(event.target.value)}
      />

      <TextField
        id="complianceDesc"
        name="complianceDesc"
        label="Compliance Description"
        type="text"
        value={desc}
        required
        variant="outlined"
        margin="normal"
        fullWidth
        onChange={event => setDesc(event.target.value)}
      />

      <Button
        type="submit"
        color="primary"
        variant="contained"
        className={classes.button}
        onClick={sendData}
      >
        Adicionar
      </Button>
    </form>
  )
}