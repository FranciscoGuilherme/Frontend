import React, { useState } from 'react'
import {
  Button,
  TextField,
  Typography,
  Grid
} from '@material-ui/core'

import { useStyles } from "./assets/styles"

import CardListingScrow from '~/components/CardListingScrow'
import { standardsColumns, getStandardsRows } from '~/components/StandardsForm/standards'

function createData(code, name, desc) {
  return { code, name, desc };
}

const rows = [
  createData('code1', 'name', 'desc'),
  createData('code2', 'name', 'desc'),
  createData('code3', 'name', 'desc'),
  createData('code4', 'name', 'desc'),
  createData('code5', 'name', 'desc'),
  createData('code6', 'name', 'desc'),
  createData('code15', 'name', 'desc')
];

export default function StandardsForm({ method, identifier }) {
  const classes= useStyles()
  const [standardsRows, setStandardsRows] = useState(rows)
  const standards = []

  const getAllOptions = (standard) => {
    let item = standards.find((element) => element.code === standard.code)

    if (item === undefined) standards.push(standard)
    if (item !== undefined) standards.splice(standards.indexOf(item), 1)

    console.log(standards)
  }

  return (
    <form className={classes.modalPaper}
      onSubmit={event => {
        event.preventDefault()
        method.setStandard(identifier, standards)
      }}
    >
      <Typography
        component="h1"
        variant="h5"
        align="center"
        className={classes.title}
      >
        Cadastrar nova norma
      </Typography>

      <Grid container justify="center">
        <Grid item xs={8}>
          <TextField
            placeholder="Procurar…"
            type="text"
            required
            
            margin="normal"
          />
        </Grid>

        <Grid item xs={3}>
          <Button
            type="button"
            color="primary"
            variant="contained"
            size="medium"
          >
            Buscar
          </Button>
        </Grid>
      </Grid>

      <div className={classes.listing}>
        <CardListingScrow check
          title="Base externa de normas"
          rows={standardsRows}
          columns={standardsColumns}
          options={getAllOptions}
        />
      </div>

      <Grid>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          size="medium"
          className={classes.button}
        >
          Salvar
        </Button>

        <Button
          type="submit"
          color="primary"
          variant="contained"
          size="medium"
          className={classes.button}
          onClick={method.closeModal}
        >
          Fechar
        </Button>
      </Grid>
    </form>
    
  )
}